<!-- 登录注册 -->
<template>
	<view class="login">
		<view class="hello">WELCOME !</view>
		<view class="phone">
			<text class="iconfont icon-phone">&#xe62a;</text>
			<input @input="phoneNum" type="number" maxlength="11" placeholder="请输入手机号" />
		</view>
		<view class="phone">
			<text class="iconfont user">&#xe615;</text>
			<input @input="codeNum" type="number" maxlength="6" :value="code" placeholder="请输入验证码" />
			<button type="primary" class="code" v-text="codeText" :disabled="disable" @tap="sendCode"></button>
		</view>
		<button @tap="formSubmit" class="btn">注册/登录</button>
		<view class="checkThe-bos">
			<view class="flex justify-between checkThe">
				<view class="">登录代表你同意</view>
				<view class="checkThe-user" style="color: #8D77FF;" @tap="jump">《用户注册与隐私保护服务协议》</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
import { loginCode, loginIn , getUser } from '../../api/login.js';
export default {
	data() {
		return {
			phone: '',
			code: '',
			codeText: '发送验证码',
			timer: null,
			count: 60,
			disable: false,
			position: ''
		};
	},
	onShow() {
		
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
				this.disable = false
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
						}
					}, 1000);
				}
			}).finally(() => {
        this.disable = false;
      });
		},
		formSubmit() {
			// 获取手机唯一标识
			// #ifdef APP-PLUS
			const info = plus.push.getClientInfo();
			const appInfo = info;
			const appCode = appInfo.clientid;
			// #endif
			if (/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone)) {
				if (this.code != '') {
					loginIn({ phone: this.phone,
					 code: this.code,
						position: this.position,
						// #ifdef APP-PLUS
						deviceCode: appCode
						// #endif
						}).then(res => {
						if (res.code == 200) {
							uni.setStorageSync('cusToken', res.data.cusToken);
							getUser().then(resdata => {
								if (resdata.code == 200) {
									uni.setStorage({
										key: 'userInfo',
										data: resdata.data,
									});
								}
							})
							uni.switchTab({
								url: '../home/index'
							});
						}
					});
				} else {
					utils.showTextToast('请输入验证码');
				}
			} else {
				utils.showTextToast('手机号码填写有误');
			}
		},
		jump(){
			uni.navigateTo({
				url: '../userAgreement/userAgreement',
			});
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
.checkThe{
  padding: 20rpx;
	color: #d7d7d7;
	font-size: 24upx;
  display: flex;
  justify-content: center;
  align-items: center;

}
.checkThe-bos{
	width: 100%;
	position: fixed;
	bottom: 60upx;
	text-align: center;
}
</style>
style>
