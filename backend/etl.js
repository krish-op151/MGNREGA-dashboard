require('dotenv').config();
const { Pool } = require('pg');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const API_URL = 'https://api.data.gov.in/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722';
const API_KEY = process.env.DATA_GOV_API_KEY;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost") ? { rejectUnauthorized: false } : false,
});

const buildUrl = (state, district, year) =>
  `${API_URL}?api-key=${API_KEY}&format=json&limit=1000`
  + (state ? `&filters[state_name]=${encodeURIComponent(state)}` : '')
  + (district ? `&filters[district_name]=${encodeURIComponent(district)}` : '')
  + (year ? `&filters[fin_year]=${encodeURIComponent(year)}` : '');

async function downloadAndStore() {
  const res = await fetch(buildUrl());
  const data = await res.json();
  const rows = data.records || data.data || data.result?.records || [];

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query("DELETE FROM mgnrega_stats");
    const insert =
      `INSERT INTO mgnrega_stats (
        state, district, year, families_provided_work, total_work_days,
        works_completed, funds_used, households_worked, average_wage_rate,
        payments_15days_percent, individuals_worked
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`;
    for (const row of rows) {
      await client.query(insert, [
        row.state_name,
        row.district_name,
        row.fin_year,
        row.Total_Households_Worked,
        row.Persondays_of_Central_Liability_so_far,
        row.Number_of_Completed_Works,
        row.Total_Exp,
        row.Total_Households_Worked,
        row.Average_Wage_rate_per_day_per_person,
        row.percentage_payments_gererated_within_15_days,
        row.Total_Individuals_Worked
      ]);
    }
    await client.query('COMMIT');
    if (rows.length) console.log('Sample row:', rows[0]);
    console.log(`Inserted ${rows.length} rows into mgnrega_stats.`);
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('ETL Error:', e);
  } finally {
    client.release();
    process.exit(0);
  }
}

downloadAndStore();
