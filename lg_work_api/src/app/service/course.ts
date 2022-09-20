import { ICourseModel } from '../model/record/course'
import * as courseRepo from '../repository/course'
import { Md5 } from 'ts-md5'

export const createCourse = async (payload: ICourseModel): Promise<ICourseModel> => {
  if (!payload.name || payload.name.length <= 0) {
    global.UnifyResponse.error({ code: -1, message: '课程名称不能为空' })

  }
  return courseRepo.create(payload)
}

export const updateCourse = async (
  id: number,
  payload: {}
): Promise<[affectedCount: number]> => {
  return courseRepo.update(id, payload)
}

export const getCourseById = (id: number): Promise<ICourseModel> => {
  return courseRepo.getById(id)
}

export const findCourse = (payload: ICourseModel): Promise<ICourseModel> => {
  if (!payload.name || payload.name.length <= 0) {
    global.UnifyResponse.error({ code: -1, message: '教室名称不能为空' })

  }
  return courseRepo.findCourse(payload)
}

export const deleteById = (id: number): Promise<boolean> => {
  let result = courseRepo.deleteById(id)
  if (!result) {
    global.UnifyResponse.error({ code: -1, message: '删除失败' })
  }
  return result
}

export const getListByLevel = (level: string): Promise<ICourseModel[]> => {
  return courseRepo.getListByLevel(level)
}

export const getAll = (): Promise<ICourseModel[]> => {
  return courseRepo.getAll()
}
