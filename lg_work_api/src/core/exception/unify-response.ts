import {
  MethodError,
  MethodSuccess,
  ForbiddenException,
  NotFoundException,
  ParameterException,
  ServerErrorException,
  UnAuthenticatedException,
} from './http-exception'

import { ResponseSuccess } from './http-response'
import Koa from 'koa'
const SUCCESS_CODE = 0
const ERROR_CODE = -1

/**
 * Unify Response
 */
export class UnifyResponse {
  /**
   * Method Success
   * @param code errorCode
   * @param message tip message
   */
  success(ctx: Koa.Context, data: any) {
    ctx.status = 200
    console.log(data)
    ctx.body = new ResponseSuccess(SUCCESS_CODE, '请求成功', data)
  }
  /**
   * Method error
   * @param code errorCode
   * @param message tip message
   */
  error({ code = ERROR_CODE, message = '' }) {
    throw new MethodError(code, message)
  }
  /**
   * Parameter Exception
   * @param codeOrMessage errorCode | error message
   */
  parameterException(codeOrMessage: number | string) {
    throw new ParameterException(codeOrMessage)
  }

  /**
   * Un Authenticated Exception
   * @param code errorCode
   */
  unAuthenticatedException(code: number) {
    throw new UnAuthenticatedException(code)
  }

  /**
   * Forbidden Exception
   * @param code errorCode
   */
  forbiddenException(code: number) {
    throw new ForbiddenException(code)
  }

  /**
   * Not Found Exception
   * @param code errorCode
   */
  notFoundException(code: number) {
    throw new NotFoundException(code)
  }

  /**
   * server Error
   * @param codeOrMessage errorCode | error message
   */
  serverErrorException(codeOrMessage: number | string) {
    throw new ServerErrorException(codeOrMessage)
  }
}
