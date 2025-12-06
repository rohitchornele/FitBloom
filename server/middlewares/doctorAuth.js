import jwt from "jsonwebtoken";

export function requireDoctorAuth(req, res, next) {
 
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Doctor authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.type !== "doctor") {
      return res.status(403).json({ message: "Doctor access required" });
    }
    req.doctor = { id: decoded.doctorId };
    next();
  } catch (err) {
    console.error("JWT verify error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
}
