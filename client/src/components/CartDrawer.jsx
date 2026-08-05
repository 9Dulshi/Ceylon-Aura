import React, { useState } from "react";
import { X, Minus, Plus, Check, Shirt } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { money, img } from "../data.js";
import { api } from "../api.js";

export default function CartDrawer({ products, onClose }) {
  const { cart, changeQty, clearCart } = useCart();
  const [status, setStatus] = useState("idle"); // idle | processing | success | error
  const [order, setOrder] = useState(null);

  const cartItems = Object.entries(cart)
    .map(([key, qty]) => {
      const [id, size] = key.split("::");
      const p = (products || []).find((p) => p.id === id);
      return p ? { ...p, size, qty, key } : null;
    })
    .filter(Boolean);

  const total = cartItems.reduce((s, i) => s + i.qty * i.price, 0);

  const placeOrder = async () => {
    if (cartItems.length === 0) return;
    setStatus("processing");
    try {
      const placed = await api.placeOrder({ items: cartItems, total });
      setOrder(placed);
      clearCart();
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const closeSuccess = () => {
    setStatus("idle");
    setOrder(null);
    onClose();
  };

  return (
    <div className="ca-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="ca-drawer">
        {status === "success" && order ? (
          <div className="ca-order-success">
            <div className="check-circle">
              <Check size={28} />
            </div>
            <h3>Order placed</h3>
            <p style={{ color: "rgba(27,23,18,0.65)", marginTop: 8 }}>Saved to the database via the orders API.</p>
            <div className="ca-order-id ca-mono">{order.id}</div>
            <p className="ca-mono" style={{ fontSize: 14 }}>
              {money(order.total)} · {order.items.length} item(s)
            </p>
            <button className="ca-cta" style={{ marginTop: 20 }} onClick={closeSuccess}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="ca-drawer-head">
              <h3>Your Bag</h3>
              <button className="ca-icon-btn" onClick={onClose} aria-label="Close cart">
                <X size={22} />
              </button>
            </div>
            {cartItems.length === 0 ? (
              <div className="ca-cart-empty">
                <Shirt size={30} style={{ marginBottom: 10, opacity: 0.4 }} />
                <p>Your bag is empty. Add a piece to get started.</p>
              </div>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div className="ca-cart-item" key={item.key}>
                    <img src={img(item.seed, 100, 100)} alt={item.name} />
                    <div className="ca-cart-item-info">
                      <div className="name">{item.name}</div>
                      <div className="type">
                        {item.type} · Size {item.size}
                      </div>
                      <div className="ca-qty">
                        <button onClick={() => changeQty(item.key, -1)} aria-label="Decrease">
                          <Minus size={12} />
                        </button>
                        <span className="ca-mono">{item.qty}</span>
                        <button onClick={() => changeQty(item.key, 1)} aria-label="Increase">
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <span className="ca-price">{money(item.price * item.qty)}</span>
                  </div>
                ))}
                <div className="ca-cart-total">
                  <span>Total</span>
                  <span className="ca-mono">{money(total)}</span>
                </div>
                {status === "error" && (
                  <p style={{ color: "var(--clay)", fontSize: 13, marginTop: 8 }}>
                    Could not reach the backend. Make sure the server is running on port 5000.
                  </p>
                )}
                <button
                  className="ca-cta"
                  style={{ width: "100%", justifyContent: "center", marginTop: 16 }}
                  onClick={placeOrder}
                  disabled={status === "processing"}
                >
                  {status === "processing" ? <>Processing order…</> : <>Place Order · {money(total)}</>}
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
