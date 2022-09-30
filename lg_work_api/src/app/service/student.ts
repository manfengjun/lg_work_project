import { IStudentModel } from '../model/class/student'
import * as StudentRepo from '../repository/student'
import { Md5 } from 'ts-md5'

export const createStudent = async (payload: IStudentModel): Promise<IStudentModel> => {
  if (!payload.name || payload.name.length <= 0) {
    global.UnifyResponse.error({ code: -1, message: '班级名称不能为空' })

  }
  return StudentRepo.create(payload)
}

export const updateStudent = async (
  id: number,
  payload: {}
): Promise<[affectedCount: number]> => {
  return StudentRepo.update(id, payload)
}

export const getStudentById = (id: number): Promise<IStudentModel> => {
  return StudentRepo.getById(id)
}

export const findStudent = (payload: IStudentModel): Promise<IStudentModel> => {
  if (!payload.name || payload.name.length <= 0) {
    global.UnifyResponse.error({ code: -1, message: '班级名称不能为空' })

  }
  return StudentRepo.findStudent(payload)
}

export const deleteById = (id: number): Promise<boolean> => {
  let result = StudentRepo.deleteById(id)
  if (!result) {
    global.UnifyResponse.error({ code: -1, message: '删除失败' })
  }
  return result
}

export const getAll = (): Promise<IStudentModel[]> => {
  return StudentRepo.getAll()
}
