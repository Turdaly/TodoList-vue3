import GoogleSignInPlugin from "vue3-google-signin";

import "./assets/main.css";
import 'boxicons'

import { createApp } from "vue";
import { createPinia } from 'pinia'
import App from "./App.vue";
import router from "./router";

const pinia = createPinia()
const app = createApp(App);


app.use(pinia)
app.use(router);
app.use(GoogleSignInPlugin, {
  clientId: "984822526138-h1a8831pnl0n4htdobvkmjpm88u632lu.apps.googleusercontent.com",
});

app.mount("#app");
