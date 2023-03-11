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

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(vuetify);
app.config.unwrapInjectedRef = true;

app.mount("#app");
