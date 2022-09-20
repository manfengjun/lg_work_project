import { where } from 'sequelize/types'
import { Mould } from '../model/record'
import { IMouldModel } from '../model/record/mould'

export const create = async (mould: IMouldModel) => {
    const data = await Mould.findOne({
        where: {
            content: `${mould.content}`
        }
    })
    if (data && data.id) {
        global.UnifyResponse.error({ code: -1, message: '课程已存在' })
    }
    return Mould.create(mould)
}

export const update = async (id: number, payload: {}) => {
    return Mould.update(payload, {
        where: {
            id: id
        }
    })
}
export const findMould = async (mould: IMouldModel) => {
    const data = await Mould.findOne({
        where: {
            content: `${mould.content}`
        }
    })
    if (!data) {
        global.UnifyResponse.error({ code: -1, message: '课程不存在' })
    }
    return data!
}
export const getById = async (id: number) => {
    const mould = await Mould.findByPk(id)

    if (!mould) {
        global.UnifyResponse.error({ code: -1, message: '该课程不存在' })
    }
    return mould!
}

export const deleteById = async (id: number) => {
    const numDeleted = await Mould.destroy({
        where: { id }
    })
    return numDeleted > 0
}

export const getAll = async () => {
    return Mould.findAll()
}
