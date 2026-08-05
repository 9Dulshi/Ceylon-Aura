import { Router } from "express";
import db from "../db.js";

const router = Router();

// POST /api/subscribers — add an email to the newsletter list
router.post("/", (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "A valid email is required" });
  }

  const data = db.read();

  if (!data.subscribers.includes(email)) {
    data.subscribers.push(email);
    db.write(data);
  }

  res.status(201).json({ email, count: data.subscribers.length });
});

// GET /api/subscribers/count — total subscriber count
router.get("/count", (req, res) => {
  const data = db.read();
  res.json({ count: data.subscribers.length });
});

export default router;
