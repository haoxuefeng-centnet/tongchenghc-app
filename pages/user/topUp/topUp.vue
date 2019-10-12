<!-- 充值 -->
<template>
	<view class="topUp-index">
		<view class="topUp flex flex-direction">
			<view class="topUp-top flex">
				<text class="iconfont" style="font-size: 50upx;color: #09BB07;">&#xe62c;</text>
				<text>微信</text>
			</view>
			<view class="topUp-center flex flex-direction">
				<text>充值金额</text>
				<view class="topUp-centerbo flex justify-between align-center">
					<view>￥</view>
					<input type="number" v-model="amount" />
				</view>
			</view>
			<view class="base">
				<button class="base-bottow" @tap="submitTopup"><text class="base-bottow-text">立即支付</text></button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		userTopup
	} from '../../../api/user.js'
	import utils from '../../../utils/utils.js'
	import { payMixins } from '../../../mixins/index.js'
	export default {
		mixins: [payMixins],
		data() {
			return {
				amount: '', //金额
				type: 1
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			this.type = 2 // 1 小程序  2	微信APP
			// #endif
			
			// #ifdef MP-WEIXIN
				this.type = 1
				this.validationWxAuth();
			// #endif
		},
    onShow() {
      this.amount = ''
    },
		methods: {
			// 余额充值
			submitTopup() {
				if (this.amount === '' || !/^[0-9]+.?[0-9]*/.test(Number(this.amount))) {
					utils.showTextToast('请填写正确的充值金额')
					return false
				}
				userTopup({
					money: this.amount,
					type: this.type
				}).then(res => {
					if (res.code === 200) {
						// 小程序内微信支付
						// #ifdef MP-WEIXIN
						this.weixiPay(res.data.info)
						// #endif
						// app内微信支付
						// #ifdef APP-PLUS
						this.weixiAppPay(res.data.info)
						// #endif
					}
				})
			}

		}
	}
</script>

<style lang="less">
	page {
		background-color: #F1F1F1;
	}

	.topUp-index {
		margin-top: 20upx;
	}

	.topUp {
		width: 95%;
		height: 498upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 3upx 2upx 8upx 0upx rgba(66, 71, 157, 0.22);
		border-radius: 10upx;
		margin: 0 auto;

		.topUp-top {
			width: 90%;
			height: 23%;
			line-height: 118upx;
			font-size: 30upx;
			border-bottom: 2upx solid #F2F2F2;
			margin: 0 auto;

			text {
				margin: 0 2%;
			}
		}

		.topUp-center {
			width: 90%;
			height: 46%;
			border-bottom: 2upx solid #F2F2F2;
			font-size: 30upx;
			margin: 0 auto;

			text {
				height: 50%;
				line-height: 118upx;
				font-size: 30upx;
			}

			.topUp-centerbo {
				width: 100%;
				height: 50%;
				line-height: 118upx;

				view {
					width: 10%;
					font-size: 70upx;
				}

				input {
					width: 85%;
					height: 50upx;
					font-size: 50upx;
				}
			}
		}
	}

	.base {
		font-size: 36upx;
		font-weight: bold;

		margin-top: 4%;

		.base-bottow-text {
			color: rgba(255, 255, 255, 1);
		}
	}
</style>
