const express = require("express");
require("dotenv").config();
const connectDB = require("./db/connect");
const app = express();
var cors = require("cors");
const userRouter = require("./router/userRoute");
const mongoose = require("mongoose")
mongoose.set('strictQuery', true);

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);


const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.DATABASE_CONNECTION);
    app.listen(port, () => {
         console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
      console.log("error =>", error);
  }
};
start();