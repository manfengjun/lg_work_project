import { DataTypes, Model } from 'sequelize'
import CONFIG from '../../../config'
import sequelizeClient from '../../../core/database'

export interface ITeacherModel {
    id: number
    name: string
    level?: string
    roomId?: number
}

export type CITeacherModel = Omit<ITeacherModel, 'id'>

export default class Teacher
    extends Model<ITeacherModel, ITeacherModel>
    implements ITeacherModel {
    public id!: number
    public name!: string
    public level?: string
    public roomId?: number

}

Teacher.init(
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
        roomId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
    },
    {
        tableName: 'lg_teacher',
        sequelize: sequelizeClient.config(),
        paranoid: true
    }
)
