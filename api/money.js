// 交易金钱相关

import { req } from "../utils/request.js"

// 账号流水
export const accountList = params => req({api: '/account/log-list',isToken: true, loading: false, method: 'GET', params })