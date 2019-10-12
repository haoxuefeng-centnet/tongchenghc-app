//微店
import { req } from "../utils/request.js"
// 求购信息填写
export const wantPay =  params => req({api: '/want',isToken:false, method: 'POST', params })
// 估价信息填写
export const carValuation =  params => req({api: '/appraisal',isToken:false, method: 'POST', params })
// 微店详情
export const smallShop =  params => req({api: '/store/info',isToken:false, method: 'GET', params })
//微店车辆列表
export const storeList =  params => req({api: '/store/car-list',isToken:false, method: 'GET', params })
// 微店管理保存
export const storeSave =  params => req({api: '/store',isToken:true, method: 'POST', params })
//微店信息修改
export const storeUpdate =  params => req({api: '/store/update', isToken:true,method: 'PUT', params })
//微店车辆详情
export const storecarInfo =  params => req({api: '/store/car-info',isToken:false, method: 'GET', params })
