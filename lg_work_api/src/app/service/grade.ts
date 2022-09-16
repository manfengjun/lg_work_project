import { IGradeModel } from '../model/class/grade'
import * as gradeRepo from '../repository/grade'
import { Md5 } from 'ts-md5'

export const createGrade = async (payload: IGradeModel): Promise<IGradeModel> => {
  if (!payload.name || payload.name.length <= 0) {
    global.UnifyResponse.error({ code: -1, message: '班级名称不能为空' })

  }
  return gradeRepo.create(payload)
}

export const updateGrade = async (
  id: number,
  payload: {}
): Promise<[affectedCount: number]> => {
  return gradeRepo.update(id, payload)
}

export const getGradeById = (id: number): Promise<IGradeModel> => {
  return gradeRepo.getById(id)
}

export const findGrade = (payload: IGradeModel): Promise<IGradeModel> => {
  if (!payload.name || payload.name.length <= 0) {
    global.UnifyResponse.error({ code: -1, message: '班级名称不能为空' })

  }
  return gradeRepo.findGrade(payload)
}

export const deleteById = (id: number): Promise<boolean> => {
  let result = gradeRepo.deleteById(id)
  if (!result) {
    global.UnifyResponse.error({ code: -1, message: '删除失败' })
  }
  return result
}

export const getAll = (): Promise<IGradeModel[]> => {
  return gradeRepo.getAll()
}
