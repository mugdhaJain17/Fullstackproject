const express = require("express");
const cors = require("cors");
const connection = require("./connection");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
//const mongoose = require('mongoose');
const app = express();

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", productRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
