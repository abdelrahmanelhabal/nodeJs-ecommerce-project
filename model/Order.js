const mongoose = require("mongoose");
const { object } = require("webidl-conversions");

const orderSchma = new mongoose.Schema(
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
    amount: {
      type: Number,
      required: [true, "Amount required"],
    },
    address: {
      type: Object,
      required: [true, "Address required"],
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchma);
