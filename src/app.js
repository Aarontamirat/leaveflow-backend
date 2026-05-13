const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const rateLimit = require("express-rate-limit");

const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./docs/swagger");

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const leaveRoutes = require("./routes/leaveRoutes");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(limiter);
app.use(helmet());
app.use(express.json());

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/leaves", leaveRoutes);

app.get("/api", (req, res) => {
  res.json({
    message: "API is working",
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "Leave Management API Running",
  });
});

module.exports = app;
