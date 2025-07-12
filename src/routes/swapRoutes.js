import express from "express";
import {
  requestSwap,
  getMySwaps,
  getSwapById,
  acceptSwap,
  rejectSwap,
  deleteSwap,
} from "../controllers/swapController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/swaps
// @desc    Request a new swap
// @access  Private
router.post("/", protect, requestSwap);

// @route   GET /api/swaps
// @desc    Get all swaps involving the current user
// @access  Private
router.get("/", protect, getMySwaps);

// @route   GET /api/swaps/:id
// @desc    Get a specific swap by ID
// @access  Private
router.get("/:id", protect, getSwapById);

// @route   PUT /api/swaps/:id/accept
// @desc    Accept a swap
// @access  Private
router.put("/:id/accept", protect, acceptSwap);

// @route   PUT /api/swaps/:id/reject
// @desc    Reject a swap
// @access  Private
router.put("/:id/reject", protect, rejectSwap);

// @route   DELETE /api/swaps/:id
// @desc    Delete a swap
// @access  Private (only requester can delete)
router.delete("/:id", protect, deleteSwap);

export default router;
