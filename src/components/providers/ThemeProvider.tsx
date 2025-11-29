import React from "react";
import { useLocalStorage } from "../../hooks";
import { readCookie } from "../../utils/cookie";
import { Theme, ThemeContextProvider } from "../../lib/contexts";

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
  const cookieTheme = readCookie("prefered_theme");
  const [_theme, _setTheme] = useLocalStorage<Theme>(
    "theme",
    cookieTheme ? (cookieTheme as Theme) : "light"
  );

  React.useLayoutEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(_theme);
  }, [_theme]);

  const setTheme = (theme: Theme) => {
    _setTheme(theme);
  };

  const toggleTheme = () => {
    _theme === "light" ? _setTheme("dark") : _setTheme("light");
  };

  return (
    <ThemeContextProvider.Provider
      value={{
        theme: _theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContextProvider.Provider>
  );
};

export { ThemeProvider };
