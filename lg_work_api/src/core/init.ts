import Koa from 'koa'
import Koa2Cors from 'koa2-cors'
import KoaBody from 'koa-body'
import catchError from './exception'
import InitGlobal from './global'
import swaggerRouter from './swagger'
import auth from './auth'
import initDB from './database/init'

export default class InitManager {
  private app: Koa

  constructor(app: Koa) {
    this.app = app
    this.initCore()
  }

  initCore() {
    InitGlobal.init() // global var and methods
    this.app.use(Koa2Cors()) // cross-domain processing
    this.app.use(KoaBody({ multipart: true, strict: false, })) // body parameter processing
    this.app.use(catchError) // global exception handling
    this.app.use(auth)
    this._initRoutesAndSwagger() // router and api docs
    initDB()
  }

  _initRoutesAndSwagger() {
    this.app.use(swaggerRouter.routes()).use(swaggerRouter.allowedMethods())
  }
}
