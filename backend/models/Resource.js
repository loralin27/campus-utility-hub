import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  title: String,
  description: String,
  file: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Resource", resourceSchema);