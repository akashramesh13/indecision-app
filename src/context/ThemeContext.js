import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from 'react';
import { lightTheme, darkTheme, terminalTheme } from '../styles/themes';

const STORAGE_KEY = "indecision-theme-mode";

const ThemeContext = createContext();

function camelToKebab(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function applyTheme(theme) {
  const root = document.documentElement;
  Object.keys(theme).forEach((key) => {
    const cssKey = `--color-${camelToKebab(key)}`;
    root.style.setProperty(cssKey, theme[key]);
  });
}

export function ThemeProvider({ children }) {
  const [themeMode, setThemeModeState] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system" || stored === "terminal") {
      return stored;
    }
    return "system";
  });

  const [systemIsDark, setSystemIsDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  // Listen for OS theme changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setSystemIsDark(e.matches);
    
    // Modern browsers use addEventListener, fallback for older browsers
    if (mq.addEventListener) {
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    } else {
      mq.addListener(handler);
      return () => mq.removeListener(handler);
    }
  }, []);

  const resolvedTheme =
    themeMode === "system" ? (systemIsDark ? "dark" : "light") : themeMode;

  // Apply CSS custom properties before paint
  useLayoutEffect(() => {
    const themeMap = { light: lightTheme, dark: darkTheme, terminal: terminalTheme };
    const theme = themeMap[resolvedTheme];
    
    if (theme) {
      applyTheme(theme);
      document.documentElement.setAttribute("data-theme", resolvedTheme);
    }
  }, [resolvedTheme]);

  const setThemeMode = (mode) => {
    setThemeModeState(mode);
    localStorage.setItem(STORAGE_KEY, mode);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}
