// 登录
import { req } from "../utils/request.js"
//获取验证码
export const loginCode =  params => req({api: '/cus/sendMsg', method: 'GET', params })
// 登录
export const loginIn =  params => req({api: '/cus/login', method: 'POST', params })
// 获取用户信息
export const getUser =  params => req({api: '/cus/info',isToken: true, method: 'GET', loading: false, params })
// 提交用户授权
export const postWeixiAuth =  params => req({api: '/weixin/authorization',method: 'POST', loading: true, params })
// 微信授权登陆
export const weixinLogin =  params => req({api: '/weixin/login',method: 'POST', loading: true, params })
// 退出登陆
export const cusloginout =  params => req({api: '/cus/login-out',isToken: true,method: 'POST', loading: true, params })
