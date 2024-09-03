const express = require("express");
const orderModel = require("../model/Order");
const {
  verifyToken,
  verifyTokenAuthorization,
  verifyTokenAdmin,
} = require("./verifyToken");
const router = express.Router();

router.get("/income", verifyTokenAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await orderModel.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const order = await orderModel.create(req.body);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const order = await orderModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json({ data: order });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    await orderModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Order has been deleted..." });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:userId", verifyTokenAuthorization, async (req, res) => {
  try {
    const order = await orderModel.find({ userId: req.params.userId });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", verifyTokenAdmin, async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
