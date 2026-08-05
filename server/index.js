import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.js";
import ordersRouter from "./routes/orders.js";
import subscribersRouter from "./routes/subscribers.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "ceylon-aura-server" });
});

app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/subscribers", subscribersRouter);

app.listen(PORT, () => {
  console.log(`Ceylon Aura API running at http://localhost:${PORT}`);
});
