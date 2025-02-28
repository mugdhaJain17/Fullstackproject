const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../connection"); // Use pool with promise-based queries

const router = express.Router();

// User Registration Route
router.post("/register", async (req, res) => {
    const { fullName, email, password, mobile, role } = req.body;

    if (!fullName || !email || !password || !mobile || !role) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    try {
        const [existingUser] = await pool.query("SELECT * FROM Users WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: "Email already registered!" });
        }

        // Hash password securely
        const hashedPassword = await bcrypt.hash(password, 10);

        // Extract first and last name from fullName
        const [firstName, ...lastNameParts] = fullName.split(" ");
        const lastName = lastNameParts.join(" ") || ""; // Handle single-word names

        const insertUserQuery = "INSERT INTO Users (first_name, last_name, email, password, mobile, role) VALUES (?, ?, ?, ?, ?, ?)";
        await pool.query(insertUserQuery, [firstName, lastName, email, hashedPassword, mobile, role]);

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Error in /register:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
