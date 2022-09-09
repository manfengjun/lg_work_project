import { where } from 'sequelize/types'
import { Room } from '../model/class'
import { IRoomModel } from '../model/class/room'

export const create = async (user: IRoomModel) => {
  const data = await Room.findOne({
    where: {
      username: `${user.username}`
    }
  })
  if (data && data.id) {
    global.UnifyResponse.error({ code: -1, message: '用户已存在' })
  }
  return Room.create(user)
}

export const update = async (id: number, payload: {}) => {
  return Room.update(payload, {
    where: {
      id: id
    }
  })
}
export const findUser = async (user: IRoomModel) => {
  const data = await Room.findOne({
    where: {
      username: `${user.username}`
    }
  })
  if (!data) {
    global.UnifyResponse.error({ code: -1, message: '用户不存在' })
  }
  if (data?.password != user.password) {
    global.UnifyResponse.error({ code: -1, message: '密码错误' })
  }
  return data!
}
export const getById = async (id: number) => {
  const user = await Room.findByPk(id)

  if (!user) {
    global.UnifyResponse.notFoundException(10020)
  }
  return user!
}

export const deleteById = async (id: number) => {
  const numDeleted = await Room.destroy({
    where: { id }
  })

  return !!numDeleted
}

export const getAll = async () => {
  return Room.findAll()
}
