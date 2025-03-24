import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage); // Added protectRoute middleware
router.get("/conversation/:id", protectRoute, getMessages); // Add route to fetch messages

export default router;
