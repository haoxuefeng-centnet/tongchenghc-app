/* request相关配置文件 */
// 存放接口请求地址
let baseUrl = ''
// 当前环境判断
if(process.env.NODE_ENV === 'development') {
  // 测试请求地址
// baseUrl = 'http://proxy1.autu.live/api-app'

// baseUrl = 'http://test.app.yaominyu.com/api-app'

// baseUrl = 'http://192.168.1.203:8086/api-app'

baseUrl = 'https://app.schyxgl.com/api-app'
// baseUrl = 'http://47.103.195.58/server/index.php?g=Web&c=Mock&o=simple&projectID=3&uri=/api-app'
} else if (process.env.NODE_ENV === 'production') {
 // 生产环境
   baseUrl = 'https://app.schyxgl.com/api-app'

} else {
    throw Error('reqConfig.js ----> 当前请求api地址加载失败！')
}
export default {
  // 请求地址
  BASEURL: baseUrl,
  // 请求头
  HEADER: {}
}
