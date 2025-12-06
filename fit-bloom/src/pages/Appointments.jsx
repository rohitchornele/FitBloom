import React, { useState, useEffect } from 'react';
import { User, Clock, Calendar, Mail, Phone, Trash2, Loader2 } from 'lucide-react';
import api from '../api/doctorClient.js';

export default function DoctorClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchActiveClients();
  }, []);

  const fetchActiveClients = async () => {
    try {
      setError("");
      setLoading(true);

      const res = await api.get("/doctor/active-clients");

      setClients(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load clients");
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveClient = async (userId) => {
    if (!window.confirm('Remove this client?')) return;

    try {
      // Update user's appointmentDate to past date (effectively removes them)
      await api.patch(`/doctor/clients/${userId}/remove`);
      setClients(prev => prev.filter(client => client._id !== userId));
    } catch (err) {
      console.error("Remove failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          <p className="text-slate-500">Loading active clients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-50 pb-16">
      <div className="mx-auto max-w-4xl px-4 pt-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Active Clients
          </h1>
          <p className="text-xl text-slate-600">
            {clients.length} clients with upcoming appointments
          </p>
        </div>

        {error && (
          <div className="mb-8 p-6 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-sm">
            {error}
          </div>
        )}

        <div className="grid gap-4">
          {clients.length > 0 ? (
            clients.map((client) => (
              <div
                key={client._id}
                className="group bg-white rounded-3xl p-6 shadow-sm ring-1 ring-emerald-50 hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-6">
                  {/* Avatar */}
                  <div className="shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center overflow-hidden">
                      {client.profileImage ? (
                        <img
                          src={client.profileImage}
                          alt={client.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-white">
                          {client.name?.charAt(0)?.toUpperCase() || 'C'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-slate-900 truncate">
                          {client.name || 'Client'}
                        </h3>
                        <p className="text-sm text-slate-500 truncate max-w-xs flex items-center gap-2 ">
                          {/* <div className="flex items-center gap-2"> */}
                          <Mail className="h-4 w-4 shrink-0" />
                          {client.email}
                          {/* </div> */}
                        </p>
                        {client.appointments && client.appointments.length > 1 && (
                          <details className="mt-4 text-xs text-slate-600">
                            <summary className="cursor-pointer text-emerald-700 font-medium">
                              View all upcoming appointments ({client.appointments.length})
                            </summary>

                            <ul className="mt-2 space-y-1">
                              {client.appointments.map(appt => (
                                <li
                                  key={appt._id}
                                  className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-xl"
                                >
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-3 w-3" />
                                    <span>
                                      {new Date(appt.dateTime).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-3 w-3" />
                                    <span>
                                      {new Date(appt.dateTime).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                      })}
                                    </span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </details>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full">
                          {client.nextAppointment
                            ? new Date(client.nextAppointment).toLocaleDateString()
                            : "No upcoming"}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {client.nextAppointment &&
                            new Date(client.nextAppointment).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                        </div>
                      </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-600">

                      {client.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 shrink-0" />
                          {client.phone}
                        </div>
                      )}
                    </div>

                    {client.notes && (
                      <p className="mt-3 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl">
                        {client.notes}
                      </p>
                    )}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveClient(client._id)}
                    className="shrink-0 p-3 text-rose-500 hover:bg-rose-50 rounded-2xl group-hover:bg-rose-100 transition-all ml-auto"
                    title="Remove client"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>

                </div>

              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl shadow-sm ring-1 ring-emerald-50">
              <User className="mx-auto h-16 w-16 text-slate-400 mb-6" />
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                No active clients
              </h3>
              <p className="text-slate-500 text-lg">
                Clients will appear here when they book future appointments
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
