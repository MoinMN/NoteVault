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
      select: false, // only for credentials login
    },

    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },

    profileImage: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // Encryption fields
    encryptedMasterKey: {
      type: String,
      default: null, // store AES-encrypted master key
    },

    encryptionSalt: {
      type: String,
      default: null, // optional salt if needed
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
