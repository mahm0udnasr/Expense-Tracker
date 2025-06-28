require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("node:path");

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
