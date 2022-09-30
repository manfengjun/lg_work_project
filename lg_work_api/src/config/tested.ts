/**
 * Test env
 */
export const testConf = {
  ENV: 'test',
  PORT: 3100,
  BASE_URL: 'http://127.0.0.1',
  PREFIX: '/koa-web',
  SECRET: {
    JWT_KEY: 'lgworker',
    EXPIRES_IN: '1d'
  },
  DATABASE: {
    DIALECT: 'mysql',
    DB_NAME: 'lg_work',
    HOST: '120.48.133.248',
    PORT: 3306,
    USER: 'root',
    PASSWORD: 'Jun@3672830'
  },
  REDIS: {
    ENABLED: false,
    HOST: '127.0.0.1',
    PORT: 6379,
    PASSWORD: '123456'
  }
}
