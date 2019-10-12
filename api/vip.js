// vip相关信息

import { req } from "../utils/request.js"
// 用户VIP信息
export const userVip =  params => req({api: '/vip/info', method: 'GET', params })