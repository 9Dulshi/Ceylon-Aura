import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard.jsx";
import { api } from "../api.js";

export default function Products() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .getProducts()
      .then(setProducts)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section className="ca-section tight" id="shop">
      <div className="ca-section-head">
        <span className="ca-eyebrow">The Collection</span>
        <h2>Six pieces, one island of textures.</h2>
        <p>This catalog is fetched live from the Express API at <code>/api/products</code>.</p>
      </div>

      {error && (
        <p style={{ color: "var(--clay)", fontWeight: 600 }}>
          Could not reach the backend ({error}). Make sure the server is running on port 5000.
        </p>
      )}

      <div className="ca-product-grid">
        {products === null && !error
          ? Array.from({ length: 6 }).map((_, i) => <div className="ca-skeleton" key={i} />)
          : (products || []).map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
