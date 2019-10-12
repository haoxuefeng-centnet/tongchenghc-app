//vip
import { req } from "../utils/request.js"
// vip列表
export const vipList =  params => req({api: '/vip/list',isToken:true, method: 'GET', params })
// 已上架车辆
export const carList =  params => req({api: '/promotion/car-list',isToken:true, method: 'GET', params })
// 刷新
export const refresh =  params => req({api: '/car/flush/buy',isToken:true, method: 'POST', params })
// 推广
export const configList =  params => req({api: '/promotion/extension-list',isToken:true, method: 'GET', params })
// 获取刷新推广的配置信息
export const configInfo =  params => req({api: '/promotion/info/send',isToken:true, loading: false, method: 'GET', params })
// 使用推广
export const usePromotion =  params => req({api: '/promotion/use/send',isToken:true, method: 'PUT', params })
// 使用刷新
export const useFlush =  params => req({api: '/car/flush/used',isToken:true, method: 'PUT', params })
// 点击刷新
export const clickFlush =  params => req({api: '/car/flush/time',isToken:true, method: 'PUT', params })
