import mongoose from "mongoose";

// defines the product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, {
    timestamps: true //createdAt and updatedAt fields
});

const Product = mongoose.model("Product", productSchema);

export default Product;
