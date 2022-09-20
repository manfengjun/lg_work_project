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
import * as gradeSerivce from '../../service/grade'

const tag = tags(['student'])
const studentSchema = {
  id: { type: 'number', required: false },
  name: { type: 'string', required: true },
  petName: { type: 'string', required: false},
  parent: { type: 'string', required: false},
  classId: { type: 'number', required: true },
  level: { type: 'number', required: false }
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

  @request('put', '/update')
  @summary('student update')
  @description('example: /student/update')
  @tag
  @body(studentSchema)
  async update(ctx: Context) {
    const student = ctx.request.body
    global.UnifyResponse.success(ctx, await studentSerivce.updateStudent(student.id, student))
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
