require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost") ? { rejectUnauthorized: false } : false,
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/district", async (req, res) => {
  const { state, district, year } = req.query;
  if (!state || !district || !year) return res.status(400).json({ error: "Missing parameters." });
  try {
    const result = await pool.query(
      "SELECT * FROM mgnrega_stats WHERE LOWER(state)=LOWER($1) AND LOWER(district)=LOWER($2) AND year=$3 LIMIT 1",
      [state, district, year]
    );
    if (!result.rows.length) return res.status(404).json({ error: "No data found." });
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: "Database error." });
  }
});

app.get("/api/states", async (req, res) => {
  try {
    const result = await pool.query("SELECT DISTINCT state FROM mgnrega_stats ORDER BY state");
    res.json(result.rows.map(r => r.state));
  } catch {
    res.status(500).json({ error: "Database error." });
  }
});

app.get("/api/districts", async (req, res) => {
  const { state } = req.query;
  if (!state) return res.status(400).json({ error: "Missing state parameter." });
  try {
    const result = await pool.query(
      "SELECT DISTINCT district FROM mgnrega_stats WHERE LOWER(state)=LOWER($1) ORDER BY district",
      [state]
    );
    res.json(result.rows.map(r => r.district));
  } catch {
    res.status(500).json({ error: "Database error." });
  }
});

app.get("/api/years", async (req, res) => {
  const { state, district } = req.query;
  if (!state || !district) return res.status(400).json({ error: "Missing parameters." });
  try {
    const result = await pool.query(
      "SELECT DISTINCT year FROM mgnrega_stats WHERE LOWER(state)=LOWER($1) AND LOWER(district)=LOWER($2) ORDER BY year DESC",
      [state, district]
    );
    res.json(result.rows.map(r => r.year));
  } catch {
    res.status(500).json({ error: "Database error." });
  }
});

app.get("/api/google-reverse-geocode", async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: "Missing lat/lon" });
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&language=en&region=in&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) return res.status(502).json({ error: "Google API error", details: data });
    res.json(data);
  } catch {
    res.status(500).json({ error: "Reverse geocoding failed." });
  }
});

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
