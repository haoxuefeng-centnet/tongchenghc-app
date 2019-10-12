<!-- 登录注册 -->
<template>
	<view class="login">
		<view class="hello"></view>
		<view class="phone">
			<text class="iconfont icon-phone">&#xe62a;</text>
			<input @input="phoneNum" placeholder="请输入手机号" />
		</view>
		<view class="phone">
			<text class="iconfont user">&#xe615;</text>
			<input @input="codeNum" placeholder="请输入验证码" />
			<button type="primary" class="code" v-text="codeText" :disabled="disable" @tap="sendCode"></button>
		</view>
		<button @tap="formSubmit" class="btn">绑定手机号</button>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
import { loginCode, weixinLogin } from '../../api/login.js';
export default {
	data() {
		return {
			phone: '',
			code: '',
			codeText: '发送验证码',
			timer: null,
			count: 60,
			disable: false,
			position: '',
			userParams: {}
		};
	},
	onShow() {
		// 获取微信授权后的用户信息
		const that = this;
		uni.getStorage({
			key: 'userParams',
			success(res) {
				that.userParams = res.data
			},
			fail(err) {
				utils.showTextToast('获取用户参数失败');
			}
		})
	},
	methods: {
		phoneNum(event) {
			this.phone = event.target.value;
		},
		codeNum(event) {
			this.code = event.target.value;
		},
		// 发送验证码
		sendCode() {
			if (this.phone != '' && /^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone)) {
				this.disable = true;
				this.getCode();
			} else {
				utils.showTextToast('手机号码填写有误');
				return false;
			}
		},
		// 获取验证码
		getCode() {
			loginCode({
				phone: this.phone
			}).then(res => {
				if (res.code === 200) {
					utils.showTextToast('短信发送成功');
					this.timer = setInterval(() => {
						if (this.count > 0) {
							this.count--;
							this.codeText = '重新发送 ' + this.count + ' s ';
						} else {
							this.codeText = '发送验证码';
							this.count = 60;
							clearInterval(this.timer);
							this.disable = false;
						}
					}, 1000);
				}
			});
		},
		formSubmit() {
			if (/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone)) {
				if (this.code != '') {
					weixinLogin({ 
						cusPhone: this.phone, 
						phoneCode: this.code, 
					  code: this.userParams.code, 
					  encryptedData: this.userParams.encryptedData,
						iv: this.userParams.iv
						}).then(res => {
						if (res.code == 200) {
							uni.setStorageSync('cusToken', res.data.cusToken);
							uni.removeStorageSync('userParams');
							uni.switchTab({
								url: '../home/index'
							});
						} else {
							utils.showTextToast(res.msg);
						}
					});
				} else {
					utils.showTextToast('请输入验证码');
				}
			} else {
				utils.showTextToast('手机号码填写有误');
			}
		}
	}
};
</script>

<style scoped lang="less">
.login {
	width: 100%;
	height: 100vh;
	background-image: url(http://img.schyxgl.com/201908221138158JXzsjH97I.jpg);
	background-size: 100% 100%;
	padding-top: 150upx;
	.hello {
		font-size: 60upx;
		color: rgba(255, 255, 255, 1);
		margin-left: 79upx;
		margin-bottom: 230upx;
	}
	.phone {
		width: 590upx;
		margin: 90upx auto;
		display: flex;
		height: 65upx;
		border-bottom: 2upx solid rgba(152, 152, 152, 1);
		.user {
			color: #fff;
			font-size: 50upx;
			line-height: 50upx;
		}
		.icon-phone {
			color: #fff;
			font-size: 50upx;
			line-height: 50upx;
		}
		input {
			font-size: 32upx;
			color: #e7e6e6;
			margin-left: 41upx;
			line-height: 65upx;
		}
		.code {
			height: 50upx;
			min-width: 200upx;
			background: linear-gradient(0deg, rgba(165, 123, 255, 1), rgba(107, 115, 255, 1));
			border-radius: 28upx;
			font-size: 24upx;
			line-height: 50upx;
			padding: 0;
			color: rgba(255, 255, 255, 1);
		}
	}
	.btn {
		width: 590upx;
		height: 100upx;
		background: linear-gradient(0deg, rgba(165, 123, 255, 1), rgba(107, 115, 255, 1));
		border-radius: 50upx;
		font-size: 36upx;
		line-height: 100upx;
		color: rgba(255, 255, 255, 1);
	}
}
</style>
style>
