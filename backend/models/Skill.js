// models/Skill.js
import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  value: { type: Number, min: 1, max: 5 },
});

const SkillSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  skillTitle: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  experience: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
    default: "Intermediate",
  },
  skillsLookingFor: { type: [String], default: [] },

  // ✅ ADD THESE (no existing code removed)
  ratings: { type: [ratingSchema], default: [] },
  averageRating: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Skill", SkillSchema);
