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
import * as recordSerivce from '../../service/record'
import { generateToken } from '../../../core/auth'
import RedisClient from '../../../core/redis'
import CacheClient from '../../../core/cache'

const tag = tags(['record'])

const recordSchema = {
  id: { type: 'number', required: false },
  time: { type: 'string', required: false },
  content: { type: 'string', required: true },
  courseId: { type: 'number', required: true },
  courseName: { type: 'string', required: true },
  studentId: { type: 'number', required: true }
}
const delSchema = {
  id: { type: 'number', required: true }
}
@prefix('/record')
export default class RecordController {
  @request('post', '/list')
  @summary('Get records')
  @description('example: /record/list')
  @tag
  @security([{ api_key: [] }])
  async getList(ctx: Context) {
    global.UnifyResponse.success(ctx, await recordSerivce.getAll())
  }

  @request('post', '/by')
  @summary('Get records')
  @description('example: /record/by')
  @tag
  @security([{ api_key: [] }])
  @body({
    id: { type: 'number', required: true }
  })
  async getRecordBy(ctx: Context) {
    const id = ctx.request.body.id
    global.UnifyResponse.success(ctx, await recordSerivce.getRecordById(id))
  }

  @request('post', '/insert')
  @summary('record insert')
  @description('example: /record/insert')
  @tag
  @body(recordSchema)
  async insert(ctx: Context) {
    const record = ctx.request.body
    global.UnifyResponse.success(ctx, await recordSerivce.createRecord(record))
  }

  @request('put', '/update')
  @summary('record update')
  @description('example: /record/update')
  @tag
  @body(recordSchema)
  async update(ctx: Context) {
    const record = ctx.request.body
    global.UnifyResponse.success(ctx, await recordSerivce.updateRecord(record.id, record))
  }

  @request('delete', '/delete')
  @summary('record delete')
  @description('example: /record/delete')
  @tag
  @body(delSchema)
  async delete(ctx: Context) {
    const id = ctx.request.body.id
    global.UnifyResponse.success(ctx, await recordSerivce.deleteById(id))
  }

}
