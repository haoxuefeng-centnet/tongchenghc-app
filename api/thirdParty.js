// 第三方
import { req } from "../utils/request.js"
// 订单ID查询维保信息
export const payOrder =  params => req({api: '/maintenance/info/payOrderId',isToken:true, method: 'GET', params })
// 使用赠送次数查询维保信息
export const maintenancUse =  params => req({api: '/maintenance/use-send',isToken:true, method: 'PUT', params })
// 获取维保赠送信息
export const maintenanceInfo =  params => req({api: '/maintenance/send-info',isToken:true, method: 'GET', params })
// 分页查询维保纪录
export const maintenanceList =  params => req({api: '/maintenance/list',isToken:true, method: 'POST', params })
// 购买维保信息
export const maintenancePay =  params => req({api: '/maintenance/pay',isToken:true, method: 'POST', params })
// 根据支付的订单获取车险记录
export const insuranceInfo =  params => req({api: '/insurance/info/payOrderId',isToken:true, method: 'GET', params })
// 获取保险赠送信息
export const insuranceSend =  params => req({api: '/insurance/send-info',isToken:true, method: 'GET', params })
// 分页查询车险记录
export const insuranceList =  params => req({api: '/insurance/list',isToken:true, method: 'POST', params })
// 使用车险赠送次数查询
export const insuranceUse =  params => req({api: '/insurance/use-send',isToken:true, method: 'PUT', params })
// 购买车险查询
export const insurancePay =  params => req({api: '/insurance/pay',isToken:true, method: 'POST', params })
// 罚款代缴
export const easyDriver =  params => req({api: '/open/easy/driver-url',isToken:true, method: 'GET', params })