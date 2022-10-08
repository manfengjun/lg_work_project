import { where } from 'sequelize/types'
import { Course, Mould } from '../model/record'
import { ICourseModel } from '../model/record/course'

export const create = async (course: ICourseModel) => {
  const data = await Course.findOne({
    where: {
      name: `${course.name}`
    }
  })
  if (data && data.id && data.level == course.level) {
    global.UnifyResponse.error({ code: -1, message: '课程已存在' })
  }
  return Course.create(course)
}

export const update = async (id: number, payload: {}) => {
  return Course.update(payload, {
    where: {
      id: id
    }
  })
}
export const findCourse = async (course: ICourseModel) => {
  const data = await Course.findOne({
    where: {
      name: `${course.name}`
    }
  })
  if (!data) {
    global.UnifyResponse.error({ code: -1, message: '课程不存在' })
  }
  return data!
}
export const getById = async (id: number) => {
  const course = await Course.findOne({
    where: {
      id: `${id}`
    },
    include: {
      model: Mould,
      as: 'moulds',
    }
  })
  if (!course) {
    global.UnifyResponse.error({ code: -1, message: '该课程不存在' })
  }
  return course!
}

export const deleteById = async (id: number) => {
  const numDeleted = await Course.destroy({
    where: { id }
  })
  return numDeleted > 0
}

export const getListByLevel = async (level: string) => {
  return Course.findAll(
    {
      where: {
        level: `${level}`
      }
    }
  )
}


export const getAll = async () => {
  return Course.findAll()
}
