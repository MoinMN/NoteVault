import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      // required ONLY for credentials login
      select: false,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // allows null for non-google users
    },
    authProvider: {
      type: String,
      enum: ["credentials", "google"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
