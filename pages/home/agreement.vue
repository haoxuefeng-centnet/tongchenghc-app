<!-- 签署电子合同 -->
<template>
	<view class="agreement">
		<view class="buyers">
			<image :src="payInfo.cusAvatar"></image>
			<text style="margin: 0 12upx;">卖家:</text>
			<text>{{payInfo.cusNick}}</text>
		</view>
		<view class="tell">联系方式：<text style="color: #000000;">{{payInfo.cusPhone}}</text></view>
		<view class="buyers">
			<image :src="sellInfo.cusAvatar"></image>
			<text style="margin: 0 12upx;">买家:</text>
			<text>{{sellInfo.cusNick}}</text>
		</view>
		<view class="tell">联系方式：<text style="color: #000000;">{{sellInfo.cusPhone}}</text></view>
		<view class="vehicleList-content">
			<view class="vehicleList-contents">
				<view class="layout">
					<image :src="carInfo.carImg1"></image>
					<view class="layoutList">
						<text class="layoutList-a layoutList-width">{{ carInfo.brandSeries }}</text>
						<view class="layoutList-b layoutList-width flex ">
							<text>{{ carInfo.carOldBoadTime}}年</text>
							<text class="layoutList-e">|</text>
							<text>{{ carInfo.carMileage }}万公里</text>
							<text class="layoutList-e">|</text>
							<text>{{ carInfo.cityLocation }}</text>
						</view>
						<view class="layoutList-c layoutList-width">
							<view>
								<text class="layoutList-c-price" v-if="carInfo.interPrice">￥{{ carInfo.interPrice }}万</text>
								<text class="layoutList-c-price" v-else>未定价</text>
<!-- 								<text class="layoutList-c-prices" style=" text-decoration: line-through;">{{ carInfo.costPrice }}万</text>
 -->							</view>
							<text class="layoutList-c-right layoutList-c-prices">{{carInfo.updateTime}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="text">
		<scroll-view scroll-y style="height: 100%;">
				<view class="rules">
				据相关法律规定和公平诚信原则，买卖双方前期车况沟通明确自愿达成以下合同约定事项：
			</view>
			<view class="rules">
				1.卖方：确保所售车辆手续齐全、真实有效、来源正常、无重大事故、无泡水、无火烧，车况描述、价格与实际相符，可作为仲裁依据。
			</view>
			<view class="rules">
				2.买方：已确认接受卖方车辆信息、车况描述、价格和手续办理意见。
			</view>
			<view class="rules">
				3.托管：双方各托管定金（{{deposit.collectMoney}}元）到平台,完成交易后在我的订单~申请退款，平台收取双方各（{{deposit.refundMoney}}元）/台服务费，其余定金原路返还。
			</view>
			<view class="rules">
				4.仲裁：客服介入未达成交易，将收取违约方（{{deposit.abnormalRefund}}元/台）服务费，其余定金赔付另一方。违约判定参照行业交易标准及前期沟通凭证。
			</view>
			<view class="rules">
				5.备注：双方其他沟通凭据可作为本合同附件。
			</view>
			<view class="rules">
				详情咨询客服
			</view>
			</scroll-view>
		</view>
		<view class="btnss">
			<button type="primary" class="consulting" @tap="getPhone">电话咨询</button>
			<button type="primary" class="sure" @tap="payModalShow = true">签署合同并托管定金</button>
		</view>
		<PayModal :isShow="payModalShow" @hideModal="hideModal" @sendPay="submitOrder"></PayModal>
	</view>
</template>

<script>
	import {deposit} from '../../api/home.js'
	import utils from '../../utils/utils.js'
	import { postBuyOrder } from '../../api/order.js'
	import PayModal from '../../components/pay/pay.vue'
		import { payMixins } from '../../mixins/index.js'
	export default {
		components: { PayModal },
		mixins: [ payMixins ],
		data() {
			return {
				carId: '',
				payInfo: '',
				sellInfo: '',
				carInfo: '',
				deposit: '',
			}
		},
		onLoad(query) {
			this.carId = query.carId; 
		},
		onShow() {
			deposit({
				carId: this.carId
			}).then(res => {
				if (res.code == 200) {
					this.payInfo = res.data.seller;
					this.sellInfo = res.data.buyer;
					this.carInfo = res.data.car;
					this.carInfo.carOldBoadTime = this.carInfo.carOldBoadTime.substring(0, 4);
					this.deposit = res.data.deposit;
				}
			})
		},
		methods: {
			// 拨打电话
			getPhone() {
				this.callPhone(this.payInfo.cusPhone)
			},
			// 提交订单发起支付
			submitOrder(payType) {
				// payType 0 账号支付 1 微信支付
				postBuyOrder({carId: this.carInfo.carId, type: payType}).then(res => {
					if (res.code === 200) {
						// 调起支付
						this.unifiedPay({
							payType,
							params: res.data.info,
							successBack() {
								uni.redirectTo({
									url: '../user/myorder/myorder'
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.agreement {
		height: 100vh;
		background: rgba(242, 242, 242, 1);
		position: fixed;
		.tell {
			font-size: 30upx;
			color: rgba(152, 152, 152, 1);
			line-height: 90upx;
			padding-left: 24upx;
			background: #fff;
			border-bottom: 2upx solid rgba(242, 242, 242, 1);
		}

		.contents {
			margin-bottom: 16upx;
			padding-top: 0;
		}

		.text {
			height: 500upx;
			overflow: hidden;
			background: #fff;
			padding: 35upx 25upx;

			.rules {
				line-height: 20px;
				font-size: 24upx;
				color: #000000;
			}
		}

		.btnss {
			background: #fff;
			display: flex;
			position: fixed;
			bottom: 0;
			padding: 20upx;
			width: 100%;

			.consulting {
				width: 48%;
				height: 100upx;
				margin: 0 1%;
				background: rgba(255, 255, 255, 1);
				border: 2upx solid #A57BFF;
				border-radius: 20upx;
				font-size: 36upx;
				line-height: 100upx;
				color: rgba(233, 143, 54, 1);
				background: linear-gradient(0deg, rgba(165, 123, 255, 1) 0%, rgba(107, 115, 255, 1) 100%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
				margin-right: 10upx;
			}

			.sure {
				width: 370upx;
				height: 100upx;
				background: linear-gradient(0deg, rgba(165, 123, 255, 1), rgba(107, 115, 255, 1));
				border-radius: 20upx;
				font-size: 36upx;
				line-height: 100upx;
				color: rgba(255, 255, 255, 1);
			}
		}
	}
	.vehicleList-contents {
		margin: 0 auto 20upx;
		.layout {
			margin-top: 20upx;
		}
	}
	.buyers {
		width: 100%;
		height: 90upx;
		display: flex;
		align-items: center;
		padding: 0 3%;
		font-size: 30upx;
		background: #FFFFFF;
		border-bottom: 2upx solid #f2f2f2;
		
		image {
			width: 70upx;
			height: 70upx;
			border-radius: 50%;
		}
	}
</style>
