import utils from '../../utils/utils.js';
// 订单相关模块

export default {
	data() {
		return {}
	},
	methods: {
		// 继续支付
		postContinuePay(params, callback) {
			if (!this.continuePayFn) {
				 console.error('请传入继续支付方法');
				 return false;
			}
			this.continuePayFn(params).then(res => {
				if (res.code === 200) {
					utils.showSuccessToast(res.msg)
					callback && callback()
				}
			}).catch(err => {
				console.error(err)
			})
		}
	}
}