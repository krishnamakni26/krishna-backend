import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please provide a title for the item"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    imageUrl: {
      type: String,
      required: [true, "Please provide an image URL"],
    },
    category: {
      type: String,
      enum: ["tops", "bottoms", "outerwear", "footwear", "accessories", "other"],
      default: "other",
    },
    condition: {
      type: String,
      enum: ["new", "like new", "used", "worn"],
      default: "used",
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
