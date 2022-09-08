import { AxiosInstance } from "axios";
import Storage from "@service/storage/storage";
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
    onRequest(instance: AxiosInstance) {
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            // 一般会请求拦截里面加token
            const token = Storage.get("token")
            config.headers!["Authorization"] = token;
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
    }
    onResponse(instance: AxiosInstance) {
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            return config;
        }, function (error) {
            console.log(error)
            return Promise.reject(error);
        });
    }
}