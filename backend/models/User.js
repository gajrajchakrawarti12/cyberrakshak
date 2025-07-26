import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Don't return password by default
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true, // ✅ allows multiple nulls
      trim: true,
      lowercase: true,
      required: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true, // ✅ allows multiple nulls
      trim: true,
      required: false,
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    last_notified: Date,
    notify_email: {
      type: Boolean,
      default: false,
    },
    notify_sms: {
      type: Boolean,
      default: false,
    },
    notify_high_risk: {
      type: Boolean,
      default: false,
    },
    notify_medium_risk: {
      type: Boolean,
      default: false,
    },
    notify_low_risk: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
