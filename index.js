const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./route/auth");
const userRoute = require("./route/user");
const productRoute = require("./route/product");
const cartRoute = require("./route/cart");
const orderRoute = require("./route/order");
dotenv.config();
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB Connection Successfull!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/auth", authRoute);
app.use("/api/user/", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Backend server is running!");
});
