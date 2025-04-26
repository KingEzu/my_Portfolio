import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, "Title is required"],
    trim: true, // Removes extra spaces
  },
  text: {
    type: String,
    required: [true, "Content is required"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const News = mongoose.model("News", newsSchema);
