import React from "react";
import { Instagram, Facebook, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="ca-footer">
      <div>
        <div className="ca-logo" style={{ marginBottom: 12 }}>
          <span className="ca-logo-dot" />
          Ceylon Aura
        </div>
        <div className="ca-social">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <Instagram size={17} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
            <Facebook size={17} />
          </a>
          <a href="https://wa.me/94770000000" target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <MessageCircle size={17} />
          </a>
        </div>
      </div>
      <div className="ca-footer-cols">
        <div className="ca-footer-col">
          <h4>Shop</h4>
          <a href="#shop">Men's</a>
          <a href="#shop">Women's</a>
          <a href="#shop">Resort Wear</a>
        </div>
        <div className="ca-footer-col">
          <h4>Company</h4>
          <a href="#story">Our Craft</a>
          <a href="#reviews">Reviews</a>
          <a href="#contact">Newsletter</a>
        </div>
      </div>
      <div className="ca-fineprint">
        Demo storefront · Ceylon Aura is a fictional brand · All products, names and reviews are for demonstration only.
      </div>
    </footer>
  );
}
