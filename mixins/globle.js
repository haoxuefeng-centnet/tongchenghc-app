export const globleMixins = {
	methods: {
		callPhone(tel) {
			uni.showModal({
				title: '提示',
				content: `确定拨打${tel}吗`,
				success(res) {
					if (res.confirm) {
						uni.makePhoneCall({
							phoneNumber: tel
						})
					}
				}
			})
		},
		// 验证用户是否已经授权
		validationWxAuth(successBack = null) {
			wx.getSetting({
				success(res) {
					if (!res.authSetting['scope.userInfo']) {
						uni.showModal({
							title: '提示',
							content: '您未进行授权',
							confirmText: '去授权',
							success(res) {
								if (res.confirm) {
									// 去授权
									uni.navigateTo({
										url: '/pages/wxAuth/wxAuth'
									});
								} else {
									uni.showModal({
										title: '警告',
										content: '如果不进行授权则无法调用支付',
										confirmText: '去授权',
										success(res) {
											if (res.confirm) {
												// 去授权
												uni.navigateTo({
													url: '/pages/wxAuth/wxAuth'
												});
											}
										}
									})
								}
							}
						})
					} else {
						// 已经授权
						successBack && successBack();
					}
				},
				fail(err) {
					uni.showToast({
						title: '获取授权信息失败！',
						icon: 'none'
					})
				}
			})
		}
	}
}
