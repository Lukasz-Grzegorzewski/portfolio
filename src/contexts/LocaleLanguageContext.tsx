import React, { createContext, useContext, useState, useEffect } from "react";
import { LocalLanguage } from "@src/types/localLanguage.type";
import { useTranslation } from "react-i18next";

type LocaleLanguageContextProps = {
  localeLanguage: LocalLanguage;
  changLanguage: (language: LocalLanguage) => void;
};

const LocaleLanguageContext = createContext<
  LocaleLanguageContextProps | undefined
>(undefined);

export const LocaleLanguageProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [localeLanguage, setLocaleLanguage] = useState<LocalLanguage>("fr");
  const { i18n } = useTranslation("common");

  const changLanguage = (lang: LocalLanguage) => {
    setLocaleLanguage(lang);
    sessionStorage.setItem("localLanguage", lang);
  };

  useEffect(() => {
    const getVisitorIp = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        const sessionLanguage = sessionStorage.getItem(
          "localLanguage",
        ) as LocalLanguage;

        const language: LocalLanguage = sessionLanguage
          ? sessionLanguage
          : data.country === "FR"
            ? "fr"
            : data.country === "PL"
              ? "pl"
              : "en";

        if (!sessionLanguage) sessionStorage.setItem("localLanguage", language);

        setLocaleLanguage(language);
      } catch {
        console.error("Error during fetching locale Country");
      }
    };
    getVisitorIp();
  }, []);

  useEffect(() => {
    if (i18n.language !== localeLanguage) {
      i18n.changeLanguage(localeLanguage).catch((error) => {
        console.error("Error changing language:", error);
      });
    }
  }, [localeLanguage, i18n]);

  return (
    <LocaleLanguageContext.Provider value={{ localeLanguage, changLanguage }}>
      {children}
    </LocaleLanguageContext.Provider>
  );
};

export const useLocaleLanguageContext = () => {
  const context = useContext(LocaleLanguageContext);
  if (!context) {
    throw new Error(
      "useLocaleLanguageContext must be used within a LocaleLanguageProvider",
    );
  }
  return context;
};
