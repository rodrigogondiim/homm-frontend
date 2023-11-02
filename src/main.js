import { createApp } from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";

createApp(App).use(router).use(Toast).use(store).mount("#app");
