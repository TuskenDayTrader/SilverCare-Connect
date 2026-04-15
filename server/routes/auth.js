import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { generateToken } from "../utils/jwt.js";

const router = express.Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { name, email, password, role, seniorName } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "name, email, and password are required" });
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role, seniorName });
    return res.status(201).json({
      token: generateToken(user),
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (e) {
    if (e.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ error: "Email already in use" });
    }
    console.error(e);
    return res.status(500).json({ error: "Registration failed" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }

  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  return res.json({
    token: generateToken(user),
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

export default router;
