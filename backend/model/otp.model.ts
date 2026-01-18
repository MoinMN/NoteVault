import mongoose, { Schema, Document } from "mongoose";

export interface IOtpTemp extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}

const otpTempSchema = new Schema<IOtpTemp>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300, // Auto delete after 5 minutes
    },
  },
  { timestamps: false }
);

export default mongoose.models.OtpTemp ||
  mongoose.model<IOtpTemp>("OtpTemp", otpTempSchema);
