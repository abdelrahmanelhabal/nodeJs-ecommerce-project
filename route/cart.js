const express = require("express");
const cartModel = require("../model/Cart");
const {
  verifyToken,
  verifyTokenAuthorization,
  verifyTokenAdmin,
} = require("./verifyToken");
const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const cart = await cartModel.create(req.body);
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", verifyTokenAuthorization, async (req, res) => {
  try {
    const cart = await cartModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json({ data: cart });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAuthorization, async (req, res) => {
  try {
    await cartModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Cart has been deleted..." });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:userId", verifyTokenAuthorization, async (req, res) => {
  try {
    const cart = await cartModel.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", verifyTokenAdmin, async (req, res) => {
  try {
    const carts = await cartModel.find({});
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
