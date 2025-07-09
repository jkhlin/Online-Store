import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        console.log("🚀 createProduct called with:", newProduct);
        
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            console.log("❌ Validation failed - missing fields");
            return {success: false, message: "Fill in all fields"};
        }
        
        console.log("✅ Validation passed, making API call...");
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        });

        console.log("📡 API Response status:", res.status);
        console.log("📡 API Response ok:", res.ok);
        
        const data = await res.json();
        console.log("📦 API Response data:", data);
        
        set((state) => ({
            products: [...state.products, data.data]
        }));

        console.log("✅ Product added to store successfully");
        return {success: true, message: "Product added successfully"};
    }
}))
