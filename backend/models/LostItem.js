import mongoose from "mongoose";

const lostItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  status: { type: String, enum: ["lost", "found"], default: "lost" },
  image: String,
}, { timestamps: true });

export default mongoose.model("LostItem", lostItemSchema);