import mongoose from "mongoose";

const supportSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      required: true,
    },
    type: {
      type: String,
      trim: true,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Contact", supportSchema);
