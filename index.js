const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./route/auth");

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

const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Backend server is running!");
});
