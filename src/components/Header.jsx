import React from "react";
import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon, FiMonitor, FiTerminal } from "react-icons/fi";

const Header = ({ title = "Indecision", subtitle }) => {
  const { themeMode, setThemeMode } = useTheme();

  const handleThemeToggle = () => {
    switch (themeMode) {
      case "system":
        setThemeMode("light");
        break;
      case "light":
        setThemeMode("dark");
        break;
      case "dark":
        setThemeMode("terminal");
        break;
      case "terminal":
        setThemeMode("system");
        break;
      default:
        setThemeMode("system");
    }
  };

  const ThemeIcon = () => {
    switch (themeMode) {
      case "light":
        return <FiSun />;
      case "dark":
        return <FiMoon />;
      case "terminal":
        return <FiTerminal />;
      default:
        return <FiMonitor />;
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <div className="navbar__brand">
          {title}
        </div>
      </div>
      <div className="navbar__right">
        <button className="theme-toggle" onClick={handleThemeToggle} aria-label="Toggle Theme">
          <ThemeIcon />
        </button>
      </div>
    </nav>
  );
};

export default Header;
