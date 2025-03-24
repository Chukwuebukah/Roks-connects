import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controllers/user.controller.js"; // Fixed import path

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);

export default router;