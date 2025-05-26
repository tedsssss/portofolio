"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Lang = "en" | "id";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
});

export const useLang = () => useContext(LangContext);

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");

  // Simpan ke localStorage agar persistent
  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored === "id" || stored === "en") setLang(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
};
