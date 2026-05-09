const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./docs/swagger");

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const leaveRoutes = require("./routes/leaveRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/leaves", leaveRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Leave Management API Running",
  });
});

module.exports = app;
