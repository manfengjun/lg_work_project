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
import * as typeSerivce from '../../service/type'
import { generateToken } from '../../../core/auth'
import RedisClient from '../../../core/redis'
import CacheClient from '../../../core/cache'

const tag = tags(['type'])

const typeSchema = {
  id: { type: 'number', required: false },
  name: { type: 'string', required: true },
  level: { type: 'string', required: true }
}
const delSchema = {
  id: { type: 'number', required: true }
}
@prefix('/type')
export default class TypeController {
  @request('post', '/list')
  @summary('Get types')
  @description('example: /type/list')
  @tag
  @security([{ api_key: [] }])
  async getList(ctx: Context) {
    global.UnifyResponse.success(ctx, await typeSerivce.getAll())
  }

  @request('post', '/insert')
  @summary('type insert')
  @description('example: /type/insert')
  @tag
  @body(typeSchema)
  async insert(ctx: Context) {
    const type = ctx.request.body
    global.UnifyResponse.success(ctx, await typeSerivce.createType(type))
  }

  @request('put', '/update')
  @summary('type update')
  @description('example: /type/update')
  @tag
  @body(typeSchema)
  async update(ctx: Context) {
    const type = ctx.request.body
    global.UnifyResponse.success(ctx, await typeSerivce.updateType(type.id, type))
  }

  @request('delete', '/delete')
  @summary('type delete')
  @description('example: /type/delete')
  @tag
  @body(delSchema)
  async delete(ctx: Context) {
    const id = ctx.request.body.id
    global.UnifyResponse.success(ctx, await typeSerivce.deleteById(id))
  }

}
