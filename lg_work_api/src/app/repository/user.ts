import { where } from 'sequelize/types'
import { User } from '../model/account'
import { IUserModel } from '../model/account/user'

export const create = async (user: IUserModel) => {
  const data = await User.findOne({
    where: {
      username: `${user.username}`
    }
  })
  if (data && data.id) {
    global.UnifyResponse.error({ code: -1, message: '用户已存在' })
  }
  return User.create(user)
}

export const update = async (id: number, payload: {}) => {
  return User.update(payload, {
    where: {
      id: id
    }
  })
}
export const findUser = async (user: IUserModel) => {
  const data = await User.findOne({
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
  const user = await User.findByPk(id)

  if (!user) {
    global.UnifyResponse.notFoundException(10020)
  }
  return user!
}

export const deleteById = async (id: number) => {
  const numDeleted = await User.destroy({
    where: { id }
  })

  return !!numDeleted
}

export const getAll = async () => {
  return User.findAll()
}
