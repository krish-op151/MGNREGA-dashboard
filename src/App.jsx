import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import AreaSelection from "./components/AreaSelection";
import MonthlyReportCard from "./components/MonthlyReportCard";
import Footer from "./components/Footer";
import "./i18n";
import i18n from "i18next";

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [language, setLanguage] = useState(() => localStorage.getItem("language") || "en");
  const [selectedArea, setSelectedArea] = useState({ state: "", district: "", year: "" });

  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) setTheme("dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  useEffect(() => {
    localStorage.setItem("language", language);
    i18n.changeLanguage(language);
  }, [language]);

  const handleToggleLanguage = (e) => setLanguage(e.target.value);

  return (
    <>
      <Header
        theme={theme}
        language={language}
        onToggleTheme={handleToggleTheme}
        onToggleLanguage={handleToggleLanguage}
      />
      <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <AreaSelection onAreaChange={setSelectedArea} />
        <MonthlyReportCard
          state={selectedArea.state}
          district={selectedArea.district}
          year={selectedArea.year}
        />
        <Footer lastUpdated="01/11/2025 - 12:43:17" />
      </div>
    </>
  );
}

export default App;
