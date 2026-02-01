import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema(
  {
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    staffName: { type: String }, // optional (for quick reports)
    date: { type: String, required: true }, // YYYY-MM-DD
    status: { type: String, enum: ["P", "A", "H", "L"], default: "P" },
    checkIn: { type: Date, default: Date.now },
    location: { lat: Number, lng: Number },
    accuracy: Number,
    distanceMeters: Number,
    method: { type: String, default: "GEOFENCE" },
  },
  { timestamps: true }
);

AttendanceSchema.index({ staffId: 1, date: 1 }, { unique: true });

export default mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema);
