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

const tag = tags(['room'])

const roomSchema = {
  name: { type: 'string', required: true },
  level: { type: 'string', required: true }
}

@prefix('/rooms')
export default class UserController {
  @request('post', '/list')
  @summary('Get rooms')
  @description('example: /room/list')
  @tag
  @body(roomSchema)
  @security([{ api_key: [] }])
  async getList(ctx: Context) {
    const id = ctx.params.id
    ctx.body = await userSerivce.getUserById(id)
  }

  @request('post', '/insert')
  @summary('room insert')
  @description('example: /room/insert')
  @tag
  @body(roomSchema)
  async insert(ctx: Context) {
    const room = ctx.request.body
    ctx.body = await userSerivce.createUser(user)
  }
}
