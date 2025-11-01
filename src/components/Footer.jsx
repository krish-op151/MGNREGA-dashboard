import React from "react";
import { useTranslation } from "react-i18next";
import dgi from '../assets/dgi.png';
import igov from '../assets/igov.png';
import mygov from '../assets/mygov.png';
import nic from '../assets/nic.png';

export default function Footer({ lastUpdated }) {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-blue-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-10 pt-8 pb-3 border-t-[1.5px] border-blue-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 px-4">
        <div>
          <h3 className="font-semibold text-lg mb-3">Useful Links / Support</h3>
          <ul className="space-y-1 text-sm">
            <li>About Portal</li>
            <li>Terms of Use</li>
            <li>Policies</li>
            <li>Accessibility Statement</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div>
          <ul className="space-y-1 text-sm mt-8 md:mt-0">
            <li>Link To Us</li>
            <li>Newsletters</li>
            <li>Sitemap</li>
            <li>Help</li>
            <li>Connect with us</li>
            <li>Feedback</li>
            <li>Public Grievance</li>
          </ul>
        </div>
        <div>
          <span className="block text-xs mb-2">
            This platform is designed and developed by Katyayan Dev Krishna (demo project reference). The content and data shown are based on government public releases/cached for speed.
          </span>
          <div className="flex flex-wrap gap-3 mb-2">
            <div className="w-20 h-10 bg-white rounded shadow">
              <img src={dgi} alt="DGI" />
            </div>
            <div className="w-20 h-10 bg-white rounded shadow">
              <img src={igov} alt="iGOV" />
            </div>
            <div className="w-20 h-10 bg-white rounded shadow">
              <img src={mygov} alt="MyGov" />
            </div>
            <div className="w-20 h-10 bg-white rounded shadow">
              <img src={nic} alt="NIC" />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 border-t border-blue-200 dark:border-gray-700 pt-3">
        <div className="text-xs text-gray-600 dark:text-gray-400">
          Last updated {lastUpdated || new Date().toLocaleString("en-IN")}
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 md:mt-0">
          © 2025 <span className="font-semibold">Katyayan Dev Krishna</span>. {t("footer_rights") || "All rights reserved."}
        </div>
      </div>
    </footer>
  );
}
