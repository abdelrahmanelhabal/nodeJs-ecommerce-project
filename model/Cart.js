const mongoose = require("mongoose");

const cartSchma = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "Product title is required"],
    },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("cart", cartSchma);
