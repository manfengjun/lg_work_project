import { IRecordModel } from '../model/record/record'
import * as recordRepo from '../repository/record'
import { Md5 } from 'ts-md5'

export const createRecord = async (payload: IRecordModel): Promise<IRecordModel> => {
  if (!payload.content || payload.content.length <= 0) {
    global.UnifyResponse.error({ code: -1, message: '成长记录内容不能为空' })

  }
  return recordRepo.create(payload)
}

export const updateRecord = async (
  id: number,
  payload: {}
): Promise<[affectedCount: number]> => {
  return recordRepo.update(id, payload)
}

export const getRecordById = (id: number): Promise<IRecordModel> => {
  return recordRepo.getById(id)
}
export const getRecordByStudent = (id: number): Promise<IRecordModel[]> => {
  return recordRepo.getByStudent(id)
}
export const findRecord = (payload: IRecordModel): Promise<IRecordModel> => {
  if (!payload.content || payload.content.length <= 0) {
    global.UnifyResponse.error({ code: -1, message: '成长记录内容不能为空' })

  }
  return recordRepo.findRecord(payload)
}

export const deleteById = (id: number): Promise<boolean> => {
  let result = recordRepo.deleteById(id)
  if (!result) {
    global.UnifyResponse.error({ code: -1, message: '删除失败' })
  }
  return result
}

export const getAll = (): Promise<IRecordModel[]> => {
  return recordRepo.getAll()
}
