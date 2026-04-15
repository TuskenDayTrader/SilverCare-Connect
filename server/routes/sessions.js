import express from "express";
import { SessionRequest } from "../models/SessionRequest.js";
import { authenticateToken } from "../middleware.js";

const router = express.Router();

// POST /api/sessions/public
// No auth required — used by the public request form on index.html
router.post("/public", async (req, res) => {
  const { familyName, contactEmail, residentName, facilityId, date, time, notes } =
    req.body;

  if (!familyName || !contactEmail || !residentName || !date || !time) {
    return res
      .status(400)
      .json({ error: "familyName, contactEmail, residentName, date, and time are required" });
  }

  try {
    const session = await SessionRequest.create({
      familyName,
      contactEmail,
      residentName,
      facilityId: facilityId || null,
      date,
      time,
      notes: notes || null,
    });
    return res.status(201).json({ message: "Session request submitted", id: session.id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Could not save session request" });
  }
});

// POST /api/sessions — authenticated: create a session linked to the logged-in user
router.post("/", authenticateToken, async (req, res) => {
  const { date, time, notes, facilityId, residentName } = req.body;

  if (!date || !time) {
    return res.status(400).json({ error: "date and time are required" });
  }

  try {
    const session = await SessionRequest.create({
      familyName: req.user.name,
      contactEmail: req.user.email,
      residentName: residentName || req.user.seniorName || "",
      facilityId: facilityId || null,
      date,
      time,
      notes: notes || null,
      UserId: req.user.id,
    });
    return res.status(201).json(session);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Could not save session request" });
  }
});

// GET /api/sessions — authenticated: list sessions for the logged-in user
router.get("/", authenticateToken, async (req, res) => {
  const sessions = await SessionRequest.findAll({ where: { UserId: req.user.id } });
  return res.json(sessions);
});

export default router;
