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
import * as courseSerivce from '../../service/course'
import { generateToken } from '../../../core/auth'
import RedisClient from '../../../core/redis'
import CacheClient from '../../../core/cache'
import { levels } from 'log4js'

const tag = tags(['course'])

const courseSchema = {
  id: { type: 'number', required: false },
  name: { type: 'string', required: true },
  level: { type: 'string', required: true }
}
const delSchema = {
  id: { type: 'number', required: true }
}
@prefix('/course')
export default class CourseController {
  @request('post', '/list')
  @summary('Get courses')
  @description('example: /course/list')
  @tag
  @body({
    level: { type: 'string', required: true }
  })
  @security([{ api_key: [] }])
  async getList(ctx: Context) {
    const level = ctx.request.body.level
    global.UnifyResponse.success(ctx, await courseSerivce.getListByLevel(level))
  }

  @request('post', '/moulds')
  @summary('Get moulds')
  @description('example: /grade/moulds')
  @tag
  @security([{ api_key: [] }])
  async getMoulds(ctx: Context) {
    const level = ctx.request.body.level
    global.UnifyResponse.success(ctx, await courseSerivce.getListByLevel(level))
  }

  @request('post', '/by')
  @summary('Get course by id')
  @description('example: /course/by')
  @tag
  @body({
    id: { type: 'number', required: true, default: null, description: 'id' }
  })
  @security([{ api_key: [] }])
  async getGradeById(ctx: Context) {
    const id = ctx.request.body.id
    global.UnifyResponse.success(ctx, await courseSerivce.getCourseById(id))
  }


  @request('post', '/insert')
  @summary('course insert')
  @description('example: /course/insert')
  @tag
  @body(courseSchema)
  async insert(ctx: Context) {
    const course = ctx.request.body
    global.UnifyResponse.success(ctx, await courseSerivce.createCourse(course))
  }

  @request('put', '/update')
  @summary('course update')
  @description('example: /course/update')
  @tag
  @body(courseSchema)
  async update(ctx: Context) {
    const course = ctx.request.body
    global.UnifyResponse.success(ctx, await courseSerivce.updateCourse(course.id, course))
  }

  @request('delete', '/delete')
  @summary('course delete')
  @description('example: /course/delete')
  @tag
  @body(delSchema)
  async delete(ctx: Context) {
    const id = ctx.request.body.id
    global.UnifyResponse.success(ctx, await courseSerivce.deleteById(id))
  }

}
