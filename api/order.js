// 订单
import { req } from "../utils/request.js"
// 订单列表
export const orderList =  params => req({api: '/car/deposit/list', isToken: true,loading: false, method: 'GET', params })
// 订单详情
export const orderDetails =  params => req({api: '/car/deposit/info', isToken: true, method: 'GET', params })
// 买家付定金
export const postBuyOrder =  params => req({api: '/car/deposit/buyer', isToken: true, method: 'POST', params })
// 购买vip	
export const postBuyVip =  params => req({api: '/vip/buy', isToken: true, method: 'POST', params })
// 继续支付
export const continuePay =  params => req({api: '/car/deposit/stick-pay', isToken: true, method: 'POST', params })
// 取消订单
export const cancelOrder  =  params => req({api: '/car/deposit/apply-refund', isToken: true, method: 'PUT', params })
// 购买推广
export const buyPromotion  =  params => req({api: '/promotion/buy', isToken: true, method: 'POST', params })
// 购买刷新
export const buyFlush  =  params => req({api: '/flush/buy', isToken: true, method: 'POST', params })
// 购买预定收车
export const buyReserve  =  params => req({api: '/car/reserve/buy', isToken: true, method: 'POST', params })
// 购买查询成交价
export const buyDeal  =  params => req({api: '/car/deal/buy', isToken: true, method: 'POST', params })
// 买方和卖方确认定金
export const depositConfirm  =  params => req({api: '/car/deposit/confirm', isToken: true, method: 'PUT', params })
// 添加成交价
export const carDeal  =  params => req({api: '/car/deal', isToken: true, method: 'POST', params })
