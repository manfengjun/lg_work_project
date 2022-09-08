import { AxiosInstance } from "axios";

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
    onRequest(instance: AxiosInstance) {
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            console.info('request',"✅ " + config.url)
            console.info('request',"✅ METHOD:" + config.method);
            if (config.params != null) {
                console.log('request','✅ Params:' + config.params);
            }
            console.info('request','✅ Body:' + config.data);
            return config;
        }, function (error) {
            // 对请求错误做些什么
            console.info('request',error)
            return Promise.reject(error);
        });
    }
    onResponse(instance: AxiosInstance) {
        // 添加请求拦截器
        instance.interceptors.response.use(function (response) {
            console.info('🇨🇳 response',response);
            return response;
        }, function (error) {
            // 对请求错误做些什么
            console.info('❌ response',error)
            return Promise.reject(error);
        });
    }
}
export default SpiLogInterceptor