import { IRoomModel } from '../model/class/room'
import * as roomRepo from '../repository/room'
import { Md5 } from 'ts-md5'

export const createRoom = async (payload: IRoomModel): Promise<IRoomModel> => {
  if (!payload.name || payload.name.length <= 0) {
    global.UnifyResponse.error({ code: -1, message: '教室名称不能为空' })

  }
  return roomRepo.create(payload)
}

export const updateRoom = async (
  id: number,
  payload: {}
): Promise<[affectedCount: number]> => {
  return roomRepo.update(id,payload)
}

export const getRoomById = (id: number): Promise<IRoomModel> => {
  return roomRepo.getById(id)
}

export const findRoom = (payload: IRoomModel): Promise<IRoomModel> => {
  if (!payload.name || payload.name.length <= 0) {
    global.UnifyResponse.error({ code: -1, message: '教室名称不能为空' })

  }
  return roomRepo.findRoom(payload)
}

export const deleteById = (id: number): Promise<boolean> => {
  return roomRepo.deleteById(id)
}

export const getAll = (): Promise<IRoomModel[]> => {
  return roomRepo.getAll()
}
