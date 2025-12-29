"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Language = "en" | "hr";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "dm_language";

function isValidLanguage(value: unknown): value is Language {
  return value === "en" || value === "hr";
}

type LanguageProviderProps = {
  children: React.ReactNode;
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  // Default to English during SSR and initial client render to keep
  // server and client markup in sync and avoid hydration mismatches.
  const [language, setLanguageState] = useState<Language>("en");

  // On mount, read any stored language from localStorage and sync state.
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isValidLanguage(stored)) {
        // eslint-disable-next-line
        setLanguageState(stored);
      }
    } catch {
      // Ignore read errors and fall back to default "en".
    }
  }, []);

  // Persist language to localStorage whenever it changes.
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Ignore write errors.
    }
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === "en" ? "hr" : "en"));
  }, []);

  const value: LanguageContextValue = {
    language,
    setLanguage,
    toggleLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      <div data-lang={language}>{children}</div>
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}