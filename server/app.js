import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./db.js";
import authRoutes from "./routes/auth.js";
import sessionRoutes from "./routes/sessions.js";
import { authenticateToken } from "./middleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.send("SilverCare API running"));

// Auth routes (register / login) — no token required
app.use("/api/auth", authRoutes);

// Session routes — authenticated endpoints under /api/sessions
// Public submission endpoint is defined first inside sessions.js
app.use("/api/sessions", sessionRoutes);

const port = process.env.PORT || 4000;

sequelize
  .sync()
  .then(() => {
    app.listen(port, () =>
      console.log(`SilverCare server running on http://localhost:${port}`)
    );
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });
