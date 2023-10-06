import InitGlobal from './global'
import { App, createApp } from "vue";
import tmui from "../tmui"
import { SpiManager } from "@/service/spi/spi_manage";
declare interface Uni {
    $instance: SpiManager,
}
export default class InitManager {
  private app: App<Element>

  constructor(app: App<Element>) {
    this.app = app
    this.initCore()
  }

  initCore() {
    InitGlobal.init() // global var and methods
	this.app.use(tmui)
	uni.$instance = SpiManager.getInstance()
	uni.$instance.baseUrl = 'https://api.work.ld-cloud.xyz/work/v1'
  }

  _initRoutesAndSwagger() {
  }
}
