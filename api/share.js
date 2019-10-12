// 分享模块相关
import {
	req
} from "../utils/request.js";

// 保存分享记录
export const saveShareList = params => req({
	api: '/share-log',
	isToken: true,
	loading: false,
	method: 'POST',
	params
})
// 获取分享平台车源列表
export const getShareList = params => req({
	api: '/share/platform/car-list',
	isToken: false,
	loading: false,
	method: 'GET',
	params
})
// 分享平台车辆详情
export const platformShareInfo = params => req({
	api: '/share/platform/car-info',
	isToken: false,
	loading: true,
	method: 'GET',
	params
})
// 分享微店车源列表	
export const storeCarList = params => req({
	api: '/share/store/car-list',
	isToken: false,
	loading: true,
	method: 'GET',
	params
})
// 分享平台车辆详情
export const storeCarInfo = params => req({
	api: '/share/store/car-info',
	isToken: false,
	loading: true,
	method: 'GET',
	params
})
// 分享获取授权信息
export const shareAuthorize = params => req({
	api: '/weixin/share-authorize',
	isToken: false,
	loading: true,
	method: 'GET',
	params
})
// 分享微店详情
export const storeShopInfo = params => req({
	api: '/share/store/info',
	isToken: false,
	loading: true,
	method: 'GET',
	params
})
// 个人中心本周分享统计
export const shareWeekLog = params => req({
	api: '/share-log/week',
	isToken: true,
	loading: false,
	method: 'GET',
	params
})
// 个人中心分享微店人员
export const shareLogList = params => req({
	api: '/share-log/page',
	isToken: true,
	loading: true,
	method: 'GET',
	params
})
// 个人中心分享微店人员
export const shareStaff = params => req({
	api: '/share/staff',
	isToken: true,
	loading: false,
	method: 'GET',
	params
})
// 个人中心微店员工下的人员浏览记录
export const shareItemList = params => req({
	api: '/share/page',
	isToken: true,
	loading: false,
	method: 'GET',
	params
})
// 个人详情分享详情页
export const shareInfo = params => req({
	api: '/share/info',
	isToken: true,
	loading: true,
	method: 'GET',
	params
})