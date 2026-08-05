import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Story from "./components/Story.jsx";
import Products from "./components/Products.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Newsletter from "./components/Newsletter.jsx";
import Footer from "./components/Footer.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import { CartProvider, useCart } from "./context/CartContext.jsx";
import { api } from "./api.js";

function AppShell() {
  const { cart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);

  // Products are also loaded here so the cart drawer can resolve item details
  useEffect(() => {
    api.getProducts().then(setProducts).catch(() => setProducts([]));
  }, []);

  const cartCount = Object.values(cart).reduce((s, qty) => s + qty, 0);

  return (
    <div className="ca-root">
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} onMenuClick={() => setMenuOpen((v) => !v)} />
      <Hero />
      <Story />
      <Products />
      <Testimonials />
      <Newsletter />
      <Footer />

      {cartOpen && <CartDrawer products={products} onClose={() => setCartOpen(false)} />}

      {menuOpen && (
        <div className="ca-overlay" onClick={() => setMenuOpen(false)} style={{ justifyContent: "flex-start" }}>
          <div className="ca-drawer" style={{ width: "80vw" }}>
            <div className="ca-drawer-head">
              <h3>Menu</h3>
              <button className="ca-icon-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X size={22} />
              </button>
            </div>
            <a href="#shop" style={{ padding: "12px 0", fontWeight: 700 }} onClick={() => setMenuOpen(false)}>Shop</a>
            <a href="#story" style={{ padding: "12px 0", fontWeight: 700 }} onClick={() => setMenuOpen(false)}>Our Craft</a>
            <a href="#reviews" style={{ padding: "12px 0", fontWeight: 700 }} onClick={() => setMenuOpen(false)}>Reviews</a>
            <a href="#contact" style={{ padding: "12px 0", fontWeight: 700 }} onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppShell />
    </CartProvider>
  );
}
