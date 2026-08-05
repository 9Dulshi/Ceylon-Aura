import React from "react";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "../data.js";

export default function Testimonials() {
  return (
    <section className="ca-section" id="reviews">
      <div className="ca-section-head">
        <span className="ca-eyebrow">What People Say</span>
        <h2>Customers across the island, in their own words.</h2>
      </div>
      <div className="ca-testimonial-grid">
        {TESTIMONIALS.map((t) => (
          <div className="ca-testimonial" key={t.name}>
            <div className="ca-stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={15} fill={i < t.rating ? "currentColor" : "none"} />
              ))}
            </div>
            <p className="quote">&ldquo;{t.quote}&rdquo;</p>
            <span className="who">
              {t.name} · {t.city}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
