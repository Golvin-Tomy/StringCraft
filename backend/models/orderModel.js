import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    total: Number,
    userName: String,
    userEmail: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
