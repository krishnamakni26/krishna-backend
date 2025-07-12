import Swap from "../models/swap.js";
import Item from "../models/item.js";

// @desc    Request a swap
// @route   POST /api/swaps
// @access  Private
const requestSwap = async (req, res) => {
  const { offeredItemId, requestedItemId } = req.body;

  try {
    // Check if items exist
    const offeredItem = await Item.findById(offeredItemId);
    const requestedItem = await Item.findById(requestedItemId);

    if (!offeredItem || !requestedItem) {
      return res.status(404).json({ message: "One or both items not found" });
    }

    // Ensure the logged-in user owns the offered item
    if (offeredItem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You do not own the offered item" });
    }

    const swap = new Swap({
      requester: req.user._id,
      offeredItem: offeredItemId,
      requestedItem: requestedItemId,
      status: "pending",
    });

    const createdSwap = await swap.save();
    res.status(201).json(createdSwap);
  } catch (error) {
    res.status(500).json({ message: "Failed to request swap" });
  }
};

// @desc    Get all swaps related to logged-in user
// @route   GET /api/swaps
// @access  Private
const getMySwaps = async (req, res) => {
  try {
    const swaps = await Swap.find({
      $or: [{ requester: req.user._id }, { receiver: req.user._id }],
    })
      .populate("offeredItem requestedItem requester")
      .sort({ createdAt: -1 });

    res.json(swaps);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch swaps" });
  }
};

// @desc    Get a specific swap by ID
// @route   GET /api/swaps/:id
// @access  Private
const getSwapById = async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id).populate(
      "offeredItem requestedItem requester"
    );

    if (!swap) {
      return res.status(404).json({ message: "Swap not found" });
    }

    res.json(swap);
  } catch (error) {
    res.status(500).json({ message: "Failed to get swap" });
  }
};

// @desc    Accept a swap
// @route   PUT /api/swaps/:id/accept
// @access  Private
const acceptSwap = async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id).populate("requestedItem");

    if (!swap) {
      return res.status(404).json({ message: "Swap not found" });
    }

    if (swap.requestedItem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to accept this swap" });
    }

    swap.status = "accepted";
    const updatedSwap = await swap.save();
    res.json(updatedSwap);
  } catch (error) {
    res.status(500).json({ message: "Failed to accept swap" });
  }
};

// @desc    Reject a swap
// @route   PUT /api/swaps/:id/reject
// @access  Private
const rejectSwap = async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id).populate("requestedItem");

    if (!swap) {
      return res.status(404).json({ message: "Swap not found" });
    }

    if (swap.requestedItem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to reject this swap" });
    }

    swap.status = "rejected";
    const updatedSwap = await swap.save();
    res.json(updatedSwap);
  } catch (error) {
    res.status(500).json({ message: "Failed to reject swap" });
  }
};

// @desc    Delete a swap
// @route   DELETE /api/swaps/:id
// @access  Private
const deleteSwap = async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id);

    if (!swap) {
      return res.status(404).json({ message: "Swap not found" });
    }

    if (swap.requester.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this swap" });
    }

    await swap.remove();
    res.json({ message: "Swap deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete swap" });
  }
};

export {
  requestSwap,
  getMySwaps,
  getSwapById,
  acceptSwap,
  rejectSwap,
  deleteSwap,
};
