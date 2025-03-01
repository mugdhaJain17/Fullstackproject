const express = require("express");
const cors = require("cors");
const connection = require("./connection"); // Ensure DB connection
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");


const app = express();


app.use('/uploads', express.static('uploads'));
app.use(express.json()); // Use built-in JSON parser
app.use(cors());

// API Routes
app.use("/api", authRoutes);
app.use("/api", productRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
