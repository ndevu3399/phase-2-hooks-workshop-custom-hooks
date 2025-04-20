import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue = null) {
  // 1) Initialize from storage or fallback
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    if (stored !== null) {
      try {
        return JSON.parse(stored);
      } catch {
        return stored;
      }
    }
    return initialValue;
  });

  // 2) Persist on changes
  useEffect(() => {
    const toStore = typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, toStore);
  }, [key, value]);

  // 3) Listen for all storage events, re-read storage and update state
  useEffect(() => {
    function handleStorage() {
      const item = localStorage.getItem(key);
      if (item === null) {
        setValue(null);
      } else {
        try {
          setValue(JSON.parse(item));
        } catch {
          setValue(item);
        }
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [key]);

  return [value, setValue];
}

export default useLocalStorage;
