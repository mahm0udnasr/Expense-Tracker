require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("node:path");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoute.js");
const incomeRoutes = require("./routes/incomeRoute.js");
const expenseRoutes = require("./routes/expenseRoute.js");
const dashboardRoutes = require("./routes/dashboardRoute.js");

const app = express();

// cors middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// parse JSON bodies
app.use(express.json());

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// server uploads folder
app.use("/uploads", express.static(path.json(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
