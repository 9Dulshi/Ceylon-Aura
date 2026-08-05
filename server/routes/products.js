import { Router } from "express";
import db from "../db.js";

const router = Router();

// GET /api/products — list the catalog
router.get("/", (req, res) => {
  const data = db.read();
  res.json(data.products);
});

// GET /api/products/:id — a single product
router.get("/:id", (req, res) => {
  const data = db.read();
  const product = data.products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

export default router;
