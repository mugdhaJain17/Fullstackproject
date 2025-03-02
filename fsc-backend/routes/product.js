const express = require('express');
const pool = require('../connection');  // Assuming connection to MySQL is set up correctly
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Store images in 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
    }
});
const upload = multer({ storage });

// 🛒 Add Product Route
router.post("/add-product", upload.single("image"), async (req, res) => {
    const { prod_name, prod_price, prod_desc, user_id, prod_stock } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!prod_name || !prod_price || !prod_desc || !user_id || !image) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    try {
        // ✅ Step 1: Check if user exists
        const userCheckQuery = `SELECT id FROM users WHERE id = ?`;
        const [userRows] = await pool.query(userCheckQuery, [user_id]);
        if (userRows.length === 0) {
            return res.status(400).json({ error: `Invalid user ID: ${user_id}` });
        }

        // ✅ Step 2: Insert product into master_product
        const insertProductQuery = `
            INSERT INTO master_product (prod_name, prod_price, prod_desc, user_id, prod_stock) 
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await pool.query(insertProductQuery, [prod_name, prod_price, prod_desc, user_id, prod_stock]);
        const productId = result.insertId; // Get inserted product ID

        // ✅ Step 3: Insert product image
        const insertImageQuery = `
            INSERT INTO product_image (product_id, img_path, is_enable) 
            VALUES (?, ?, 'true')
        `;
        await pool.query(insertImageQuery, [productId, image]);

        res.status(201).json({ message: "Product added successfully!", productId });
    } catch (error) {
        console.error("Error in /add-product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Endpoint to fetch all products
router.get('/products', async (req, res) => {
    try {
        const query = `
            SELECT mp.prod_name, mp.prod_price, mp.prod_desc, pi.img_path, mp.prod_stock
            FROM master_product mp
            JOIN product_image pi ON mp.id = pi.product_id
            WHERE pi.is_enable = 'true';
        `;
        const [rows] = await pool.query(query);  // Query the products from the database

        // Send the list of products as a response
        res.json(rows);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Server error, unable to fetch products.' });
    }
});

module.exports = router;
