const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Nitika@0904#",
    database: "FSE_Project",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Check Database Connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Error in DB connection:", JSON.stringify(err));
        process.exit(1); // Exit process if DB connection fails
    } else {
        console.log("✅ Database connected successfully!");
        connection.release(); // Release the connection back to the pool
    }
});

module.exports = pool.promise(); // Use async/await for queries
