import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  const toggleDarkMode = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    setDarkMode(html.classList.contains('dark'));
  };


  return (
    <nav className="flex items-center justify-between px-6 py-5 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-all">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        Inventory Management System
      </h1>
      {/* Nav Links */}
      <div className="flex items-center space-x-6">
        <a
          href="/"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          Products
        </a>
        <a
          href="/inventory"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          Inventory
        </a>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 transition"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
