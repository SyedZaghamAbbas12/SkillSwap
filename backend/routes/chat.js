import express from "express";
import auth from "../middleware/authMiddleware.js";
import { sendMessage, getChats } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", auth, sendMessage);
router.get("/:userId", auth, getChats);

export default router;
