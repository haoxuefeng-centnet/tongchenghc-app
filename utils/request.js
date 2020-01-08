/* 
 * 参数说明
 * @param{String} url 接口地址
 * @param{String} method 请求方式 
 * @param{Object} header 请求头
 * @param{Object} params 请求参数 
 */

import config from './reqConfig.js'
import utils from './utils.js'

// 验证请求参数
function isQuest(data) {
	return (data.api && data.method)
}
// 缓存已发送请求url
let sendReqUrl = []
// 是否出现loading(防止重复显示loading)
let isLoading = true

// 跳回登录页， 重新设置token及用户信息
function resetUser() {
	utils.clearUser()
	setTimeout(() => {
		uni.reLaunch({
			url: '/pages/login/login'
		})
	}, 1000)
}
// 请求方法
export const req = (cifg = {}) => {
	const showLoading = cifg.loading !== undefined ? cifg.loading : true // 是否显示加载动画
	if (!isQuest(cifg)) {
		throw Error('必传参数不全，请检查参数！')
		return false
	}
	// 判断当前此接口是否需要token
	if (cifg.isToken) {
		try {
			const cusToken = uni.getStorageSync('cusToken')
			if (cusToken) {
				config.HEADER['cusToken'] = cusToken
			} else {
				utils.showTextToast('登陆已失效，请重新登陆!')
				resetUser()
			}
		} catch (e) {
			console.log(e + '获取本地cusToken失败')
		}
	}
	if (showLoading && isLoading) {
		utils.showRequestLoading()
		isLoading = false
	}
	return new Promise((reslove, reject) => {
			uni.request({
					url: `${config.BASEURL}${cifg.api}`,
					method: cifg.method,
					data: cifg.params || {},
					header: { ...cifg.header,
						...config.HEADER
					} || {},
					success: res => {
						const {data} = res
						let msg = ''
						// 统一处理请求错误
						if (data.code !== 200) {
							switch (data.code) {
								// 验证是否需要登陆
								case 407:
									msg = data.msg;
									resetUser();
									break;
								case 401:
									msg = '客服端权限已失效，请重新登陆';
									resetUser();
									// 请求参数有误
								case 602:
									msg = "请求参数有误"
                  break;
									// 用户未授权
								case 410:
									msg = "您未授权"
                  console.log('应该去授权')
									uni.navigateTo({
										url: '/pages/wxAuth/wxAuth'
									})
									break;
								default: 
									msg = data.msg;
							}
							utils.showTextToast(msg);
						}
					  reslove(data || {})
				},
				fail: (err) => {
					utils.showTextToast(err.errMsg);
					reject(err)
				},
				complete: () => {
					if (showLoading) {
            utils.hideLoading();
						isLoading = true
					}
				}
			});
	})
}
