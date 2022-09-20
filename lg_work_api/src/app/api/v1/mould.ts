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
import * as mouldSerivce from '../../service/mould'
import { generateToken } from '../../../core/auth'
import RedisClient from '../../../core/redis'
import CacheClient from '../../../core/cache'

const tag = tags(['mould'])

const mouldSchema = {
  id: { type: 'number', required: false },
  type: { type: 'number', required: true },
  content: { type: 'string', required: true },
  courseId: { type: 'number', required: true }
}
const delSchema = {
  id: { type: 'number', required: true }
}
@prefix('/mould')
export default class MouldController {
  @request('post', '/list')
  @summary('Get moulds')
  @description('example: /mould/list')
  @tag
  @security([{ api_key: [] }])
  async getList(ctx: Context) {
    global.UnifyResponse.success(ctx, await mouldSerivce.getAll())
  }

  @request('post', '/insert')
  @summary('mould insert')
  @description('example: /mould/insert')
  @tag
  @body(mouldSchema)
  async insert(ctx: Context) {
    const mould = ctx.request.body
    global.UnifyResponse.success(ctx, await mouldSerivce.createMould(mould))
  }

  @request('put', '/update')
  @summary('mould update')
  @description('example: /mould/update')
  @tag
  @body(mouldSchema)
  async update(ctx: Context) {
    const mould = ctx.request.body
    global.UnifyResponse.success(ctx, await mouldSerivce.updateMould(mould.id, mould))
  }

  @request('delete', '/delete')
  @summary('mould delete')
  @description('example: /mould/delete')
  @tag
  @body(delSchema)
  async delete(ctx: Context) {
    const id = ctx.request.body.id
    global.UnifyResponse.success(ctx, await mouldSerivce.deleteById(id))
  }

}
