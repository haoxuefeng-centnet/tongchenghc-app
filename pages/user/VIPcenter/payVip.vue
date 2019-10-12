<!-- 购买vip -->
<template>
	<view class="payVip">
		<view class="bg"></view>
		<view class="vip">
			<view :class="{on:active==index}" @tap="purchase(index,item.vipId)" v-for="(item,index) in data" :key="item.vipId">
				<text class="time" :class="{coloron:active==index}">{{item.vipTitle}}</text>
				<text class="money">￥{{item.vipPrice}} </text>
			</view>
		</view>
		<view class="hint">注：购买VIP后，可查看低价、成交价</view>
		<button type="primary" class="pay" @tap="payModalShow = true">支 付</button>
		<PayModal :isShow="payModalShow" @hideModal="hideModal" @sendPay="submitOrder"></PayModal>
	</view>
</template>

<script>
	import { getUser } from '../../../api/login.js'
	import { vipList} from '../../../api/popularize.js'
	import utils from '../../../utils/utils.js'
	import { payMixins } from '../../../mixins/index.js'
	import PayModal from '../../../components/pay/pay.vue'
	import { postBuyVip } from '../../../api/order.js'
	export default {
		mixins: [ payMixins ],
		components: { PayModal },
		data() {
			return {
				data: [],
				vipId: '',
				active: null
			}
		},
		onShow() {
			vipList().then(res => {
				this.data = res.data.vipList;
			})
		},
		methods: {
			purchase(index, id) {
				this.active = index;
				this.vipId = id;
			},
			// 提交订单发起支付
			submitOrder(payType) {
				if (!this.vipId) {
					utils.showTextToast('请选择vip套餐');
					return false;
				}
				// payType 0 账号支付 1 微信支付
				postBuyVip({configId: this.vipId, type: payType}).then(res => {
					if (res.code === 200) {
						// 调起支付
						this.unifiedPay({
							payType,
							params: res.data.info,
							successBack() {
								// 更新用户信息
								getUser().then(resdata => {
									if (resdata.code == 200) {
										uni.setStorage({
											key: 'userInfo',
											data: resdata.data,
										});
									}
								})
								uni.navigateBack({
									delta:2
								})
							}
						})
					} 
					// else {
					// 	utils.showTextToast(res.msg);
					// }
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.payVip {
		background: #fff;
		height: 100vh;

		.bg {
			height: 16upx;
			background: rgba(242, 242, 242, 1);
		}

		.on {
			background: #dee0ff;
		}

		.vip {
			display: flex;
			background: #fff;
			padding-top: 50upx;
			flex-wrap: wrap;
			view {
				width: 30%;
				height: 170upx;
				margin: 20upx auto;
				border: 2upx solid #A57BFF;
				border-radius: 10upx;
				padding-top: 40upx;
				.time,
				.money {
					font-size: 36upx;
					line-height: 23upx;
					display: block;
					text-align: center;
				}

				.money {
					color: rgba(250, 44, 34, 1);
					margin-top: 28upx;
				}

				.time {
					color: rgba(37, 37, 37, 1);
				}
			}
		}

		.hint {
			font-size: 24upx;
			color: rgba(233, 144, 54, 1);
			line-height: 23upx;
			padding-left: 25upx;
			margin-top: 40upx;
		}

		.pay {
			width: 500upx;
			height: 100upx;
			background: linear-gradient(0deg, rgba(165, 123, 255, 1), rgba(107, 115, 255, 1));
			border-radius: 20upx;
			line-height: 100upx;
			font-size: 36upx;
			color: rgba(255, 255, 255, 1);
			margin: 95upx auto;
			border: none;
		}
	}
</style>
