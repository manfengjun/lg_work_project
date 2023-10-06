import { SpiManager } from "@/service/spi/spi_manage";
declare global {
	interface Uni {
        //在uni下挂载一个方法
        $jm: JMHelper,
    }
}
type JMHelper = {
    /** 网络工具 */
    spi: SpiManager,
}
//记得加了导出
export {};