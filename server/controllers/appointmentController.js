// controllers/appointmentController.js
export const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.doctor.id })
      .populate('patient', 'name phone')
      .sort({ dateTime: -1 });
    
    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, doctor: req.doctor.id },
      { status },
      { new: true }
    ).populate('patient', 'name phone');
    
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
