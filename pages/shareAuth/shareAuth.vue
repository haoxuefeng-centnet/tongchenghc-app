<template>
	<view class="container">
		<view class="content">
			<view class="header-img">
				<image src="../../static/logo.png" mode="mode"></image>
			</view>
			<view class="hint-text">
				<text>获取用户头像昵称及必要信息</text>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<view class="login-btn"><button class="btn" :disabled="disabled" type="primary" @getuserinfo="weixiLogin" open-type="getUserInfo">微信授权</button></view>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	import utils from '../../utils/utils.js';
	import { shareAuthorize } from '../../api/share.js';
	export default {
		name: 'wxLogin',
		data() {
			return {
				disabled: false,
			};
		},
		methods: {
			// 微信第三方登陆（获取登陆凭证）
			weixiLogin() {
				const that = this;
				that.disabled = true
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						const { code } = loginRes
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								that.postAuthData(code, infoRes)
							},
							fail(err) {
								if (err.errMsg.indexOf('auth') === -1) {
									utils.showTextToast('授权出现了异常')
									return false
								}
								uni.showModal({
									title: '提示',
									content: '如果拒绝授权，程序将会出现异常数据，请授权！',
									confirmText: '重新授权',
									success(res) {
										if (!res.confirm) {
											utils.showTextToast('请授权！')
										}
									},
									fail(err) {
										utils.showTextToast('打开提示框失败')
									}
								})
							},
							complete() {
								that.disabled = false
							}
						});
					},
					fail(err) {
						utils.showTextToast('获取授权信息失败');
					}
				});
			},
			// 将授权信息提交至第三方
			postAuthData(code, infoRes) {
				shareAuthorize({code, encryptedData: infoRes.encryptedData, iv: infoRes.iv}).then(res => {
					if (res.code === 200) {
						let shareParams = uni.getStorageSync('shareParams') || {};
						shareParams.nickName = res.data.nickName || '';
						shareParams.avatarUrl = res.data.avatarUrl || '';
						uni.setStorage({
							key: 'shareParams',
							data: shareParams,
							success(res) {
								uni.navigateBack({
									delta:1
								})
							},
							fail() {
								console.error('写入数据失败');
							}
						});
					}
				}).catch(err => {
				})
			}
		}
	};
</script>

<style lang="less">
	.container {
		padding: 20upx;
		height: 100vh;

		.content {
			width: 420upx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.header-img {
			margin-bottom: 40upx;

			image {
				width: 120upx;
				height: 120upx;
				background: #f5f5f5;
				border-radius: 50%;
				display: block;
				margin-left: auto;
				margin-right: auto;
			}
		}
	}

	.hint-text {
		color: #999;
		font-size: 24upx;
		padding-bottom: 20upx;
		text-align: center;
	}
.login-btn {
	margin-top: 30upx;
}
	.login-btn .btn {
	background: linear-gradient(0deg, rgba(165, 123, 255, 1), rgba(107, 115, 255, 1));

		&:disabled {
			background: linear-gradient(0deg, rgba(165, 123, 255, 1), rgba(107, 115, 255, 1));
			opacity: 1;
		}
	}
</style>
