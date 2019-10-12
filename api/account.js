//员工账号管理
import { req } from "../utils/request.js"
//员工列表
export const account =  params => req({api: '/store/staff-list', method: 'GET', params })
//添加微店员工
export const addaccount =  params => req({api: '/store/add-staff' , method: 'POST', params })
//个人信息修改
export const cusUpdate =  params => req({api: '/cus/update', isToken:true,method: 'PUT', params })
//余额
// export const addaccount =  params => req({api: '/store/add-staff' , method: 'POST', params })