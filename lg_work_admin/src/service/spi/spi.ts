import axios from "axios"
import { AxiosInstance, AxiosResponse } from "axios"
import SpiLogInterceptor from "./spi_log"
import SpiResponseInterceptor from "./spi_response"
import { SpiManager } from "./spi_manage"
import { SpiTarget } from "./spi_target"
import { ElMessage } from "element-plus"
class SpiAxios {
    target: SpiTarget
    public instance!: AxiosInstance
    constructor(target: SpiTarget) {
        this.target = target
        this.instance = axios.create({
            timeout: SpiManager.getInstance().connectTimeout,
        })
        SpiLogInterceptor.getInstance().onRequest(this.instance)
        SpiLogInterceptor.getInstance().onResponse(this.instance)
        SpiResponseInterceptor.getInstance().onRequest(this.instance)
        SpiResponseInterceptor.getInstance().onResponse(this.instance)
    }
    static create(target: SpiTarget): SpiAxios {
        return new SpiAxios(target)
    }
    http(isToast: boolean = true): Promise<any> {
        let response = this.instance.request({
            baseURL: this.target.baseUrl,
            headers: this.target.headers,
            url: this.target.path,
            method: this.target.method,
            params: this.target.params,
            data: this.target.data,
        })
        return new Promise((resolve, reject) => {
            response.then((res) => {
                // 200:服务端业务处理正常结束
                console.info('success', res)
                if (res.status === 200) {
                    let code = res.data.code
                    if (code === 0) {
                        resolve(res.data.data)
                    }
                    else {
                        reject({ code: code, msg: res.data.message, data: '' });
                    }
                } else {
                    if(isToast) {
                        ElMessage.error(res.data.message)
                    }
                    let code = res.data.code
                    reject({ code: code, msg: res.data.message, data: '' });
                }
            }).catch((err) => {
                if(!err.response.data) {
                    if(isToast) {
                        ElMessage.error('网络异常')
                    }
                    reject({ code: -1, msg: "网络异常", data: '' });
                }
                if(isToast) {
                    ElMessage.error(err.response.data.message)
                }
                let code = err.response.data.code
                reject({ code: code, msg: err.response.data.message, data: '' });
            });
        });
    }
}
export { SpiAxios }