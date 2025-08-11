const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectToDb = require("./db/db");
const userRoutes = require("./routes/userRoutes");
const morgan = require("morgan");
const path = require("path");

connectToDb();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/", userRoutes);

// Health check endpoint
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Serve frontend static files from the build directory
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Handle all other routes by returning the index.html of the frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

module.exports = app;
