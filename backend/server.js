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

console.log("Node environment:", `'${process.env.NODE_ENV}'`);
console.log("Is node env in production", process.env.NODE_ENV === "production");
console.log("Trimmed NODE_ENV:", `'${process.env.NODE_ENV?.trim()}'`);
console.log("Is trimmed production?", process.env.NODE_ENV?.trim() === "production");

process.env.NODE_ENV = process.env.NODE_ENV?.trim(); // ensure NODE_ENV is trimmed
console.log(`NODE_ENV after trim: '${process.env.NODE_ENV}'`);

if (process.env.NODE_ENV?.trim() === "production") {
    console.log("Production mode: Serving static files from frontend/dist");
    app.use(express.static(path.join(__dirname, "frontend/dist")));

    // Handle React routing - catch all non-API routes
    app.get(/^(?!\/api).*$/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

console.log("not in production mode, serving API routes only");

app.listen(port, () => {
    connectDB()
    console.log(`Server is running on http://localhost:${port}`);
});

