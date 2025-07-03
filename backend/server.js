import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import router from "./routes/route.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json()); // Middleware to parse JSON bodies

app.use("/api/products", router); // Serves as an prefix alias for the product routes

app.listen(port, () => {
    connectDB()
    console.log(`Server is running on http://localhost:${port}`);
});

