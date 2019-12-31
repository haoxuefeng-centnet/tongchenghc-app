/* request相关配置文件 */
// 存放接口请求地址
let baseUrl = ''
// 当前环境判断
if(process.env.NODE_ENV === 'development') {
  // 测试请求地址

baseUrl = 'http://192.168.0.115:8086/api-app'
// baseUrl = 'https://app.schyxgl.com/api-app'
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
