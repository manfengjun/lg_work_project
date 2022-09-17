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
import * as studentSerivce from '../../service/student'
import { generateToken } from '../../../core/auth'
import RedisClient from '../../../core/redis'
import CacheClient from '../../../core/cache'

const tag = tags(['student'])
const studentSchema = {
  name: { type: 'string', required: true },
  level: { type: 'string', required: true },
  week: { type: 'string', required: true },
  time: { type: 'string', required: true },
  teacherId: { type: 'number', required: true },
  roomId: { type: 'number', required: true },
  teacherName: { type: 'string', required: true },
  roomName: { type: 'string', required: true }
}
const delSchema = {
  id: { type: 'number', required: true }
}
@prefix('/student')
export default class studentController {
  @request('post', '/list')
  @summary('Get students')
  @description('example: /student/list')
  @tag
  @security([{ api_key: [] }])
  async getList(ctx: Context) {
    global.UnifyResponse.success(ctx, await studentSerivce.getAll())
  }


  @request('post', '/insert')
  @summary('student insert')
  @description('example: /student/insert')
  @tag
  @body(studentSchema)
  async insert(ctx: Context) {
    const studentModel = ctx.request.body
    global.UnifyResponse.success(ctx, await studentSerivce.createStudent(studentModel))
  }


  @request('delete', '/delete')
  @summary('student delete')
  @description('example: /student/delete')
  @tag
  @body(delSchema)
  async delete(ctx: Context) {
    const id = ctx.request.body.id
    global.UnifyResponse.success(ctx, await studentSerivce.deleteById(id))
  }

}
