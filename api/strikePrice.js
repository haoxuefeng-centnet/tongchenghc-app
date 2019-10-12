//查询成交价
import { req } from "../utils/request.js"
// 查询
export const deal =  params => req({api: '/car/deal/deal-size',isToken:true, method: 'POST', params })
// 列表
export const dealList =  params => req({api: '/car/deal/list',isToken:true, method: 'POST', params })
// 详情
export const dealInfo =  params => req({api: '/car/deal/info',isToken:true, method: 'GET', params })
// 查询次数使用
export const dealused =  params => req({api: '/car/deal/used',isToken:true, method: 'PUT', params })
