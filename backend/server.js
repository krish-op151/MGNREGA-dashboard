const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
// Modern node-fetch (v3+) CommonJS interop:
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const db = new sqlite3.Database("./mgndata.db");
const app = express();

app.use(cors());
app.use(express.json());

// Dashboard stats for a district
app.get("/api/district", (req, res) => {
  const { state, district, year } = req.query;
  if (!state || !district || !year) {
    return res.status(400).json({ error: "Missing parameters." });
  }
  db.get(
    `SELECT * FROM mgnrega_stats WHERE LOWER(state)=LOWER(?) AND LOWER(district)=LOWER(?) AND year=?`,
    [state, district, year],
    (err, row) => {
      if (err) return res.status(500).json({ error: "Database error." });
      if (!row) return res.status(404).json({ error: "No data found." });
      res.json(row);
    }
  );
});

// List all states
app.get("/api/states", (req, res) => {
  db.all(
    `SELECT DISTINCT state FROM mgnrega_stats ORDER BY state`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "Database error." });
      res.json(rows.map(r => r.state));
    }
  );
});

// List all districts for a given state
app.get("/api/districts", (req, res) => {
  const { state } = req.query;
  if (!state) return res.status(400).json({ error: "Missing state parameter." });
  db.all(
    `SELECT DISTINCT district FROM mgnrega_stats WHERE LOWER(state)=LOWER(?) ORDER BY district`,
    [state],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "Database error." });
      res.json(rows.map(r => r.district));
    }
  );
});

// List all years for a given state/district
app.get("/api/years", (req, res) => {
  const { state, district } = req.query;
  if (!state || !district) return res.status(400).json({ error: "Missing parameters." });
  db.all(
    `SELECT DISTINCT year FROM mgnrega_stats WHERE LOWER(state)=LOWER(?) AND LOWER(district)=LOWER(?) ORDER BY year DESC`,
    [state, district],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "Database error." });
      res.json(rows.map(r => r.year));
    }
  );
});

// Google Maps Reverse Geocoding Proxy
app.get("/api/google-reverse-geocode", async (req, res) => {
  const { lat, lon } = req.query;
  console.log("GEO API REQUEST:", lat, lon);
  if (!lat || !lon) {
    res.status(400).json({ error: "Missing lat/lon" });
    return;
  }
  try {
    const apiKey = "AIzaSyAMFmHSkTwg8jBFLsiuWC2GYkrIlzhkVko"; // <-- replace with your actual key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&language=en&region=in&key=${apiKey}`;
    console.log("Requesting:", url);
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      console.error("Google API Error:", data);
      return res.status(502).json({ error: "Google API error", details: data });
    }
    console.log("Google data:", JSON.stringify(data.status));
    res.json(data);
  } catch (err) {
    console.error("Error in reverse geocode:", err);
    res.status(500).json({ error: "Reverse geocoding failed." });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
