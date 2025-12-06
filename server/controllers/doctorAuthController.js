import jwt from "jsonwebtoken";
import Doctor from "../models/Doctor.js";
import User from '../models/User.js';
import Consultation from "../models/Consultation.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "30d";

function signDoctorToken(doctorId) {
  return jwt.sign({ doctorId, type: "doctor" }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export async function doctorRegister(req, res) {
  try {
    const { name, email, password, title } = req.body;

    const existing = await Doctor.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Doctor email already exists" });
    }

    const doctor = await Doctor.create({ name, email, password, title });

    const token = signDoctorToken(doctor._id);

    res.status(201).json({
      token,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        title: doctor.title
      }
    });
  } catch (err) {
    console.error(err.message)
  }
}

export async function doctorLogin(req, res) {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });
    if (!doctor || !await doctor.comparePassword(password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signDoctorToken(doctor._id);

    res.json({
      token,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        title: doctor.title
      }
    });
  } catch (err) {
    console.error(err.message)
  }
}

export async function getDoctorProfile(req, res) {
  try {
    const doctor = await Doctor.findById(req.doctor.id).select("-password");
    res.json(doctor);
  } catch (err) {
    console.error(err.message)
  }
}

export async function updateDoctorProfile(req, res) {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.doctor.id,
      req.body,
      { new: true, runValidators: true }
    ).select("-password");

    res.json(doctor);
  } catch (err) {
    console.error(err.message)
  }
}

export async function getDoctorPublicProfile(req, res) {
  try {
    const doctor = await Doctor.findOne({ isActive: true })
      .select('-password -email') // Hide sensitive fields
      .lean();

    if (!doctor) {
      return res.status(404).json({ message: "No active doctor found" });
    }

    res.json(doctor);
  } catch (err) {
    console.error("Public doctor fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export const getActiveClients = async (req, res) => {
  try {
    const now = new Date();

    const futureConsultations = await Consultation.find({
      dateTime: { $gte: now }, // Future appointments only
      status: { $ne: 'cancelled' } // Not cancelled
    })
      .populate('user', 'name email phone profileImage')
      .sort({ dateTime: 1 })
      .lean();

    const userMap = new Map();

    futureConsultations.forEach(consultation => {
      const userId = consultation.user._id.toString();

      // If we don't have this user yet, initialize them
      if (!userMap.has(userId)) {
        userMap.set(userId, {
          _id: userId,
          name: consultation.user.name,
          email: consultation.user.email,
          phone: consultation.user.phone,
          profileImage: consultation.user.profileImage,
          appointments: [] // 👈 store all future consultations here
        });
      }

      const userEntry = userMap.get(userId);

      // Push this consultation into appointments array
      userEntry.appointments.push({
        _id: consultation._id,
        dateTime: consultation.dateTime,
        sessionType: consultation.sessionType,
        duration: consultation.duration,
        status: consultation.status,
        notes: consultation.notes
      });
    });

    // Optionally, derive nextAppointment (first one, as we sorted by dateTime)
    const activeClients = Array.from(userMap.values()).map(client => ({
      ...client,
      nextAppointment: client.appointments[0]?.dateTime || null
    }));

    res.json(activeClients);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to fetch active clients' });
  }
};

