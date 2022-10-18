import SpiLogInterceptor from "./spi_log"
import SpiResponseInterceptor from "./spi_response"
import { SpiManager } from "./spi_manage"
import { SpiTarget } from "./spi_target"
import { delNullProperty } from "../validate/validate"
class SpiAxios {
    target: SpiTarget
    constructor(target: SpiTarget) {
        this.target = target
    }
    static create(target: SpiTarget): SpiAxios {
        target.data = delNullProperty(target.data)
        return new SpiAxios(target)
    }
    http(isToast: boolean = true): Promise<any> {
        let config = {
            url: this.target.baseUrl + this.target.path,
            method: this.target.method,
            data: this.target.data
        }
        return new Promise((resolve, reject) => {
            uni.$tm.fetch.request(config,(config: fetchConfig) => {
                    // beforeRequest
                    config.header = this.target.headers
                    config.timeout = SpiManager.getInstance().connectTimeout
                    config.dataType = "json"
                    SpiLogInterceptor.getInstance().onRequest(config)
                    SpiResponseInterceptor.getInstance().onRequest(config)
                    return config
                },
                (config: fetchConfig) => {
                    // afterRequest
                    SpiLogInterceptor.getInstance().onResponse(config)
                    SpiResponseInterceptor.getInstance().onResponse(config)
                    return config
                })
                .then((res: any) => {
                    // 200:服务端业务处理正常结束
                    console.info('success', res)
                    let code = res.data.code
                    if (code === 0) {
                        resolve(res.data.data)
                    }
                    else {
                        if (isToast) {
                            uni.showToast({
                                title: res.data.message,
                                duration: 2000
                            });
                        }
                        reject({ code: code, msg: res.data.message, data: '' });
                    }
                }).catch((err) => {
                    if (!err.response.data) {
                        if (isToast) {
                            uni.showToast({
                                title: '网络异常',
                                duration: 2000
                            });
                        }
                        reject({ code: -1, msg: "网络异常", data: '' });
                    }
                    if (isToast) {
                        uni.showToast({
                            title: err.response.data.message,
                            duration: 2000
                        });
                    }
                    let code = err.response.data.code
                    reject({ code: code, msg: err.response.data.message, data: '' });
                })
        });
    }

}
export { SpiAxios }