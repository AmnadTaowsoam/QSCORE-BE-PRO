// Import necessary modules
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const cookieParser = require("cookie-parser");

// Importing custom middleware and models
const authenticateToken = require("./middleware/authenticateToken");
const { getUserByUsername } = require("./models/userModel");
const refreshTokenModel = require("./models/refreshTokenModel");
const { getMachineConfiguration } = require('../src/models/machineConfigModel');

// Import routes
const cassavaRoutes = require("./routes/cassava");
const cornsRoutes = require("./routes/corns");
const qscoreRoutes = require("./routes/qscore");
const cornMoistRoutes = require("./routes/cornMoist");
const userRoutes = require("./routes/userRoutes"); // Assume you have this
const authRoutes = require("./routes/authRoutes"); // Assume you have this
const machineConfigRoutes = require("./routes/machineConfigRoutes");

// Initialize express app
const app = express();

// Applying essential middleware
console.log("Registering middleware...");
app.use(helmet());
console.log("Middleware registered.");

// Convert environment variable strings to arrays
const PRODUCTION_WHITELISTED_ORIGINS = process.env.PRODUCTION_WHITELISTED_ORIGINS.split(",");
const DEVELOPMENT_WHITELISTED_ORIGINS = process.env.DEVELOPMENT_WHITELISTED_ORIGINS.split(",");

const corsOptionsDelegate = async (req, callback) => {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    const whitelistedOrigins = isProduction ? PRODUCTION_WHITELISTED_ORIGINS : DEVELOPMENT_WHITELISTED_ORIGINS;
    const origin = req.header("Origin");

    if (!origin) {
      callback(null, { origin: true, credentials: true });
      return;
    }

    if (whitelistedOrigins.includes(origin)) {
      callback(null, { origin: true, credentials: true });
      return;
    }

    if (!req.headers["x-machine-id"]) {
      throw new Error("No machine ID provided");
    }

    const machineConfig = await getMachineConfiguration(req.headers["x-machine-id"]);
    if (!machineConfig) {
      throw new Error("Machine configuration not found");
    }

    const originUrl = new URL(origin);
    const isWhitelisted = originUrl.hostname === machineConfig.machine_ip && originUrl.port === machineConfig.port.toString();

    callback(null, { origin: isWhitelisted, credentials: true });
  } catch (error) {
    console.error("CORS Error:", error.message);
    callback(new Error("Not allowed by CORS"), { origin: false });
  }
};

app.use(cors(corsOptionsDelegate));

// Body parsing Middleware
app.use(express.json()); // For parsing application/json

// Logging Middleware
app.use(morgan("dev")); // For logging request details

// Before your route declarations
app.use(cookieParser());

// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Use routes
app.use("/cassava", cassavaRoutes);
app.use("/corns", cornsRoutes);
app.use("/qscore", qscoreRoutes);
app.use("/corn-moist", cornMoistRoutes);
app.use("/api/users", userRoutes);
console.log("Registering routes...");
app.use("/api/auth", authRoutes);
console.log("Routes registered.");
app.use("/api", machineConfigRoutes);

// Basic route for the root of the site
app.get("/", (req, res) => {
  console.log("Root route hit.");
  res.send("Service is running");
});

// Error handling for 404 Not Found
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  res.status(404).json({ message: "Not Found" });
  next();
});

app.use((error, req, res, next) => {
  console.error(error); // Log the error
  res.status(500).json({ message: "Internal Server Error" });
});

// Set the port from .env or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server
app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Failed to start server:", err);
  });
