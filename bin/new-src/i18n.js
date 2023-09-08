import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import English from "./assets/translations/en.json";
import Arabic from "./assets/translations/ar.json";
import French from "./assets/translations/fr.json";

const resources = {
  en: {
    translation: English,
  },
  ar: {
    translation: Arabic,
  },
  fr: {
    translation: French,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("i18nextLng") || "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

// env-cmd
//
