import { DataTypes, Model } from 'sequelize'
import CONFIG from '../../../config'
import sequelizeClient from '../../../core/database'

export interface IMouldModel {
    id: number
    type: string
    content: string
    courseId: number
}

export type CIMouldModel = Omit<IMouldModel, 'id'>

export default class Mould
    extends Model<IMouldModel, IMouldModel>
    implements IMouldModel {
    public id!: number
    public type!: string
    public content!: string
    public courseId!: number
}

Mould.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        courseId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
    },
    {
        tableName: 'lg_mould',
        sequelize: sequelizeClient.config(),
        paranoid: true
    }
)
