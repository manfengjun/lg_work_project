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
            uni.$tm.fetch.request(config, (config: fetchConfig) => {
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
                    if (res.statusCode === 200) {
                        let code = res.data.code
                        if (code === 0) {
                            resolve(res.data.data)
                        }
                        else {
                            reject({ code: code, msg: res.data.message, data: '' });
                        }
                    } else {
                        if (isToast) {
                            uni.$tm.u.toast(res.data.message)
                        }
                        let code = res.data.code
                        reject({ code: code, msg: res.data.message, data: '' });
                    }
                }).catch((err) => {
                    console.log(err)
                    if (!err.data) {
                        if (isToast) {
                            uni.$tm.u.toast('网络异常')
                        }
                        reject({ code: -1, msg: "网络异常", data: '' });
                    }
                    if (err.data.code == 10004) {
                        uni.$tm.u.toast('token失效')
                        uni.redirectTo({
                            url: "/pages/account/login",
                        });
                    }
                    else {
                        if (isToast) {
                            uni.$tm.u.toast(err.data.message)
                        }
                    }

                    let code = err.data.code
                    reject({ code: code, msg: err.data.message, data: '' });
                })
        });
    }

}
export { SpiAxios }