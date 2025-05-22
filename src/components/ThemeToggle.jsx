// src/components/ThemeToggle.jsx
import { useState, useEffect } from 'react';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    // Initialize from localStorage or default to dark mode
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    // Update class and localStorage on theme change
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="theme-toggle"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="theme-toggle-slider" />
    </button>
  );
}

export default ThemeToggle;