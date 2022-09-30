import { DataTypes, Model } from 'sequelize'
import CONFIG from '../../../config'
import sequelizeClient from '../../../core/database'

export interface IUserModel {
  id: number
  username: string
  password: string
  token?: string
  roomId?: number
  teacherName?: string
}

export type CUserModel = Omit<IUserModel, 'id'>

export default class User
  extends Model<IUserModel, IUserModel>
  implements IUserModel {
  public id!: number
  public username!: string
  public password!: string
  public token?: string
  public roomId?: number
  public teacherName?: string

}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    teacherName: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
  {
    tableName: 'lg_user',
    sequelize: sequelizeClient.config(),
    paranoid: true
  }
)
