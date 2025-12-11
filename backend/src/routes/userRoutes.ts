import express from "express";
import { registerUser, getStats } from "../controllers/userController";

const router = express.Router();
router.post("/register", registerUser);
router.get("/stats", getStats);

export default router;