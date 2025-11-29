import React from "react";

function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  function _populate(v: T | (() => T)): T {
    return typeof v === "function" ? (v as () => T)() : v;
  }

  const [storedValue, setStoredValue] = React.useState<T>(() => {
    if (typeof window === "undefined") {
      return _populate(initialValue);
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : _populate(initialValue);
    } catch (error) {
      console.error(error);
      return _populate(initialValue);
    }
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error(error);
      }
    }
  }, [key, storedValue]);

  const removeItem = () => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(key);
        setStoredValue(_populate(initialValue));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return [storedValue, setStoredValue, removeItem] as const;
}

export { useLocalStorage };
