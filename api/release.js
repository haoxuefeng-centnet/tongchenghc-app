//发布
import { req } from "../utils/request.js"
//发布车辆信息
export const carPublish =  params => req({api: '/car',isToken:true, method: 'POST', params })
// 修改
export const carUpdate =  params => req({api: '/car/update',isToken:true, method: 'PUT', params })