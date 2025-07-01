import express from "express";
import mongoose from "mongoose";
import Product from "../models/model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({}); // {} Fetch all products from the database
    return res.status(200).json ({
      success: true,
      message: "Products fetched successfully",
      data: products
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

router.post("/", async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: "All fields are required: name, price, and image."
    });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    return res.status(201).json({
      success: true,
      message: "Product created successfully"
    });
  } catch (error) {
    console.error("Error creating product:", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid product ID"
    });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating product"
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params; // Extracting the product ID from the request parameters
  console.log("id:", id)

  try {
    await Product.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Product deleted"
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(404).json({
      success: false,
      message: "Product not found"
    });
  }
});

export default router;