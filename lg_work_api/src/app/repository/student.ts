import { where } from 'sequelize/types'
import { Grade, Student } from '../model/class'
import { IStudentModel } from '../model/class/student'

export const create = async (student: IStudentModel) => {
  const data = await Student.findOne({
    where: {
      name: `${student.name}`
    }
  })
  return Student.create(student)
}

export const update = async (id: number, payload: {}) => {
  return Student.update(payload, {
    where: {
      id: id
    }
  })
}
export const findStudent = async (student: IStudentModel) => {
  const data = await Student.findOne({
    where: {
      name: `${student.name}`
    }
  })
  if (!data) {
    global.UnifyResponse.error({ code: -1, message: '学员不存在' })
  }
  return data!
}
export const getById = async (id: number) => {
  const student = await Student.findByPk(id)

  if (!student) {
    global.UnifyResponse.error({ code: -1, message: '该学员不存在' })
  }
  return student!
}

export const deleteById = async (id: number) => {
  const numDeleted = await Student.destroy({
    where: { id }
  })
  return numDeleted > 0
}

export const getAll = async () => {
  return Student.findAll()
}
