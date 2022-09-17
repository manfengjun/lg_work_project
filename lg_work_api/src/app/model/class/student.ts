import { DataTypes, Model } from 'sequelize'
import CONFIG from '../../../config'
import sequelizeClient from '../../../core/database'
import Grade, { IGradeModel } from './grade'

export interface IStudentModel {
    id: number
    name: string
    petName?: string
    level?: string
    classId: number
    parent?:string
    grade?: IGradeModel
}

export type CIStudentModel = Omit<IStudentModel, 'id'>

export default class Student
    extends Model<IStudentModel, IStudentModel>
    implements IStudentModel {
    public id!: number
    public name!: string
    public petName?: string
    public level?: string
    public classId!: number
    public parent?: string
}

Student.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        level: {
            type: DataTypes.STRING,
            allowNull: true
        },
        petName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        parent: {
            type: DataTypes.STRING,
            allowNull: true
        },
        classId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
    },
    {
        tableName: 'lg_student',
        sequelize: sequelizeClient.config(),
        paranoid: true
    }
)
