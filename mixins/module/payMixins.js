import utils from '../../utils/utils.js';
// 支付相关模块
export default {
	data() {
		return {
			orderId: null,
			disabled: false,
			payType: 0, // 0 支付宝支付 1微信支付
			payModalShow: false
		}
	},
	methods: {
		// 关闭支付弹框
		hideModal() {
			this.payModalShow = false;
		},
		// 发起微信支付(小程序)
		weixiPay(params, successBack = null, failBack = null) {
			const that = this;
			uni.requestPayment({
				provider: 'wxpay',
				package: params.packageValue,
				...params,
				success: function(res) {
					utils.showSuccessToast('支付成功')
					successBack && successBack()
				},
				fail: function(err) {
					err.errMsg.indexOf('cancel') !== -1 ? utils.showTextToast('取消了支付') : utils.showTextToast('发起支付失败');
					console.error(JSON.stringify(err))
					failBack && failBack()
				}
			});
		},
		// 发起微信支付（app）
		weixiAppPay(params, successBack = null, failBack = null) {
			const that = this;
			let data = {
				sign: params.sign,
				prepayid: params.prepayId,
				partnerid: params.partnerId,
				appid: params.appId,
				package: params.packageValue,
				timestamp:  params.timeStamp,
				noncestr: params.nonceStr
			}
			uni.requestPayment({
				provider: 'wxpay',
				orderInfo: JSON.stringify(data),
				success: function(res) {
					utils.showSuccessToast('支付成功');
					successBack && successBack();
				},
				fail: function(err) {
					err.errMsg.indexOf('cancel') !== -1 ? utils.showTextToast('取消了支付') : utils.showTextToast('发起支付失败');
					failBack && failBack()
				}
			});
		},
		// 根据不同的环境执行不同的支付逻辑
		unifiedPay(paramsData) {
			/**
			 * payType 支付类型 0 账号支付 1 微信支付
			 *  successBack 成功回调
			 * params 发起支付参数
			 * **/
			const {
				payType,
				params,
				successBack,
				failBack
			} = paramsData;
			// 校验参数
			if (payType === undefined) {
				console.error('缺少必要参数 payType');
				return false;
			} else {
				if (payType !== 0 && !params) {
					console.error('缺少必要支付参数 params');
					return false;
				}
			}

			this.payModalShow = false;
			if (payType === 0) {
				utils.showSuccessToast('支付成功');
				successBack && successBack();
			} else {
				// 小程序内微信支付
				// #ifdef MP-WEIXIN
				this.weixiPay(params, successBack, failBack)
				// #endif
				// app内微信支付
				// #ifdef APP-PLUS
				this.weixiAppPay(params, successBack, failBack)
				// #endif
			}
		}
	}
}
