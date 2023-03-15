import { createI18n } from "vue-i18n";
import en from "@/locales/en/en.json";
import ka from "@/locales/ka/ka.json";

const messages = {
  en,
  ka,
};
const i18n = createI18n({
  locale: "ka",
  fallbackLocale: "en",
  messages,
});

export default i18n;
