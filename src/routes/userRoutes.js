import express from "express";
import {
  registerUser,
  authUser,
  getUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register new user
// @access  Public
router.post("/register", registerUser);

// @route   POST /api/users/login
// @desc    Login user & return JWT
// @access  Public
router.post("/login", authUser);

// @route   GET /api/users/profile
// @desc    Get logged-in user's profile
// @access  Private
router.get("/profile", protect, getUserProfile);

export default router;
