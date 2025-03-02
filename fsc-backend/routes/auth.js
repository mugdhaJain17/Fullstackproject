const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../connection");
const jwt = require("jsonwebtoken");

const router = express.Router();
const secretKey = "secretkey";


// sign up api
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

        const hashedPassword = await bcrypt.hash(password, 10);

        const [firstName, ...lastNameParts] = fullName.split(" ");
        const lastName = lastNameParts.join(" ") || ""; 

        const insertUserQuery = "INSERT INTO Users (first_name, last_name, email, password, mobile, role) VALUES (?, ?, ?, ?, ?, ?)";
        await pool.query(insertUserQuery, [firstName, lastName, email, hashedPassword, mobile, role]);

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Error in /register:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


//Login api
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        console.log("🔍 Checking user in DB for email:", email);

        const [users] = await pool.query("SELECT * FROM Users WHERE email = ?", [email]);

        if (users.length === 0) {
            console.log("User not found for email:", email);
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const user = users[0];

        console.log("User found:", user);

        if (!user.password) {
            return res.status(500).json({ error: "User password is missing in DB" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        
        
        if (!isMatch) {
            console.log("Password does not match for email:", email);
            return res.status(400).json({ error: "Invalid email or password" });
        }

        console.log("Password matched, generating JWT token...");

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            secretKey,
            { expiresIn: "1h" }
        );

        console.log("Login successful for:", email); 

        res.status(200).json({
            message: "Login successful!",
            token,
            user: { id: user.id, email: user.email, role: user.role },
        });

    } catch (error) {
        console.error("Error in /login route:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Insert data into MySQL
        const sql = "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)";
        const [result] = await pool.execute(sql, [name, email, message]);

        res.status(201).json({ message: "Message saved successfully!", insertedId: result.insertId });
    } catch (error) {
        console.error("❌ Error inserting contact message:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
module.exports = router;
