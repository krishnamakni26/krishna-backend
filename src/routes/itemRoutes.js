import express from "express";
import {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  getMyItems,
} from "../controllers/itemController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/items
// @desc    Create a new item
// @access  Private
router.post("/", protect, createItem);

// @route   GET /api/items
// @desc    Get all items
// @access  Public
router.get("/", getAllItems);

// @route   GET /api/items/my
// @desc    Get items created by the logged-in user
// @access  Private
router.get("/my", protect, getMyItems);

// @route   GET /api/items/:id
// @desc    Get a single item by ID
// @access  Public
router.get("/:id", getItemById);

// @route   PUT /api/items/:id
// @desc    Update an item
// @access  Private (must be the owner)
router.put("/:id", protect, updateItem);

// @route   DELETE /api/items/:id
// @desc    Delete an item
// @access  Private (must be the owner)
router.delete("/:id", protect, deleteItem);

export default router;
