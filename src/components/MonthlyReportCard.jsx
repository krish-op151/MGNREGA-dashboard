import React, { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { useTranslation } from "react-i18next";

export default function MonthlyReportCard({ state, district, year }) {
  const { t } = useTranslation();
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (state && district && year) {
      setLoading(true);
      setError("");
      fetch(`/api/district?state=${encodeURIComponent(state)}&district=${encodeURIComponent(district)}&year=${encodeURIComponent(year)}`)
        .then(res => {
          if (!res.ok) throw new Error("No data");
          return res.json();
        })
        .then(data => {
          setMetrics([
            {
              title: t("Families Provided Work"),
              value: data.families_provided_work || "--",
              description: t("Families Provided Work Desc"),
              info: t("Families Provided Work Info")
            },
            {
              title: t("Total Work-Days Generated"),
              value: data.total_work_days || "--",
              description: t("Total Work-Days Generated Desc"),
              info: t("Total Work-Days Generated Info")
            },
            {
              title: t("Works Completed"),
              value: data.works_completed || "--",
              description: t("Works Completed Desc"),
              info: t("Works Completed Info")
            },
            {
              title: t("Funds Used (in Crores)"),
              value: data.funds_used || "--",
              description: t("Funds Used (in Crores) Desc"),
              info: t("Funds Used (in Crores) Info")
            },
            {
              title: t("Households Worked"),
              value: data.households_worked || "--",
              description: t("Households Worked Desc"),
              info: t("Households Worked Info")
            },
            {
              title: t("Average Wage Rate per Day (₹)"),
              value: data.average_wage_rate || "--",
              description: t("Average Wage Rate per Day (₹) Desc"),
              info: t("Average Wage Rate per Day (₹) Info")
            },
            {
              title: t("% Payments within 15 Days"),
              value: data.payments_15days_percent || "--",
              description: t("% Payments within 15 Days Desc"),
              info: t("% Payments within 15 Days Info")
            },
            {
              title: t("Individuals Worked"),
              value: data.individuals_worked || "--",
              description: t("Individuals Worked Desc"),
              info: t("Individuals Worked Info")
            }
          ]);
        })
        .catch(() => {
          setError(t("Unable to load district data."));
          setMetrics([]);
        })
        .finally(() => setLoading(false));
    } else {
      setMetrics([]);
    }
  }, [state, district, year, t]);

  if (!(state && district && year)) return null;
  if (loading) return <div className="py-10 text-center">{t("Loading district data...")}</div>;
  if (error) return <div className="py-10 text-center text-red-600">{error}</div>;

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        {t("Monthly Performance Report")} ({district})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map(m => m && <StatCard key={m.title} {...m} />)}
      </div>
    </section>
  );
}
