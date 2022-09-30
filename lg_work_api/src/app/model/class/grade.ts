import { DataTypes, Model } from 'sequelize'
import CONFIG from '../../../config'
import sequelizeClient from '../../../core/database'

export interface IGradeModel {
  id: number
  name: string
  level: string
  week: string
  time: string
  teacherId: number
  roomId: number
  teacherName: string
  roomName: string
}

export type CIGradeModel = Omit<IGradeModel, 'id'>

export default class Grade
  extends Model<IGradeModel, IGradeModel>
  implements IGradeModel {
  public id!: number
  public name!: string
  public level!: string
  public week!: string
  public time!: string
  public teacherId!: number
  public roomId!: number
  public teacherName!: string
  public roomName!: string
}

Grade.init(
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
    },
    teacherName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roomName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'lg_class',
    sequelize: sequelizeClient.config(),
    paranoid: true
  }
)
