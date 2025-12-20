// routes/skill.js
import express from "express";
import Skill from "../models/Skill.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= ADD SKILL ================= */
router.post("/add", auth, async (req, res) => {
  try {
    const {
      skillTitle,
      category,
      description,
      experience,
      skillsLookingFor,
    } = req.body;

    // Validate required fields
    if (!skillTitle || !category || !description) {
      return res.status(400).json({ msg: "Please fill all required fields" });
    }

    const skill = new Skill({
      user: req.user.id,
      skillTitle,
      category,
      description,
      experience: experience || "Intermediate",
      skillsLookingFor: skillsLookingFor || [],
    });

    await skill.save();
    res.status(201).json({ message: "Skill added successfully!", skill });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/* ================= GET ALL SKILLS ================= */
router.get("/all", async (req, res) => {
  try {
    const skills = await Skill.find().populate("user", "name email");
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= ⭐ RATE SKILL ================= */
router.post("/:id/rate", auth, async (req, res) => {
  try {
    const { rating } = req.body;
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ msg: "Skill not found" });
    }

    // ❌ Cannot rate own skill
    if (skill.user.toString() === req.user.id) {
      return res
        .status(403)
        .json({ msg: "You cannot rate your own skill" });
    }

    // Remove old rating if exists
    skill.ratings = skill.ratings.filter(
      r => r.user.toString() !== req.user.id
    );

    // Add new rating
    skill.ratings.push({
      user: req.user.id,
      value: rating,
    });

    // Calculate average rating
    skill.averageRating =
      skill.ratings.reduce((sum, r) => sum + r.value, 0) /
      skill.ratings.length;

    await skill.save();
    res.json(skill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= 🗑 DELETE SKILL (OWNER ONLY) ================= */
router.delete("/:id", auth, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ msg: "Skill not found" });
    }

    // ❌ Prevent deleting others' skills
    if (skill.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    await skill.deleteOne();
    res.json({ msg: "Skill deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
