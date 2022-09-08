// import axios, { AxiosInstance } from 'axios'

// enum SPISTATUS {
//   // 网络异常
//   networkException,
//   // invalidURL
//   invalidURL,
//   // 服务器异常 500
//   serverException,
//   // 方法不存在 404
//   notFound,
//   // ContentType 不被接受
//   unacceptableContentType,
//   // 响应状态异常
//   unacceptableStatusCode,
//   // data缺失
//   dataNotFound,
//   // JSON序列化异常
//   jsonSerializationFailed,
//   // 对象转换失败
//   objectFailed,
//   // 执行结果状态吗不合理
//   unlegal,
//   // 执行结果异常，操作失败
//   executeFail,
// }
// class SPIRequest {
//   private static instance: SPIRequest
//   axios!: AxiosInstance
//   constructor() {
//     this.axios = axios.create({
//       baseURL: 'http://127.0.0.1:3000',
//       timeout: 20000,
//       headers: { 'Content-Type': 'application/json' }
//     })
//   }
//   static getInstance() {
//     if (!SPIRequest.instance) {
//       SPIRequest.instance = new SPIRequest();
//     }
//     return SPIRequest.instance;
//   }
//   ajax(api, data = {}){

//   }
// }
// axios.interceptors.request.use(
//   config => {
//     return checkToken(config)
//       .then(res => {
//         config.withCredentials = true
//         config.timeout = 60000
//         // config.headers['version'] = '1.0'
//         // config.headers['source'] = 'IOS'
//         // if (validate.android()) {
//         //   config.headers['source'] = 'Android'
//         // } else if (validate.ios()) {
//         //   config.headers['source'] = 'IOS'
//         // }
//         // config.headers['input'] = '1'
//         // config.headers['Content-Type'] = 'application/json'
//         // // setting account info
//         // const user = store.state.account.user
//         // if (validate.notEmpty(user)) {
//         //   config.headers['cokieToken'] = user.token
//         //   config.headers['userid'] = user.customer_id
//         //   config.headers['edmsid'] = user.token
//         // }
//         // if (config.type === 1) {
//         //   config.baseURL = process.env.VUE_APP_BASE_URL_NET
//         // } else {
//         //   config.baseURL = process.env.VUE_APP_BASE_URL
//         // }
//         return config
//       })
//       .catch(res => {
//         console.info('wtys ' + config.url + ':', res)
//       })
//   },
//   error => {
//     // 请求错误处理
//     return Promise.reject(error)
//   }
// )
// function checkToken(config) {
//   return new Promise((resolve, reject) => {
//     if (
//       config.url.search('login0222') !== -1 ||
//       config.url.search('ploogin') !== -1
//     ) {
//       resolve(true)
//     }
//     if (store.state.account.user.customer_id !== 0) {
//       resolve(true)
//     } else {
//       bridge.callhandler('native_userInfo', {}, function (response) {
//         const info = JSON.parse(response)
//         if (info.userInfo.customer_id !== 0) {
//           store.commit('setUser', info)
//           resolve(true)
//         } else {
//           // fetch native account error
//           reject(Error('fetch native account error'))
//         }
//       })
//     }
//   })
// }
// axios.interceptors.response.use(
//   response => {
//     return response
//   },
//   error => {
//     return Promise.resolve(error.response)
//   }
// )

// export default function ajax(api, data = {}) {
//   var httpOptions = {
//     method: api.method,
//     url: api.url,
//     type: api.type,
//     data: data,
//     params: data
//   }
//   if (validate.isMobile()) {
//     return new Promise(function (resolve, reject) {
//       bridge.callhandler('native_api', httpOptions, response => {
//         resolve(JSON.parse(response))
//       })
//     })
//   } else {
//     // 请求类型处理
//     httpOptions.method === 'get'
//       ? delete httpOptions.data
//       : delete httpOptions.params
//     return axios(httpOptions)
//       .then(response => {
//         console.info('wtys success: ' + httpOptions.url)
//         return filter(response)
//       })
//       .catch(response => {
//         console.info('wtys error: ' + httpOptions.url)
//         return filter(response)
//       })
//   }
// }

// // 结果筛选器
// function filter(result) {
//   // 如果http状态码正常，则直接返回数据
//   if (result && result.status === 200) {
//     // 返回结果为JSON
//     let status = result.data.status
//     if (status) {
//       if (status === NetStatus.success) {
//         return {
//           status: result.data.status,
//           data: result.data.data,
//           msg: '请求成功'
//         }
//       } else {
//         if (status === NetStatus.tokenErr) {
//           bridge.callhandler('native_loginFailure', {}, function (response) { })
//         } else {
//           return {
//             status: -1,
//             data: {},
//             msg: '数据异常，请稍后再试!'
//           }
//         }
//       }
//     } else {
//       return {
//         status: -1,
//         data: {},
//         msg: '数据异常，请稍后再试!'
//       }
//     }
//   } else {
//     // 请求错误
//     return {
//       status: -1,
//       data: {},
//       msg: '服务器异常，请稍后再试!'
//     }
//   }
// }
