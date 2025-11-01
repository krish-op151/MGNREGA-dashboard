const sqlite3 = require('sqlite3').verbose();
// const fetch = require('node-fetch');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


const db = new sqlite3.Database('./mgndata.db');

// Replace with your real API endpoint and API key:
const API_URL = 'https://api.data.gov.in/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722';
// const API_KEY = '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b'; // Get from data.gov.in portal
const API_KEY = '579b464db66ec23bdd00000188256061640e4b3f75e0923cea3031ae'; // Get from data.gov.in portal

// Example: How the API is called (please confirm real API url and params)
// const buildUrl = () =>
//   `${API_URL}?api-key=${API_KEY}&format=json&filters[state_name]=&filters[district_name]=&filters[finyear]=`;

const buildUrl = (state, district, year) =>
  `${API_URL}?api-key=${API_KEY}&format=json&limit=1000` +
  (state ? `&filters[state_name]=${encodeURIComponent(state)}` : '') +
  (district ? `&filters[district_name]=${encodeURIComponent(district)}` : '') +
  (year ? `&filters[fin_year]=${encodeURIComponent(year)}` : '');


async function downloadAndStore() {
  // Fetch from API
  const res = await fetch(buildUrl());
  const data = await res.json();

  const rows = data.records || data.data || data.result.records || []; // adjust as needed

  db.serialize(() => {
    db.run("DELETE FROM mgnrega_stats");

    const stmt = db.prepare(`INSERT INTO mgnrega_stats (
      state, district, year,
      families_provided_work, total_work_days, works_completed, funds_used,
      households_worked, average_wage_rate, payments_15days_percent, individuals_worked
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

    rows.forEach(row => {
      stmt.run(
        row.state_name,
        row.district_name,
        row.fin_year,
        row.Total_Households_Worked,                 // For "families_provided_work"
        row.Persondays_of_Central_Liability_so_far,  // For "total_work_days" (actual workdays if needed, else pick matching field)
        row.Number_of_Completed_Works,               // For "works_completed"
        row.Total_Exp,                               // For "funds_used"
        row.Total_Households_Worked,                 // For "households_worked"
        row.Average_Wage_rate_per_day_per_person,    // For "average_wage_rate"
        row.percentage_payments_gererated_within_15_days, // For "payments_15days_percent"
        row.Total_Individuals_Worked                 // For "individuals_worked"
      );

    });
    console.log('API Sample Row:', rows[0]);
    stmt.finalize();
    console.log("Inserted ETL data into mgnrega_stats.");
    db.close();
  });
}

downloadAndStore();
