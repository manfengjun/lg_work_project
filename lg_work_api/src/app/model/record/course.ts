import { DataTypes, Model } from 'sequelize'
import CONFIG from '../../../config'
import sequelizeClient from '../../../core/database'

export interface ICourseModel {
  id: number
  name: string
  level: string
}

export type CICourseModel = Omit<ICourseModel, 'id'>

export default class Course
  extends Model<ICourseModel, ICourseModel>
  implements ICourseModel {
  public id!: number
  public name!: string
  public level!: string
}

Course.init(
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
    tableName: 'lg_course',
    sequelize: sequelizeClient.config(),
    paranoid: true
  }
)
