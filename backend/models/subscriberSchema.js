import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
});

export const Subscriber = mongoose.model("Subscriber", subscriberSchema);
