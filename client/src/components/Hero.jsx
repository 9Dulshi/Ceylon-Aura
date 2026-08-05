import React from "react";
import { ChevronRight } from "lucide-react";
import { img } from "../data.js";

function AuraRings({ size = 420 }) {
  return (
    <svg className="aura-rings" viewBox="0 0 420 420" width={size} height={size} aria-hidden="true">
      <circle cx="210" cy="210" r="70" className="ring ring-1" />
      <circle cx="210" cy="210" r="120" className="ring ring-2" />
      <circle cx="210" cy="210" r="170" className="ring ring-3" />
      <circle cx="210" cy="210" r="205" className="ring ring-4" />
    </svg>
  );
}

export default function Hero() {
  return (
    <header className="ca-hero">
      <div>
        <span className="ca-eyebrow">Resortwear · Made in Sri Lanka</span>
        <h1 style={{ marginTop: 14 }}>
          Clothing, cut
          <br />
          with its own <em>aura</em>.
        </h1>
        <p className="sub">
          Ceylon Aura turns batik, handloom cotton and monsoon-washed linen into everyday
          resortwear — sewn in small batches by artisan tailors across the island.
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a href="#shop" className="ca-cta">
            Shop the Collection <ChevronRight size={16} />
          </a>
          <a href="#story" className="ca-cta ghost">
            Our Craft
          </a>
        </div>
      </div>
      <div className="ca-hero-visual">
        <AuraRings />
        <img
          className="ca-hero-img"
          src={img("ceylon-hero-fashion", 500, 640)}
          alt="Ceylon Aura clothing, dummy fashion photo"
        />
      </div>
    </header>
  );
}
