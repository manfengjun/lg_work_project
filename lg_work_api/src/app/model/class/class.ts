import { DataTypes, Model } from 'sequelize'
import CONFIG from '../../../config'
import sequelizeClient from '../../../core/database'

export interface IClassModel {
  id: number
  name: string
  level: string
  week: string
  time: String
  teacherId: number
  roomId: number
}

export type CIClassModel = Omit<IClassModel, 'id'>

export default class LGClass
  extends Model<IClassModel, IClassModel>
  implements IClassModel {
  public id!: number
  public name!: string
  public level!: string
  public week!: string
  public time!: string
  public teacherId!: number
  public roomId!: number
}

LGClass.init(
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
      allowNull: false
    },
    week: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false
    },
    teacherId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    roomId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  },
  {
    tableName: 'lg_class',
    sequelize: sequelizeClient.config(),
    paranoid: true
  }
)
