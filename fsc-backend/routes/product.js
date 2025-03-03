const express = require('express');
const pool = require('../connection');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

//Add Product api
router.post("/add-product", upload.single("image"), async (req, res) => {
    const { prod_name, prod_price, prod_desc, user_id, prod_stock } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!prod_name || !prod_price || !prod_desc || !user_id || !image) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    try {
        const userCheckQuery = `SELECT id FROM users WHERE id = ?`;
        const [userRows] = await pool.query(userCheckQuery, [user_id]);
        if (userRows.length === 0) {
            return res.status(400).json({ error: `Invalid user ID: ${user_id}` });
        }
        const insertProductQuery = `
            INSERT INTO master_product (prod_name, prod_price, prod_desc, user_id, prod_stock) 
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await pool.query(insertProductQuery, [prod_name, prod_price, prod_desc, user_id, prod_stock]);
        const productId = result.insertId;

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

// get all products api
router.get('/products', async (req, res) => {
    try {
        const query = `
            SELECT mp.prod_name, mp.prod_price, mp.prod_desc, pi.img_path, mp.prod_stock
            FROM master_product mp
            JOIN product_image pi ON mp.id = pi.product_id
            WHERE pi.is_enable = 'true';
        `;
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Server error, unable to fetch products.' });
    }
});

module.exports = router;
