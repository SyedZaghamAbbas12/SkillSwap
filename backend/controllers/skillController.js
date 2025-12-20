import Skill from "../models/Skill.js";

export const addSkill = async (req, res) => {
  try {
    const { have, need, description } = req.body;
    const skill = new Skill({ user: req.user.id, have, need, description });
    await skill.save();
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().populate("user", "name email");
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
