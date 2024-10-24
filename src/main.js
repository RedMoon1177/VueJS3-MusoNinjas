import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { projectAuth } from "./firebase/config";

// global styles
import "./assets/main.css";

let app;

// to prevent when refreshing the page --> redirect to Login page if current user is already logged in
projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(router).mount("#app");
  }
});
