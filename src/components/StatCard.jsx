import React from "react";
import { useTranslation } from "react-i18next";

export default function StatCard({ title, value, description, trend, up, info }) {
  const { t } = useTranslation();
  const directionSymbol = up === "UP" ? "▲" : "▼";
  const directionText = up === "UP" ? t("performance_up") : t("performance_down");

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-5 flex-1 min-w-[200px] relative">
      <div className="absolute top-4 right-4">
        {info && (
          <span
            className="cursor-pointer text-gray-400 dark:text-gray-500"
            title={info}
          >
            More Info❓
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">
        {title}
      </h3>
      <div className="text-3xl font-bold text-indigo-700 dark:text-indigo-400 mb-2">{value}</div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{description}</p>
      <span className={`text-sm font-bold flex items-center ${up === "UP" ? "text-green-600" : "text-red-500"}`}>
        {directionSymbol} {directionText}
      </span>
    </div>
  );
}
