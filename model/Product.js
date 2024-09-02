const mongoose = require("mongoose");

const productSchma = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      unique: true,
    },
    desc: {
      type: String,
      required: [true, "description required"],
    },
    img: {
      type: String,
      required: [true, "image required"],
    },
    categories: {
      type: Array,
    },
    size: { type: String },
    color: { type: String },

    price: {
      type: Number,
      required: [true, "Price required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchma);
