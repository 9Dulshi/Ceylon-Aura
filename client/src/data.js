export const SIZES = ["S", "M", "L", "XL"];

export const TIMELINE = [
  { n: "01", title: "Sourced from Local Looms", text: "Cotton and linen woven by small handloom mills across the island." },
  { n: "02", title: "Hand-Dyed with Natural Pigments", text: "Batik and dip-dye work done in small batches, never two pieces alike." },
  { n: "03", title: "Cut & Stitched by Artisan Tailors", text: "Every seam finished by a tailor who's worked with us for years." },
  { n: "04", title: "Quality Checked, Thread by Thread", text: "Each garment inspected by hand before it's folded for shipping." },
  { n: "05", title: "Wrapped in Reusable Cloth Pouches", text: "No plastic — your order arrives in a pouch you'll actually keep." },
];

export const TESTIMONIALS = [
  { name: "Amaya Fernando", city: "Colombo", quote: "The Monsoon Linen Dress fits like it was made for humidity — because it was.", rating: 5 },
  { name: "Ruwan Peris", city: "Kandy", quote: "The Spice Route Jacket is the only thing I pack now, warm or cool weather.", rating: 5 },
  { name: "Nadeesha Silva", city: "Galle", quote: "The batik on the Aura shirt is genuinely hand-blocked. You can see it up close.", rating: 4 },
];

export const money = (n) => `Rs. ${n.toLocaleString("en-LK")}.00`;
export const img = (seed, w, h) => `https://picsum.photos/seed/${seed}/${w}/${h}`;
