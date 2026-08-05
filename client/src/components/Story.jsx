import React from "react";
import { TIMELINE } from "../data.js";

export default function Story() {
  return (
    <section className="ca-section" id="story">
      <div className="ca-section-head">
        <span className="ca-eyebrow">From Loom to Wardrobe</span>
        <h2>Every piece follows five steps before it reaches you.</h2>
        <p>We work with small handloom mills and tailoring houses instead of factories.</p>
      </div>
      <div className="ca-timeline">
        {TIMELINE.map((t) => (
          <div className="ca-timeline-item" key={t.n}>
            <div className="n">{t.n}</div>
            <h3>{t.title}</h3>
            <p>{t.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
