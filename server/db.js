import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "db.json");

// Very small "database" layer: reads/writes a JSON file on disk.
// Good enough for local dev / learning full-stack flow.
// Swap this file out for a real DB (Postgres, MongoDB, etc.) in production.

function read() {
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

function write(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export default {
  read,
  write,
};
