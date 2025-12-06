
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, MapPin, CheckCircle2, XCircle, Edit3 } from 'lucide-react';
import api from '../api/doctorClient.js';
import { useDoctorAuth } from '../context/DoctorAuthContext';

const DoctorAppointments = () => {
  const { doctor } = useDoctorAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const statusOptions = [
    { value: 'all', label: 'All Appointments', color: 'gray' },
    { value: 'pending', label: 'Pending', color: 'orange' },
    { value: 'confirmed', label: 'Confirmed', color: 'emerald' },
    { value: 'completed', label: 'Completed', color: 'blue' },
    { value: 'cancelled', label: 'Cancelled', color: 'red' }
  ];

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await api.get('/appointments');
     
      setAppointments(response.data.appointments || []);
    } catch (err) {
      console.error('❌ Appointments error:', err);
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (appointmentId, status) => {
    if (!confirm(`Mark as ${status}?`)) return;
    
    try {
      await api.patch(`/appointments/${appointmentId}`, { status });
      fetchAppointments(); // Refresh list
    } catch (err) {
      setError('Failed to update status');
    }
  };

  const filteredAppointments = appointments
    .filter(appointment => {
      const matchesStatus = selectedStatus === 'all' || appointment.status === selectedStatus;
      const matchesSearch = !searchTerm || 
        appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.reason.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)); // Newest first

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-orange-100 text-orange-700 border-orange-200',
      confirmed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      completed: 'bg-blue-100 text-blue-700 border-blue-200',
      cancelled: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-emerald-50 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-500 text-lg">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Appointments</h1>
              <p className="text-slate-600">
                Manage your patient appointments ({appointments.length} total)
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
              <p className="text-red-700 text-sm">{error}</p>
              <button 
                onClick={fetchAppointments}
                className="mt-2 text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Refresh
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-5 h-5" />
                <span>Filter by status:</span>
              </div>
              <div className="flex gap-2">
                {statusOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedStatus(option.value)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                      selectedStatus === option.value
                        ? `bg-${option.color}-500 text-white shadow-md`
                        : `bg-${option.color}-50 hover:bg-${option.color}-100 border-${option.color}-200 text-${option.color}-700`
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search by patient name or reason..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-80 pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 outline-none"
              />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredAppointments.length === 0 && !loading && (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
            <Calendar className="w-24 h-24 text-slate-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No appointments</h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              No appointments match your current filters. 
              {selectedStatus !== 'all' && (
                <>
                  <br />
                  Showing <span className="font-semibold capitalize">{selectedStatus}</span> appointments.
                </>
              )}
            </p>
            <button
              onClick={fetchAppointments}
              className="px-8 py-3 bg-emerald-500 text-white rounded-2xl font-semibold hover:bg-emerald-600 transition-all"
            >
              Refresh Appointments
            </button>
          </div>
        )}

        {/* Appointments List */}
        {filteredAppointments.length > 0 && (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <div key={appointment._id} className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-all p-6 border border-slate-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {/* Left: Patient & Time */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0">
                        <div className="w-16 h-16 bg-linear-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center">
                          <User className="w-8 h-8 text-slate-500" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-slate-900 truncate">{appointment.patientName}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(appointment.dateTime).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(appointment.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                        <p className="mt-2 text-slate-600 line-clamp-2">{appointment.reason}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions & Status */}
                  <div className="flex flex-col sm:flex-row gap-3 items-end sm:items-center justify-end min-w-fit">
                    {/* Status Badge */}
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                        <>
                          <button
                            onClick={() => updateAppointmentStatus(appointment._id, 'confirmed')}
                            className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-xl hover:shadow-sm transition-all"
                            title="Confirm"
                          >
                            <CheckCircle2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => updateAppointmentStatus(appointment._id, 'cancelled')}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-xl hover:shadow-sm transition-all"
                            title="Cancel"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-xl hover:shadow-sm transition-all">
                        <Edit3 className="w-5 h-5" />
                      </button>
                    </div>

                    {appointment.phone && (
                      <a 
                        href={`tel:${appointment.phone}`}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-medium text-slate-700 transition-all"
                      >
                        <Phone className="w-4 h-4" />
                        Call
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
