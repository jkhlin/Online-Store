import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";

import router from "./routes/route.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

const __dirname = path.resolve(); // current working directory

app.use(express.json()); // middleware to parse JSON bodies

app.use("/api/products", router); // serves as a prefix alias for the product routes

if (process.env.NODE_ENV.trim() === "production") {
    console.log("Production mode: Serving static files from frontend/dist");
    
    // serve static files from the frontend/dist directory
    app.use(express.static(path.join(__dirname, "frontend/dist")));

    // handle react routing to catch all non-API routes
    app.get(/(.*)/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(port, () => {
    connectDB()
    console.log(`Server is running on http://localhost:${port}`);
});

