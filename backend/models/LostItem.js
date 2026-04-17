import mongoose from "mongoose";

const lostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    location: String,
    contact: String,
    image: String,
    status: {
      type: String,
      default: "lost",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("LostItem", lostSchema);