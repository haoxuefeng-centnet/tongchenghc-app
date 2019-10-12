//找车
import { req } from "../utils/request.js"
//找车
export const findCar =  params => req({api: '/car/find',isToken:true, loading: false, method: 'POST', params })
// 车辆管理列表
export const carList =  params => req({api: '/car/list',isToken:true, loading: false,method: 'GET', params })
// 管理助手车辆详情
export const carInfo =  params => req({api: '/car/info',isToken:true, method: 'GET', params })
// 找车车辆详情 平台车辆详情
export const findCarInfo =  params => req({api: '/car/show-info',isToken:true, method: 'GET', params })
// 车辆下架
export const below =  params => req({api: '/car/lower',isToken:true, method: 'POST', params })
//轮播图
export const shuffling =  params => req({api: '/banner/list', method: 'GET', loading: false, params })
// 猜你喜欢
export const favoriteList =  params => req({api: '/car/favorite-list', method: 'GET', loading: false, params })
// 个人车源列表
export const cuscarList =  params => req({api: '/car/cus-car-list',isToken:true, method: 'GET', loading: false, params })
// 车辆交付定金
export const deposit =  params => req({api: '/car/deposit-info',isToken:true, method: 'GET', loading: true, params })
// 车辆管理统计
export const carConst =  params => req({api: '/car/car-count-status',isToken:true, method: 'GET', loading: true, params })