import { ITypeModel } from '../model/record/type'
import * as typeRepo from '../repository/type'
import { Md5 } from 'ts-md5'

export const createType = async (payload: ITypeModel): Promise<ITypeModel> => {
  if (!payload.name || payload.name.length <= 0) {
    global.UnifyResponse.error({ code: -1, message: '教室名称不能为空' })

  }
  return typeRepo.create(payload)
}

export const updateType = async (
  id: number,
  payload: {}
): Promise<[affectedCount: number]> => {
  return typeRepo.update(id, payload)
}

export const getTypeById = (id: number): Promise<ITypeModel> => {
  return typeRepo.getById(id)
}

export const findType = (payload: ITypeModel): Promise<ITypeModel> => {
  if (!payload.name || payload.name.length <= 0) {
    global.UnifyResponse.error({ code: -1, message: '教室名称不能为空' })

  }
  return typeRepo.findType(payload)
}

export const deleteById = (id: number): Promise<boolean> => {
  let result = typeRepo.deleteById(id)
  if (!result) {
    global.UnifyResponse.error({ code: -1, message: '删除失败' })
  }
  return result
}

export const getAll = (): Promise<ITypeModel[]> => {
  return typeRepo.getAll()
}
