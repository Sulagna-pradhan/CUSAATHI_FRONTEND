import React from "react";

export type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContextProvider = React.createContext<ThemeContextType | undefined>(
  undefined
);

const useTheme = () => {
  const themeContext = React.useContext(ThemeContextProvider);
  if (!themeContext) {
    throw new Error("useTheme must be called inside ThemeProvider");
  }

  return themeContext;
};

export { ThemeContextProvider, useTheme };
