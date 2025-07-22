import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";

import router from "./routes/route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const __dirname = path.resolve(); // current working directory

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("VERCEL:", process.env.VERCEL);

app.use(express.json()); // middleware to parse JSON bodies

app.use("/api/products", router); // serves as a prefix alias for the product routes

// Check if we're in production (Vercel sets NODE_ENV to 'production')
const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL;

if (isProduction) {
    console.log("Production mode: Serving static files from frontend/dist");

    // serve static files from the frontend/dist directory
    app.use(express.static(path.join(__dirname, "frontend/dist")));

    // handle react routing to catch all non-API routes
    app.get(/^(?!\/api).*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

// Connect to database
connectDB();

// For local development
if (!process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

// Export for Vercel serverless functions
export default app;

