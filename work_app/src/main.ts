import { createSSRApp } from "vue";
import * as Pinia from 'pinia';
import tmui from "./tmui"
import App from "./App.vue";
import InitManager from "./core/init";

export function createApp() {
  const app = createSSRApp(App);
  new InitManager(app)
  app.use(tmui, { shareDisable: false } as Tmui.tmuiConfig)
  return {
    app,
    Pinia
  };
}
