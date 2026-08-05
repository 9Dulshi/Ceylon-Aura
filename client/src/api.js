const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function handle(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export const api = {
  getProducts: () => fetch(`${API_URL}/products`).then(handle),

  placeOrder: (order) =>
    fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    }).then(handle),

  subscribe: (email) =>
    fetch(`${API_URL}/subscribers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).then(handle),

  getSubscriberCount: () => fetch(`${API_URL}/subscribers/count`).then(handle),
};
