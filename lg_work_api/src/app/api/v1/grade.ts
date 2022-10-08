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
import * as gradeSerivce from '../../service/grade'
import { generateToken } from '../../../core/auth'
import RedisClient from '../../../core/redis'
import CacheClient from '../../../core/cache'

const tag = tags(['grade'])
const gradeSchema = {
  id: { type: 'number', required: false },
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
@prefix('/grade')
export default class GradeController {
  @request('post', '/list')
  @summary('Get grades')
  @description('example: /grade/list')
  @tag
  @security([{ api_key: [] }])
  async getList(ctx: Context) {
    const userid = ctx.request.body.userid
    global.UnifyResponse.success(ctx, await gradeSerivce.getAll(userid))
  }

  @request('post', '/students')
  @summary('Get students')
  @description('example: /grade/students')
  @tag
  @security([{ api_key: [] }])
  async getStudents(ctx: Context) {
    const id = ctx.request.body.id
    global.UnifyResponse.success(ctx, await gradeSerivce.getGradeById(id))
  }

  @request('post', '/by')
  @summary('Get grade by id')
  @description('example: /grade/by/1')
  @tag
  @path({
    id: { type: 'number', required: true, default: null, description: 'id' }
  })
  @security([{ api_key: [] }])
  async getGradeById(ctx: Context) {
    const id = ctx.params.id
    global.UnifyResponse.success(ctx, await gradeSerivce.getGradeById(id))
  }

  @request('post', '/insert')
  @summary('grade insert')
  @description('example: /grade/insert')
  @tag
  @body(gradeSchema)
  async insert(ctx: Context) {
    const gradeModel = ctx.request.body
    global.UnifyResponse.success(ctx, await gradeSerivce.createGrade(gradeModel))
  }

  @request('put', '/update')
  @summary('grade update')
  @description('example: /grade/update')
  @tag
  @body(gradeSchema)
  async update(ctx: Context) {
    const grade = ctx.request.body
    global.UnifyResponse.success(ctx, await gradeSerivce.updateGrade(grade.id, grade))
  }

  @request('delete', '/delete')
  @summary('grade delete')
  @description('example: /grade/delete')
  @tag
  @body(delSchema)
  async delete(ctx: Context) {
    const id = ctx.request.body.id
    global.UnifyResponse.success(ctx, await gradeSerivce.deleteById(id))
  }

}
