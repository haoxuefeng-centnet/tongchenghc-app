//客户管理
import { req } from "../utils/request.js"
// 收车列表
export const collectList =  params => req({api: '/car/buy/list',isToken:true,loading:false, method: 'GET', params })
// 卖车列表
export const sellcarsList =  params => req({api: '/car/sell/list',loading:false,isToken:true,method: 'GET', params })
// 详情
export const Info =  params => req({api: '/car/buy/info',isToken:true,loading: true, method: 'GET', params })
// 卖车详情
export const sellInfo =  params => req({api: '/car/sell/info',isToken:true,loading: true, method: 'GET', params })
// 修改收车状态
export const update =  params => req({api: '/car/buy/update-status',loading: true,isToken:true, method: 'PUT', params })
// 修改卖车状态
export const sellUpdate =  params => req({api: '/car/sell/update-status',loading: true,isToken:true, method: 'PUT', params })
// 新增收车
export const sellAdd =  params => req({api: '/car/buy',isToken:true,loading: true, method: 'POST', params })
// 新增卖车
export const payAdd =  params => req({api: '/car/sell',isToken:true,loading: true, method: 'POST', params })
// 品牌车型
export const carBrand =  params => req({api: '/brand/list', method: 'GET', loading: false, params })
// 修改收车信息
export const updateCar =  params => req({api: '/car/buy/update',isToken:true,loading: true, method: 'PUT', params })
// 修改卖车信息
export const updateSell =  params => req({api: '/car/sell/update',isToken:true,loading: true, method: 'PUT', params })

