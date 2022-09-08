import { Context } from 'koa'
import {
  request,
  summary,
  description,
  query,
  path,
  body,
  tags,
  prefix,
  security
} from 'koa-swagger-decorator'
import * as userSerivce from '../../service/user'
import { generateToken } from '../../../core/auth'
import RedisClient from '../../../core/redis'
import CacheClient from '../../../core/cache'

const tag = tags(['user'])

const userSchema = {
  username: { type: 'string', required: true },
  password: { type: 'string', required: true }
}

@prefix('/user')
export default class UserController {
  @request('get', '/{id}/id')
  @summary('Get user by id')
  @description('example: /user/1/id')
  @tag
  @path({
    id: { type: 'number', required: true, default: null, description: 'id' }
  })
  @security([{ api_key: [] }])
  async getUser(ctx: Context) {
    const id = ctx.params.id
    ctx.body = await userSerivce.getUserById(id)
  }

  @request('post', '/register')
  @summary('user register')
  @description('example: /user/register')
  @tag
  @body(userSchema)
  async register(ctx: Context) {
    const user = ctx.request.body
    ctx.body = await userSerivce.createUser(user)
  }

  @request('post', '/login')
  @summary('user login')
  @description('example: /user/login')
  @tag
  @body(userSchema)
  async login(ctx: Context) {
    const payload = ctx.request.body
    let user = await userSerivce.findUser(payload)
    if (!user) {
      global.UnifyResponse.serverErrorException(10000)
    }
    const token = generateToken(payload.username + payload.password)
    let result = await userSerivce.updateUser(user.id, { token: token })
    if (result.length <= 0 || result[0] <= 0) {
      global.UnifyResponse.error({ message: "登录失败" })
    }
    user.token = token
    global.UnifyResponse.success(ctx, user)
  }
}
