import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
// styles & vuetify
import vuetify from "@/plugins/vuetify/index.js";
import "./assets/main.css";
import "./assets/tailwind.css";
// vee-validate
import "./plugins/vee-validate/rules";
import "./plugins/vee-validate/messages";
// i18n
import i18n from "@/plugins/i18n/i18n.js";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(i18n);
app.config.unwrapInjectedRef = true;

app.mount("#app");
