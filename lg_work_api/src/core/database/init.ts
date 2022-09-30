import CONFIG from '../../config'
import SequelizeClient from './index'
import * as models from '../../app/model'

const isDev = CONFIG.ENV !== 'prod'

const modelsObj: { [index: string]: any } = models
const allModel: any[] = []
export default async function initDB() {
  let enable = await SequelizeClient.connect()
  if (enable) {
    for (let key in modelsObj) {
      const model = modelsObj[key].sync({ alter: isDev })
      allModel.push(model)
    }
    Promise.all(allModel)
  }
  else {
    console.log('Unable to connect to the database')
  }
}


