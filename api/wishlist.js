//预定收车
import { req } from "../utils/request.js"
//心愿单列表
export const reserveList =  params => req({api: '/car/reserve/list', isToken:true, loading: false,  method: 'GET', params })
//心愿单删除
export const reserveDel =  params => req({api: '/car/reserve/del', isToken:true,  method: 'DELETE', params })
//更新心愿单状态
export const reserveUpdate =  params => req({api: '/car/reserve/update-Status', isToken:true , method: 'POST', params })
// 添加预定收车
export const reserve =  params => req({api: '/car/reserve', isToken:true , method: 'POST', params })
//预订收车详情：展示
export const reserveInfo =  params => req({api: '/car/reserve/matched-info', isToken:true , method: 'GET', params })
//预订收车信息修改
export const reserveInfos =  params => req({api: '/car/reserve/update', isToken:true , method: 'PUT', params })
//预订收车详情，用于修改
export const reservemsg =  params => req({api: '/car/reserve/info', isToken:true , method: 'GET', params })
// 预定收车查询次数
export const frequency =  params => req({api: '/car/reserve/use-time', isToken:true , method: 'GET', params })

