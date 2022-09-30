enum SPINetException {
    // 网络异常
    NetworkException = 10001,
    // invalidURL
    InvalidURL = 10002,
    // ParamsException
    ParamsException = 10003,
    // 服务器异常 500
    ServerException = 20001,
    // 方法不存在 404
    NotFound = 20002,
    // ContentType 不被接受
    UnacceptableContentType = 20003,
    // 响应状态异常
    UnacceptableStatusCode = 20004,
    // data缺失
    DataNotFound = 30001,
    // JSON序列化异常
    JsonSerializationFailed = 30002,
    // 对象转换失败
    ObjectFailed = 30003,
    // 执行结果状态吗不合理
    ExecuteFail = 40004,
    // 执行结果异常，操作失败
    Unlegal = 40004
}
/**
 *
 *
 * @abstract
 * @class SPIError
 */
abstract class SPIError {
    private _exception!: SPINetException;
    public get exception(): SPINetException {
        return this._exception;
    }
    public set exception(value: SPINetException) {
        this._exception = value;
    }
    private _status: number = 0
    public get status(): number {
        return this.exception
    }
    private _message: string = '请求失败'
    public get message(): string {
        return this._message;
    }
}
/**
 *
 *
 * @class RequestError
 * @extends {SPIError}
 */
class RequestError extends SPIError {
    constructor(exception: SPINetException) {
        super()
        this.exception = exception
    }
    static paramsException(error: Error): SPIError {
        let exception = new RequestError(SPINetException.ParamsException)
        return exception
    }
    static networkException(error: Error): SPIError {
        let exception = new RequestError(SPINetException.NetworkException)
        return exception
    }
    static invalidURL(baseURL: String, path: String): SPIError {
        return new RequestError(SPINetException.InvalidURL)
    }
}
/**
 *
 *
 * @class ResponseError
 * @extends {SPIError}
 */
class ResponseError extends SPIError {
    constructor(exception: SPINetException) {
        super()
        this.exception = exception
    }
    static serverException(): SPIError {
        let exception = new ResponseError(SPINetException.ServerException)
        return exception
    }
    static unacceptableContentType(responseContentType: string): SPIError {
        return new ResponseError(SPINetException.UnacceptableContentType)
    }
    static notFound(): SPIError {
        return new ResponseError(SPINetException.NotFound)
    }
    static unacceptableStatusCode(status: number): SPIError {
        return new ResponseError(SPINetException.UnacceptableStatusCode)
    }
}
/**
 *
 *
 * @class ResponseSerializationError
 * @extends {SPIError}
 */
class ResponseSerializationError extends SPIError {
    constructor(exception: SPINetException) {
        super()
        this.exception = exception
    }
    static dataNotFound(): SPIError {
        let exception = new ResponseSerializationError(SPINetException.DataNotFound)
        return exception
    }
    static jsonSerializationFailed(error: Error): SPIError {
        return new ResponseSerializationError(SPINetException.JsonSerializationFailed)
    }
    static objectFailed(): SPIError {
        return new ResponseSerializationError(SPINetException.ObjectFailed)
    }
}
/**
 *
 *
 * @class ExecuteError
 * @extends {SPIError}
 */
class ExecuteError extends SPIError {
    constructor(exception: SPINetException) {
        super()
        this.exception = exception
    }
    static executeFail(status: number, message: string): SPIError {
        let exception = new RequestError(SPINetException.ExecuteFail)
        return exception
    }
    static unlegal(): SPIError {
        return new RequestError(SPINetException.Unlegal)
    }
}
export { RequestError, ResponseError, ResponseSerializationError, ExecuteError }