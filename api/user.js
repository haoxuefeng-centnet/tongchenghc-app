// 我的
import { req } from "../utils/request.js"
//车估价列表
export const carValuationList =  params => req({api: '/appraisal/list',isToken:false, method: 'GET', params })
// 求购列表
export const payList =  params => req({api: '/want/list', isToken:false,method: 'GET', params})
//微店信息保存
export const microSave =  params => req({api: '/store',isToken:true, method: 'POST', params})
//微店信息修改
export const microModify =  params => req({api: '/store/update', isToken:true,method: 'GET', params})
// 查看出价
export const bidList =  params => req({api: '/car/bid/list',isToken:true, method: 'GET', params})
// 出价详情 
export const bidInfo =  params => req({api: '/car/bid/info',isToken:true, method: 'GET', params})
// 保存出价
export const bidSave =  params => req({api: '/car/bid',isToken:true, method: 'POST', params})
// 意见反馈
export const feedack =  params => req({api: '/feedback',isToken:true, method: 'POST', params})
// 余额充值
export const userTopup = params => req({api: '/account/topup', isToken:true, method: 'POST', params})