import { IMouldModel } from '../model/record/mould'
import * as mouldRepo from '../repository/mould'
import { Md5 } from 'ts-md5'

export const createMould = async (payload: IMouldModel): Promise<IMouldModel> => {
  if (!payload.content || payload.content.length <= 0) {
    global.UnifyResponse.error({ code: -1, message: '模板内容不能为空' })

  }
  return mouldRepo.create(payload)
}

export const updateMould = async (
  id: number,
  payload: {}
): Promise<[affectedCount: number]> => {
  return mouldRepo.update(id, payload)
}

export const getMouldById = (id: number): Promise<IMouldModel> => {
  return mouldRepo.getById(id)
}

export const findMould = (payload: IMouldModel): Promise<IMouldModel> => {
  if (!payload.content || payload.content.length <= 0) {
    global.UnifyResponse.error({ code: -1, message: '模板内容不能为空' })

  }
  return mouldRepo.findMould(payload)
}

export const deleteById = (id: number): Promise<boolean> => {
  let result = mouldRepo.deleteById(id)
  if (!result) {
    global.UnifyResponse.error({ code: -1, message: '删除失败' })
  }
  return result
}

export const getAll = (): Promise<IMouldModel[]> => {
  return mouldRepo.getAll()
}
