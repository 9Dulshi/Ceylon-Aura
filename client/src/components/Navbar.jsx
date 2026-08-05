import React from "react";
import { ShoppingBag, Menu } from "lucide-react";

export default function Navbar({ cartCount, onCartClick, onMenuClick }) {
  return (
    <nav className="ca-nav">
      <div className="ca-logo">
        <span className="ca-logo-dot" />
        Ceylon Aura
      </div>
      <ul className="ca-nav-links">
        <li><a href="#shop">Shop</a></li>
        <li><a href="#story">Our Craft</a></li>
        <li><a href="#reviews">Reviews</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="ca-nav-right">
        <button className="ca-icon-btn ca-menu-toggle" aria-label="Menu" onClick={onMenuClick}>
          <Menu size={22} />
        </button>
        <button className="ca-icon-btn" aria-label="Cart" onClick={onCartClick}>
          <ShoppingBag size={22} />
          {cartCount > 0 && <span className="ca-badge">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
}
