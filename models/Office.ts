import mongoose from "mongoose";

const OfficeSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Main Office" },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    radiusMeters: { type: Number, default: 150 },
  },
  { timestamps: true }
);

export default mongoose.models.Office || mongoose.model("Office", OfficeSchema);
