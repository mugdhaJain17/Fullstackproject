// src/HomePage.js
import React from 'react';
import './Home.css'

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Your Website</h1>
      <p>This is the homepage where you can add introductory content, featured sections, and more.</p>
    </div>
  );
};

export default HomePage;


// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect("mongodb://localhost:27017/productsDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Product Schema
// const productSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   category: String,
//   description: String,
// });

// const Product = mongoose.model("Product", productSchema);

// // 1. Create a Product
// app.post("/api/products", async (req, res) => {
//   const product = new Product(req.body);
//   await product.save();
//   res.json({ message: "Product added successfully", product });
// });

// // 2. Get All Products
// app.get("/api/products", async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// });

// // 3. Get Product by ID
// app.get("/api/products/:id", async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (!product) return res.status(404).json({ error: "Product not found" });
//   res.json(product);
// });

// // 4. Update a Product
// app.put("/api/products/:id", async (req, res) => {
//   const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   res.json({ message: "Product updated successfully", product });
// });

// // 5. Delete a Product
// app.delete("/api/products/:id", async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ message: "Product deleted successfully" });
// });

// // Start Server
// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
