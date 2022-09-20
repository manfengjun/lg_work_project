import { DataTypes, Model } from 'sequelize'
import CONFIG from '../../../config'
import sequelizeClient from '../../../core/database'

export interface ITypeModel {
    id: number
    name: string
    description: string
}

export type CITypeModel = Omit<ITypeModel, 'id'>

export default class Type
    extends Model<ITypeModel, ITypeModel>
    implements ITypeModel {
    public id!: number
    public name!: string
    public description!: string
}

Type.init(
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
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        tableName: 'lg_type',
        sequelize: sequelizeClient.config(),
        paranoid: true
    }
)
