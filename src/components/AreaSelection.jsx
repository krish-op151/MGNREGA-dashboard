import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function AreaSelection({ onAreaChange }) {
  const { t } = useTranslation();

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [years, setYears] = useState([]);
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [year, setYear] = useState("");
  const [locationError, setLocationError] = useState("");
  const [autoDetected, setAutoDetected] = useState(false);
  const [autoState, setAutoState] = useState("");
  const [autoDistrict, setAutoDistrict] = useState("");

  function normalizedFind(optionsArr, value) {
    if (!value) return "";
    return (
      optionsArr.find(
        (opt) => opt.trim().toLowerCase() === value.trim().toLowerCase()
      ) || ""
    );
  }

  function extractStateDistrict(results) {
    let state = "", district = "";
    for (const result of results) {
      for (const cmp of result.address_components) {
        if (!state && cmp.types.includes("administrative_area_level_1")) {
          state = cmp.long_name;
        }
        if (!district && cmp.types.includes("administrative_area_level_2")) {
          district = cmp.long_name;
        }
        if (!district && cmp.types.includes("administrative_area_level_3")) {
          district = cmp.long_name;
        }
      }
    }
    return { state, district };
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetch(`/api/google-reverse-geocode?lat=${latitude}&lon=${longitude}`)
            .then((res) => res.json())
            .then((data) => {
              if (data && data.status === "OK" && data.results) {
                const { state: s, district: d } = extractStateDistrict(data.results);
                if (s && d) {
                  setAutoState(s);
                  setAutoDistrict(d);
                }
              }
            })
            .catch(() => {});
        },
        () => { }
      );
    }
  }, []);

  useEffect(() => {
    if (autoState && states.length) {
      const match = normalizedFind(states, autoState);
      if (match) {
        setState(match);
        setAutoDetected(true);
      }
    }
  }, [autoState, states]);

  useEffect(() => {
    if (state) {
      setDistrict("");
      setYear("");
      setDistricts([]);
      setYears([]);
      fetch(`/api/districts?state=${encodeURIComponent(state)}`)
        .then((res) => res.json())
        .then(setDistricts)
        .catch(() => setLocationError(t("Could not fetch districts.")));
    }
  }, [state, t]);

  useEffect(() => {
    if (autoDistrict && districts.length && state) {
      const match = normalizedFind(districts, autoDistrict);
      if (match) {
        setDistrict(match);
        setAutoDetected(true);
      }
    }
  }, [autoDistrict, districts, state]);

  useEffect(() => {
    fetch("/api/states")
      .then((res) => res.json())
      .then(setStates)
      .catch(() => setLocationError(t("Could not fetch available states.")));
  }, [t]);

  useEffect(() => {
    if (state && district) {
      setYear("");
      setYears([]);
      fetch(
        `/api/years?state=${encodeURIComponent(
          state
        )}&district=${encodeURIComponent(district)}`
      )
        .then((res) => res.json())
        .then(setYears)
        .catch(() => setLocationError(t("Could not fetch years.")));
    }
  }, [state, district, t]);

  useEffect(() => {
    if (years.length && !year) {
      if (years.includes("2024-2025")) setYear("2024-2025");
    }
  }, [years, year]);

  useEffect(() => {
    if (state && district && year) {
      onAreaChange({ state, district, year });
    }
  }, [state, district, year, onAreaChange]);

  return (
    <div className="bg-teal-100 dark:bg-gray-800 rounded-lg shadow p-5 mb-6">
      {locationError && (
        <p className="text-sm text-red-600 mb-2">{locationError}</p>
      )}
      {autoDetected && (
        <p className="text-xs text-green-600 mb-2">{t("Auto-detected location")}</p>
      )}
      <div className="grid font-bold md:grid-cols-3 gap-4">
        <div>
          <label className="block text-red-500 dark:text-red-500 mb-1">
            {t("State")}
          </label>
          <select
            className="w-full border px-2 py-1 dark:text-white text-black rounded-lg"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              setAutoDetected(false);
              setAutoState("");
            }}
          >
            <option value="">{t("Select State")}</option>
            {states.map((s) => (
              <option className="text-black" key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">
            {t("District")}
          </label>
          <select
            className="w-full border px-2 py-1 dark:text-white text-black rounded-lg"
            value={district}
            onChange={(e) => {
              setDistrict(e.target.value);
              setAutoDetected(false);
              setAutoDistrict("");
            }}
            disabled={!state}
          >
            <option value="">{t("Select District")}</option>
            {districts.map((d) => (
              <option className="text-black" key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">
            {t("Year")}
          </label>
          <select
            className="w-full border px-2 py-1 dark:text-white text-black rounded-lg"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            disabled={!district}
          >
            <option value="">{t("Select Year")}</option>
            {years.map((y) => (
              <option className="text-black" key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
