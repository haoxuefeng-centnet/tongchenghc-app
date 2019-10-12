<!-- 订单详情页 -->
<template>
	<view class="order-detail" :class="!ispadding? 'pandingBoot':''">
		<view class="nav flex flex-direction">
			<text class="nav-title">{{orderInfo.dealStatusStr || '暂无状态'}}</text>
			<text class="nav-bottom">订单编号:{{orderInfo.currentOrderId}}</text>
			<text class="nav-bottom">创建时间:{{buyer.gmtCreate}}</text>
		</view>
		<!-- 文本 -->
		<view class="columns">
			<text>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;据相关法律规定和公平诚信原则,买卖双方前期车况沟通明确自愿达成以下合同约定事项:
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.卖方: 确保所售车辆手续齐全、真实有效、来源正常、无重大事故、无泡水、无火烧,车况描述、 价格与实际相符,可作为仲裁依据。如卖方描述不符，有重大事故，水泡、火烧等隐瞒情况，保证金作废，归买方所有。小瑕疵小误差两边协商解决。
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.买方: 已确认接受卖方车辆信息、车况描述、价格和手续办理意见。按合同约定时间提车，若规定时间未提车，卖方可要求追加定金，或保证金作废归卖方所有。
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.托管:双方各托管定金({{depositConfig.collectMoney}}元)到平台,完成交易后在我的订单~申请退款，平台收取双方各({{depositConfig.refundMoney}}元)/台服务费,其余定金原路返还。
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.仲裁:双方协商未果，客服介入未达成交易,将收取违约方({{depositConfig.abnormalRefund}}元/台)服务费,其余定金赔付另一方。违约判定参照行业交易标准或启动大众参评环节，即少数服从多数为原则及前期沟通凭证。
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5、备注：双方其它沟通凭证可作为本合同附件。
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;详情咨询客服
			</text>
		</view>
		<!-- 车辆信息 -->
		<view class="vehicleList-content">
			<view class="vehicleList-contents">
				<view class="layout" @tap="details">
					<image :src="carInfo.carImg1"></image>
					<view class="layoutList ">
						<text class="layoutList-a layoutList-width">{{carInfo.brandSeries}}</text>
						<view class="layoutList-b layoutList-width flex ">
							<text>{{carInfo.carOldBoadTimeFmt }}年</text>
							<text class="layoutList-e">|</text>
							<text>{{carInfo.carMileage}}万公里</text>
							<text class="layoutList-e">|</text>
							<text>{{carInfo.cityLocation}}</text>
						</view>
						<view class="layoutList-c layoutList-width">
							<view>
								<text class="layoutList-c-price" v-if="carInfo.interPrice">￥{{carInfo.interPrice}}万</text>
								<text class="layoutList-c-price" v-else>未定价</text>
								<!-- <text class="layoutList-c-prices" style=" text-decoration: line-through;">{{carInfo.costPrice}}万</text> -->
							</view>
							<text class="layoutList-c-right layoutList-c-prices">{{carInfo.createTime}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 卖家买家信息 -->
		<view class="buyers">
			<image :src="seller.cusHeadImg"></image>
			<text style="color: #989898;margin:0 20upx ;">卖家:</text>
			<text>{{seller.cusName}}</text>
		</view>
		<view class="buyers">
			<image :src="buyer.cusHeadImg"></image>
			<text style="color: #989898;margin:0 20upx ;">买家:</text>
			<text>{{ buyer.cusName}}</text>
		</view>
		<!-- 底部按钮 -->
		<view class="btns-on flex justify-center align-center" v-if="orderInfo.orderStatus === 3">
			<button type="primary" class="consulting" @tap="confirmOrder">取消订单</button>
			<button type="primary" class="sure" @tap="payModalShow = true">继续支付</button>
		</view>
		<view class="btns-on flex justify-center align-center" v-if="orderInfo.orderStatus === 4">
			<button type="primary" class="consulting" @tap="confirmOrder">取消订单</button>
		</view>
		<PayModal :isShow="payModalShow" @hideModal="hideModal" @sendPay="submitOrder"></PayModal>
	</view>
</template>

<script>
	import utils from '../../../utils/utils.js'
	import {
		orderDetails
	} from '../../../api/order.js'
	import {
		continuePay,
		cancelOrder
	} from '../../../api/order.js'
	import PayModal from '../../../components/pay/pay.vue'
	import {
		payMixins
	} from '../../../mixins/index.js'
	export default {
		components: {
			PayModal
		},
		mixins: [payMixins],
		data() {
			return {
				orderInfo: {},
				carInfo: {},
				buyer: {},
				seller: {},
				depositConfig:{},
				orderType: null,
				ispadding: true,
			};
		},
		onLoad(route) {
			this.orderType = route.type
			orderDetails({type: route.type,orderId: route.orderId}).then(res => {
				if (res.code === 200) {
					const states = res.data.seller.dealStatus
					this.orderInfo = res.data;
					this.depositConfig = res.data.depositConfig || {};
					this.carInfo = res.data.car || {};
					this.buyer = res.data.buyer || {};
					this.seller = res.data.seller || {};
					if(!states || states ==	3 || states == 4){
						this.ispadding = false
					}
				}
			})
		},
		methods: {
			// 跳转详情页
			details(){
				uni.navigateTo({
					url: '../../vehicleDetails/vehicleDetail?carId='+ this.carInfo.carId,
				});
			},
			// 取消订单确定弹框
			confirmOrder() {
				const that = this;
				uni.showModal({
					title: '提示',
					content: '确定取消此订单吗？',
					success: function(res) {
						if (res.confirm) {
							that.postCancelOrder()
						}
					}
				})
			},
			// 取消订单请求
			postCancelOrder() {
				cancelOrder({orderId: this.orderInfo.currentOrderId,type: this.orderType}).then(res => {
					if (res.code === 200) {
						utils.showSuccessToast(res.msg)
						uni.navigateBack({
							delta: 1
						})
					}
				}).catch(err => {
					console.error(err)
				})
			},
			postContinuePay(data) {
				continuePay(data).then(res => {
					if (res.code === 200) {
						// 调起支付
						this.unifiedPay({
							payType: data.type,
							params: res.data.info,
							successBack() {
								uni.navigateBack({
									delta: 1
								});
							}
						})
					}
				})
			},
			// 提交订单
			submitOrder(payType) {
				// payType 0 账号支付 1 微信支付
				this.postContinuePay({orderId: this.orderInfo.currentOrderId,type: payType})
			}
		}
	};
</script>

<style scoped lang="less">
	.order-detail {
		height: 100%;
		
	}
	.pandingBoot{
		padding-bottom: 150upx;
	}
	.nav {
		width: 100%;
		height: 260upx;
		padding: 30upx 0;
		text-align: left;
		padding-left: 42upx;
		color: rgba(255, 255, 255, 1);
		background: linear-gradient(-90deg, rgba(165, 123, 255, 1), rgba(107, 115, 255, 1));

		.nav-title {
			height: 40upx;
			font-size: 40upx;
			font-weight: bold;
			margin: 30upx 0;
		}

		.nav-bottom {
			font-size: 30upx;
			margin: 10upx 0;
			color: rgba(255, 255, 255, 1);
		}
	}

	.columns {
		width: 93%;
		margin: 30upx auto;
		font-size: 24upx;
		line-height: 40upx;

		text {
			text-indent: 2em;
		}
	}

	.buyers {
		width: 100%;
		height: 90upx;
		display: flex;
		align-items: center;
		padding: 0 3%;
		font-size: 30upx;
		border-bottom: 2upx solid #f2f2f2;

		image {
			width: 70upx;
			height: 70upx;
			border-radius: 50%;
		}
	}

	.btns-on {
		margin-top: 10upx;
		padding: 30upx;
		background: #fff;
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 0;
		z-index: 999;

		.consulting {
			width: 360upx;
			height: 100upx;
			margin: 0 5upx;
			background: rgba(255, 255, 255, 1);
			border: 2upx solid #a57bff;
			border-radius: 20upx;
			font-size: 36upx;
			line-height: 100upx;
			color: rgba(233, 143, 54, 1);
			background: linear-gradient(0deg, rgba(165, 123, 255, 1) 0%, rgba(107, 115, 255, 1) 100%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
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
</style>
