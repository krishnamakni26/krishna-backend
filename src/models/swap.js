import mongoose from "mongoose";

const swapSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    offeredItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    requestedItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Swap = mongoose.model("Swap", swapSchema);

export default Swap;
