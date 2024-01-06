import { App, createApp } from "vue";
import tmui from "../tmui"
import { SpiManager } from "@/service/spi/spi_manage";
let $jm = {
  spi: SpiManager.getInstance(),
};
export default class InitManager {
  private app: App<Element>

  constructor(app: App<Element>) {
    this.app = app
    this.initCore()
  }

  initCore() {
    this.app.use(tmui)
    /**对外暴露 */
    uni.$jm = $jm;
    /**app应用上下文的暴露 */
    this.app.config.globalProperties.tm = $jm;

    this._setupNetwork()
  }
  _setupNetwork() {
    /** baseUrl 配置 */
    uni.$jm.spi.baseUrl = 'http://39.101.171.97/work/v1'
  }
  _initRoutesAndSwagger() {
  }
}
