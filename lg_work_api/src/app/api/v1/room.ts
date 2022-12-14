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
import * as roomSerivce from '../../service/room'
import { generateToken } from '../../../core/auth'
import RedisClient from '../../../core/redis'
import CacheClient from '../../../core/cache'

const tag = tags(['room'])

const roomSchema = {
  id: { type: 'number', required: false },
  name: { type: 'string', required: true },
  level: { type: 'string', required: true }
}
const delSchema = {
  id: { type: 'number', required: true }
}
@prefix('/room')
export default class RoomController {
  @request('post', '/list')
  @summary('Get rooms')
  @description('example: /room/list')
  @tag
  @security([{ api_key: [] }])
  async getList(ctx: Context) {
    global.UnifyResponse.success(ctx, await roomSerivce.getAll())
  }

  @request('post', '/insert')
  @summary('room insert')
  @description('example: /room/insert')
  @tag
  @body(roomSchema)
  async insert(ctx: Context) {
    const room = ctx.request.body
    global.UnifyResponse.success(ctx, await roomSerivce.createRoom(room))
  }

  @request('put', '/update')
  @summary('room update')
  @description('example: /room/update')
  @tag
  @body(roomSchema)
  async update(ctx: Context) {
    const room = ctx.request.body
    global.UnifyResponse.success(ctx, await roomSerivce.updateRoom(room.id, room))
  }

  @request('delete', '/delete')
  @summary('room delete')
  @description('example: /room/delete')
  @tag
  @body(delSchema)
  async delete(ctx: Context) {
    const id = ctx.request.body.id
    global.UnifyResponse.success(ctx, await roomSerivce.deleteById(id))
  }

}
