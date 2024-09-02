const mongoose = require("mongoose");

const userSchma = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "UserName required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password required"],
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchma);
