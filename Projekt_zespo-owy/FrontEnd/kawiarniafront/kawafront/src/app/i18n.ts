import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend'
import * as pl from './translations/pl/pl';
import * as en from './translations/en-US/en-US';

const resources = {
  'pl': {...pl},
  'en-US': {...en}
};

const languages = ['pl', 'en-US'];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pl',
    debug: true,
    whitelist: languages
  });

export default i18n;