import Storage from "@/service/storage/storage";
import { fetchConfig } from "@/tmui/tool/lib/interface";
class SpiResponseInterceptor {
    private static instance: SpiResponseInterceptor
    constructor() {

    }
    static getInstance() {
        if (!SpiResponseInterceptor.instance) {
            SpiResponseInterceptor.instance = new SpiResponseInterceptor();
        }
        return SpiResponseInterceptor.instance;
    }
    onRequest(config: fetchConfig) {
       // 一般会请求拦截里面加token
       const token = Storage.get("token")
       let header:any = config.header!
       header["authorization"] = 'Bearer '+ token
       config.header = header
       console.log(config.data)
       return config;
    }
    onResponse(result: any) {
        return result
    }
}
export default SpiResponseInterceptor