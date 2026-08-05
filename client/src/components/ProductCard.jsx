import React, { useState } from "react";
import { Plus } from "lucide-react";
import { SIZES, money, img } from "../data.js";
import { useCart } from "../context/CartContext.jsx";

export default function ProductCard({ product }) {
  const [size, setSize] = useState("M");
  const { addToCart } = useCart();

  return (
    <div className="ca-card">
      <img src={img(product.seed, 500, 460)} alt={`${product.name} — ${product.type}, dummy product photo`} />
      <div className="ca-card-body">
        <span className="ca-card-type">{product.type}</span>
        <h3>{product.name}</h3>
        <p className="blurb">{product.blurb}</p>
        <div className="ca-sizes">
          {SIZES.map((s) => (
            <button
              key={s}
              className={`ca-size-btn ${size === s ? "active" : ""}`}
              onClick={() => setSize(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="ca-card-footer">
          <span className="ca-price">{money(product.price)}</span>
          <button className="ca-add-btn" onClick={() => addToCart(product.id, size)}>
            <Plus size={14} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
