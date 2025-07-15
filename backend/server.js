import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";

import router from "./routes/route.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

const __dirname = path.resolve(); // current working directory

app.use(express.json()); // Middleware to parse JSON bodies

app.use("/api/products", router); // Serves as an prefix alias for the product routes

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(port, () => {
    connectDB()
    console.log(`Server is running on http://localhost:${port}`);
});

