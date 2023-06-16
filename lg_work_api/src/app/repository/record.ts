import { where } from 'sequelize/types'
import { Record } from '../model/record'
import { IRecordModel } from '../model/record/record'

export const create = async (record: IRecordModel) => {
    const data = await Record.findOne({
        where: {
            content: `${record.content}`
        }
    })
    if (data && data.id) {
        global.UnifyResponse.error({ code: -1, message: '成长记录已存在' })
    }
    return Record.create(record)
}

export const update = async (id: number, payload: {}) => {
    return Record.update(payload, {
        where: {
            id: id
        }
    })
}
export const findRecord = async (record: IRecordModel) => {
    const data = await Record.findOne({
        where: {
            content: `${record.content}`
        }
    })
    if (!data) {
        global.UnifyResponse.error({ code: -1, message: '成长记录不存在' })
    }
    return data!
}
export const getById = async (id: number) => {
    const record = await Record.findOne({
        where: {
            id: id
        },
        order: [[ 'createdAt', 'DESC' ]],
    })
    if (!record) {
        global.UnifyResponse.error({ code: -1, message: '该成长记录不存在' })
    }
    return record!
}
export const getByStudent = async (id: number) => {
    const record = await Record.findAll({
        where: {
            studentId: id
        },
        limit: 10,
        order: [[ 'createdAt', 'DESC' ]],
    })
    if (!record) {
        global.UnifyResponse.error({ code: -1, message: '该成长记录不存在' })
    }
    return record!
}
export const getByCourse = async (id: number) => {
    const record = await Record.findAll({
        where: {
            courseId: id
        },
        order: [[ 'createdAt', 'DESC' ]],
    })
    if (!record) {
        global.UnifyResponse.error({ code: -1, message: '当前课程还没有成长记录' })
    }
    return record!
}
export const deleteById = async (id: number) => {
    const numDeleted = await Record.destroy({
        where: { id }
    })
    return numDeleted > 0
}

export const getAll = async () => {
    return Record.findAll()
}
