//车型选择
// 车型联动
import { req } from "../utils/request.js"
// 二级连
export const brandList =  params => req({api: '/brand/list',isToken: false, method: 'GET', params })
// 单独获取品牌
export const brandAlone =  params => req({api: '/brand/alone-list',isToken: false, method: 'GET', params })
//单独获取品牌车型
export const brandSeries =  params => req({api: '/brand/series-list',isToken: false, method: 'GET', params })
// 单独获取品牌车型详情
export const brandInfos =  params => req({api: '/brand/series-infos',isToken: false, method: 'GET', params })