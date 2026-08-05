import React, { useEffect, useState } from "react";
import { Mail, Check, Loader2 } from "lucide-react";
import { api } from "../api.js";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | processing | success | error
  const [count, setCount] = useState(null);

  useEffect(() => {
    api
      .getSubscriberCount()
      .then((res) => setCount(res.count))
      .catch(() => setCount(null));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setStatus("processing");
    try {
      const res = await api.subscribe(email);
      setCount(res.count);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section className="ca-newsletter" id="contact">
      <div>
        <span className="ca-eyebrow" style={{ color: "var(--gold-soft)" }}>
          Join the Aura List
        </span>
        <h2>Get first access to new drops.</h2>
        <p>One email a month. No spam, just the next collection before it sells out.</p>
        {count !== null && <div className="ca-sub-count">{count.toLocaleString()} people already signed up</div>}
      </div>
      <div>
        {status === "success" ? (
          <div className="ca-success-note">
            <Check size={18} /> You're on the list — saved to the database.
          </div>
        ) : (
          <form className="ca-form" onSubmit={handleSubmit}>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "processing"}
            />
            <button type="submit" disabled={status === "processing"}>
              {status === "processing" ? <Loader2 size={16} className="spin" /> : <Mail size={16} />}
              {status === "processing" ? "Saving..." : "Subscribe"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p style={{ color: "var(--gold-soft)", marginTop: 10, fontSize: 13 }}>
            Could not reach the backend. Make sure the server is running on port 5000.
          </p>
        )}
      </div>
    </section>
  );
}
