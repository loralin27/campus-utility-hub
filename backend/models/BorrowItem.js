import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema({
  itemName: String,
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  borrower: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["available", "requested", "borrowed"], default: "available" }
}, { timestamps: true });

export default mongoose.model("BorrowItem", borrowSchema);