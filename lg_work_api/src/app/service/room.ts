import { IRoomModel } from '../model/class/room'
import * as roomRepo from '../repository/room'
import { Md5 } from 'ts-md5'

export const createUser = async (payload: IRoomModel): Promise<IRoomModel> => {
  if (!payload.username || payload.username.length <= 0) {
    global.UnifyResponse.error({ code: -1, message: '用户名不能为空' })

  }
  if (!payload.password || payload.password.length <= 0) {
    global.UnifyResponse.error({ code: -1, message: '密码不能为空' })
  }
  payload.password = Md5.hashStr(payload.password).toString()
  return userRepo.create(payload)
}

export const updateUser = async (
  id: number,
  payload: {}
): Promise<[affectedCount: number]> => {
  return userRepo.update(id,payload)
}

export const getUserById = (id: number): Promise<IRoomModel> => {
  return userRepo.getById(id)
}

export const findUser = (payload: IRoomModel): Promise<IRoomModel> => {
  if (!payload.username || payload.username.length <= 0) {
    global.UnifyResponse.error({ code: -1, message: '用户名不能为空' })

  }
  if (!payload.password || payload.password.length <= 0) {
    global.UnifyResponse.error({ code: -1, message: '密码不能为空' })
  }
  payload.password = Md5.hashStr(payload.password).toString()
  return userRepo.findUser(payload)
}

export const deleteById = (id: number): Promise<boolean> => {
  return userRepo.deleteById(id)
}

export const getAll = (): Promise<IRoomModel[]> => {
  return userRepo.getAll()
}
