import CONFIG from '../../config'
import { Dialect, Sequelize } from 'sequelize'
const DATABASE = CONFIG.DATABASE

class SequelizeClient {
  private static _instance: SequelizeClient
  private sequelizeClient: Sequelize | null = null

  private constructor() {
    const sequelizeClient = new Sequelize(
      DATABASE.DB_NAME,
      DATABASE.USER,
      DATABASE.PASSWORD,
      {
        dialect: DATABASE.DIALECT as Dialect,
        host: DATABASE.HOST,
        port: DATABASE.PORT,
        logging: true
      }
    )

    this.sequelizeClient = sequelizeClient
  }

  public static getInstance() {
    if (!this._instance) {
      SequelizeClient._instance = new SequelizeClient()
    }
    return SequelizeClient._instance
  }
  public async connect() {
    return await this.sequelizeClient!
      .authenticate()
      .then(() => {
        console.log('SequelizeClient has been login successfully.')
        return true
      })
      .catch((err) => {
        this.sequelizeClient!.close()
        console.log(err);
        console.error('Unable to connect to the database:', err)
        return false
      })

  }
  public config() {
    return this.sequelizeClient!
  }


}

export default SequelizeClient.getInstance()
