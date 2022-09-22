import { where } from 'sequelize/types'
import { Record } from '../model/record'
import { Grade, Student } from '../model/class'
import { IGradeModel } from '../model/class/grade'

export const create = async (grade: IGradeModel) => {
  const data = await Grade.findOne({
    where: {
      name: `${grade.name}`
    }
  })
  if (data && data.id) {
    global.UnifyResponse.error({ code: -1, message: '班级已存在' })
  }
  return Grade.create(grade)
}

export const update = async (id: number, payload: {}) => {
  return Grade.update(payload, {
    where: {
      id: id
    }
  })
}
export const findGrade = async (grade: IGradeModel) => {
  const data = await Grade.findOne({
    where: {
      name: `${grade.name}`
    }
  })
  if (!data) {
    global.UnifyResponse.error({ code: -1, message: '班级不存在' })
  }
  return data!
}
export const getById = async (id: number) => {
  const grade = await Grade.findOne({
    where: {
      id: `${id}`
    },
    include: [{
      model: Student,
      as: 'students',
      include: [{
        model: Record,
        as: 'records',
        order: [[ 'createdAt', 'DESC' ]],
      }]
    }]
  })
  if (!grade) {
    global.UnifyResponse.error({ code: -1, message: '该班级不存在' })
  }
  return grade!
}

export const deleteById = async (id: number) => {
  const numDeleted = await Grade.destroy({
    where: { id }
  })
  return numDeleted > 0
}

export const getAll = async () => {
  return Grade.findAll()
}
