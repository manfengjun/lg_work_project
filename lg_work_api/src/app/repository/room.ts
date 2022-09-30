import { where } from 'sequelize/types'
import { Room } from '../model/class'
import { IRoomModel } from '../model/class/room'

export const create = async (room: IRoomModel) => {
  const data = await Room.findOne({
    where: {
      name: `${room.name}`
    }
  })
  if (data && data.id) {
    global.UnifyResponse.error({ code: -1, message: '教室已存在' })
  }
  return Room.create(room)
}

export const update = async (id: number, payload: {}) => {
  return Room.update(payload, {
    where: {
      id: id
    }
  })
}
export const findRoom = async (room: IRoomModel) => {
  const data = await Room.findOne({
    where: {
      name: `${room.name}`
    }
  })
  if (!data) {
    global.UnifyResponse.error({ code: -1, message: '教室不存在' })
  }
  return data!
}
export const getById = async (id: number) => {
  const room = await Room.findByPk(id)

  if (!room) {
    global.UnifyResponse.error({ code: -1, message: '该教室不存在' })
  }
  return room!
}

export const deleteById = async (id: number) => {
  const numDeleted = await Room.destroy({
    where: { id }
  })
  return numDeleted > 0
}

export const getAll = async () => {
  return Room.findAll()
}
