import { fetchConfigMethod } from '@/tmui/tool/lib/interface'
abstract class SpiTarget {
    // 发出网络请求的基础地址字符串
    private _baseUrl: string = ''

    /// 网络请求的路径字符串
    private _path: string = ''

    /// 网络请求的方式，默认返回get
    private _method: fetchConfigMethod = "GET"

    /// 网络请求url参数
    private _params: {} = {}

    /// 网络请求Body数据
    private _data: {} = {}

    /// 网络请求头
    private _headers: Record<string, string | number | boolean> = {}

    /// 日志输出
    private _logEnable: boolean = true

    public get baseUrl(): string {
        return uni.$jm.spi.baseUrl
    }
    public get path(): string {
        return this._path
    }
    public get method(): fetchConfigMethod {
        return this._method
    }
    public get params(): {} {
        return this._params
    }
    public set params(value: {}) {
        this._params = value;
    }
    public get data(): {} {
        return this._data
    }
    public set data(value: {}) {
        this._data = value;
    }
    public get headers(): Record<string, string | number | boolean> {
        let headers = { 'Content-Type': 'application/json' }
        return headers
    }
    public get logEnable(): boolean {
        return this._logEnable
    }

}
export { SpiTarget }