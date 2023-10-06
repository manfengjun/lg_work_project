
import { createSSRApp } from "vue";
import * as Pinia from 'pinia';
import App from "./App.vue";
import InitManager from "./core/init";
export function createApp() {
  const app = createSSRApp(App);
  app.use(Pinia.createPinia());
  new InitManager(app)
  return {
    app,
    Pinia
  };
}
