import Consultation from "../models/Consultation.js";

// GET /api/consultations
export async function getConsultations(req, res, next) {
  try {
    const consultations = await Consultation.find({
      user: req.user.id,
    }).sort({ dateTime: 1 });
    res.json(consultations);
  } catch (err) {
    next(err);
  }
}

// POST /api/consultations
export async function createConsultation(req, res, next) {
  try {
    const { sessionType, date, time, notes } = req.body;

    if (!sessionType || !date || !time) {
      return res
        .status(400)
        .json({ message: "sessionType, date and time are required" });
    }

    const dateTime = new Date(`${date}T${time}:00`);
    const now = new Date();

    if (dateTime <= now) {
      return res
        .status(400)
        .json({ message: "Consultation must be in the future" });
    }

    // Derive duration from sessionType
    const duration =
      sessionType.includes("60") ? 60 : sessionType.includes("30") ? 30 : 45;

    const consultation = await Consultation.create({
      user: req.user.id,
      sessionType,
      dateTime,
      duration,
      notes,
    });

    res.status(201).json(consultation);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/consultations/:id
export async function deleteConsultation(req, res, next) {
  try {
    const { id } = req.params;

    const consultation = await Consultation.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!consultation) {
      return res.status(404).json({ message: "Consultation not found" });
    }

    res.json({ message: "Consultation cancelled", id: consultation._id });
  } catch (err) {
    next(err);
  }
}
