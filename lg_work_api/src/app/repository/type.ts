import { where } from 'sequelize/types'
import { Type } from '../model/record'
import { ITypeModel } from '../model/record/type'

export const create = async (type: ITypeModel) => {
  const data = await Type.findOne({
    where: {
      name: `${type.name}`
    }
  })
  if (data && data.id) {
    global.UnifyResponse.error({ code: -1, message: '类型已存在' })
  }
  return Type.create(type)
}

export const update = async (id: number, payload: {}) => {
  return Type.update(payload, {
    where: {
      id: id
    }
  })
}
export const findType = async (type: ITypeModel) => {
  const data = await Type.findOne({
    where: {
      name: `${type.name}`
    }
  })
  if (!data) {
    global.UnifyResponse.error({ code: -1, message: '类型不存在' })
  }
  return data!
}
export const getById = async (id: number) => {
  const type = await Type.findByPk(id)

  if (!type) {
    global.UnifyResponse.error({ code: -1, message: '该类型不存在' })
  }
  return type!
}

export const deleteById = async (id: number) => {
  const numDeleted = await Type.destroy({
    where: { id }
  })
  return numDeleted > 0
}

export const getAll = async () => {
  return Type.findAll()
}
