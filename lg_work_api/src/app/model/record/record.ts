import { DataTypes, Model } from 'sequelize'
import CONFIG from '../../../config'
import sequelizeClient from '../../../core/database'

export interface IRecordModel {
    id: number
    content: string
    time: string
    courseId: number
    courseName: string
    studentId: number
}

export type CIRecordModel = Omit<IRecordModel, 'id'>

export default class Record
    extends Model<IRecordModel, IRecordModel>
    implements IRecordModel {
    public id!: number
    public content!: string
    public time!: string
    public courseId!: number
    public courseName!: string
    public studentId!: number
}

Record.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        time: {
            type: DataTypes.STRING,
            allowNull: true
        },
        courseId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        courseName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        studentId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
    },
    {
        tableName: 'lg_record',
        sequelize: sequelizeClient.config(),
        paranoid: true
    }
)
