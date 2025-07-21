import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="text-xl bg-gray-200 dark:bg-gray-800 p-2 rounded-full transition-colors"
    >
      {darkMode ? <Sun /> : <Moon />}
    </button>
  );
}
