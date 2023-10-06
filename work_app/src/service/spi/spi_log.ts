import { fetchConfig } from "@/tmui/tool/lib/interface";


class SpiLogInterceptor {
    private static instance: SpiLogInterceptor
    constructor() {

    }
    static getInstance() {
        if (!SpiLogInterceptor.instance) {
            SpiLogInterceptor.instance = new SpiLogInterceptor();
        }
        return SpiLogInterceptor.instance;
    }
    onRequest(config: fetchConfig) {
        console.info('request', "✅ " + config.url)
        console.info('request', "✅ METHOD:" + config.method);
        if (config.data != null) {
            console.log('request', '✅ Params:' + config.data);
        }
        console.info('request', '✅ Body:' + config.data);

    }
    onResponse(result: any) {
        console.info('🇨🇳 response', result);
    }
}
export default SpiLogInterceptor