import { DataTypes, Model } from 'sequelize'
import CONFIG from '../../../config'
import sequelizeClient from '../../../core/database'

export interface IRoomModel {
  id: number
  name: string
  level?: string
}

export type CIRoomModel = Omit<IRoomModel, 'id'>

export default class Room
  extends Model<IRoomModel, IRoomModel>
  implements IRoomModel {
  public id!: number
  public name!: string
  public level?: string
}

Room.init(
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

  },
  {
    tableName: 'lg_room',
    sequelize: sequelizeClient.config(),
    paranoid: true
  }
)
