import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to the Online Store API");
});

app.listen(port, () => {
    connectDB()
    console.log(`Server is running on http://localhost:${port}`);
});

