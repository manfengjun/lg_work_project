/**
 * Custom HTTP exception error code
 * [errorCode, 'tip message']
 */
const CODE = new Map([
  [0, 'ok'],
  [9999, 'Server Unknown Exception'],

  [10000, 'Generic Exception'],
  [10001, 'Generic parameter error'],
  [10002, 'The resource not found'],
  [10003, 'The method not found'],
  [10004, 'The token is invalid or expired'],
  [
    11001,
    'Redis is not enabled. If you want to use redis, please set config.REDIS.ENABLED=true'
  ],

  [10020, 'Database error'],

  [20000, 'method exception']
])

export default CODE
