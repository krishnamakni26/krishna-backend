import Item from "../models/item.js";

// @desc    Create a new item
// @route   POST /api/items
// @access  Private
const createItem = async (req, res) => {
  try {
    const { title, description, imageUrl, category, condition } = req.body;

    const item = new Item({
      user: req.user._id, // From authMiddleware
      title,
      description,
      imageUrl,
      category,
      condition,
    });

    const createdItem = await item.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to create item" });
  }
};

// @desc    Get all items
// @route   GET /api/items
// @access  Public
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate("user", "name email");
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch items" });
  }
};

// @desc    Get item by ID
// @route   GET /api/items/:id
// @access  Public
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch item" });
  }
};

// @desc    Update an item
// @route   PUT /api/items/:id
// @access  Private
const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { title, description, imageUrl, category, condition } = req.body;

    item.title = title || item.title;
    item.description = description || item.description;
    item.imageUrl = imageUrl || item.imageUrl;
    item.category = category || item.category;
    item.condition = condition || item.condition;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to update item" });
  }
};

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Private
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await item.deleteOne();
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete item" });
  }
};

// @desc    Get items of the logged-in user
// @route   GET /api/items/my
// @access  Private
const getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user._id });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your items" });
  }
};

export {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  getMyItems,
};
