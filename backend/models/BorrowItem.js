import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true,
  },
  status: { type: String, default: "available" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  borrower: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("BorrowItem", borrowSchema);