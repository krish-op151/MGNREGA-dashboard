import React from "react";
import logo from "../assets/logo.png";
import logo2 from "../assets/logo2.png";

export default function Header({ onToggleTheme, onToggleLanguage, theme, language }) {
  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between py-4 px-6 bg-white dark:bg-gray-900 shadow-md backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90"
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl">
          <img
            src={theme === "dark" ? logo2 : logo}
            alt="MGNREGA logo"
            className="w-15 h-10 object-contain"
          />
        </span>
        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-800 dark:text-yellow-300 tracking-widest">
          MGNREGA <span className="font-light">Report Card</span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleTheme}
          className="rounded-full bg-gray-200 dark:bg-gray-700 p-2 px-4 text-lg hover:ring-2 ring-blue-500 transition"
          title="Toggle dark/light mode"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
        <select
          className="rounded bg-gray-100 dark:bg-gray-800 px-3 py-2 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600"
          value={language}
          onChange={onToggleLanguage}
          aria-label="Select language"
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी (Hindi)</option>
        </select>
      </div>
    </header>
  );
}
