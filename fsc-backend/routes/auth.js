const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../connection"); // Use pool with promise-based queries
const jwt = require("jsonwebtoken");

const router = express.Router();
const JWT_SECRET = "yoursupersecretkey";


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


// 🛠 User Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        console.log("🔍 Checking user in DB for email:", email); // Debug log

        // Fetch user from database
        const [users] = await pool.query("SELECT * FROM Users WHERE email = ?", [email]);

        if (users.length === 0) {
            console.log("❌ User not found for email:", email); // Debug log
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const user = users[0];

        console.log("✅ User found:", user); // Debug log

        // Compare hashed password
        if (!user.password) {
            return res.status(500).json({ error: "User password is missing in DB" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        
        
        if (!isMatch) {
            console.log("❌ Password does not match for email:", email); // Debug log
            return res.status(400).json({ error: "Invalid email or password" });
        }

        console.log("🔑 Password matched, generating JWT token..."); // Debug log

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        console.log("✅ Login successful for:", email); // Debug log

        res.status(200).json({
            message: "Login successful!",
            token,
            user: { id: user.id, email: user.email, role: user.role },
        });

    } catch (error) {
        console.error("❌ Error in /login route:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
