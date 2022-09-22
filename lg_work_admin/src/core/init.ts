import InitGlobal from './global'
import { App, createApp } from "vue";
import router from "../router";
import { SpiManager } from "@service/spi/spi_manage";

export default class InitManager {
  private app: App<Element>

  constructor(app: App<Element>) {
    this.app = app
    this.initCore()
  }

  initCore() {
    InitGlobal.init() // global var and methods
    SpiManager.getInstance().baseUrl = 'http://120.48.133.248:3000/work/v1'
    this.app.use(router);

  }

  _initRoutesAndSwagger() {
  }
}
