const express = require("express");
const userModel = require("../model/User");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const user = await userModel.create({
      username: req.body.username,
      email: req.body.email,
      password: crypto.AES.encrypt(req.body.password, process.env.PASS_SE),
    });
    res.status(201).json({ data: user });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.body.username });
    !user && res.status(401).json({ msg: "invalid username or password" });

    const hashedPassword = crypto.AES.decrypt(
      user.password,
      process.env.PASS_SE
    );
    const originalPassword = hashedPassword.toString(crypto.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json({ msg: "invalid username or password" });

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SE,
      { expiresIn: "30d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

module.exports = router;
