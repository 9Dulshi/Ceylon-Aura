import { Router } from "express";
import db from "../db.js";

const router = Router();

// POST /api/orders — place a new order, saved to the JSON "database"
router.post("/", (req, res) => {
  const { items, total } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Order must include at least one item" });
  }

  const data = db.read();

  const order = {
    id: "CA-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
    items,
    total,
    date: new Date().toISOString(),
  };

  data.orders.push(order);
  db.write(data);

  res.status(201).json(order);
});

// GET /api/orders — list all orders (e.g. for an admin view)
router.get("/", (req, res) => {
  const data = db.read();
  res.json(data.orders);
});

// GET /api/orders/:id — fetch a single order by id
router.get("/:id", (req, res) => {
  const data = db.read();
  const order = data.orders.find((o) => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
});

export default router;
