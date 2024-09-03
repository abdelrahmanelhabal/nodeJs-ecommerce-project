const express = require("express");
const productModel = require("../model/Product");
const {
  verifyToken,
  verifyTokenAuthorization,
  verifyTokenAdmin,
} = require("./verifyToken");
const router = express.Router();
const crypto = require("crypto-js");

router.post("/", verifyTokenAuthorization, async (req, res) => {
  try {
    const product = await productModel.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json({ data: product });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Product has been deleted..." });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  const query = req.query.new;
  const category = req.query.category;
  try {
    let products;
    if (query) {
      products = await productModel.find({}).sort({ _id: -1 }).limit(5);
    } else if (category) {
      products = await productModel.find({
        categories: {
          $in: [category],
        },
      });
    } else {
      products = await productModel.find({});
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
