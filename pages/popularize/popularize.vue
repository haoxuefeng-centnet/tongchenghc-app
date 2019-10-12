<!-- 推广更新 -->
<template>
	<view class="popularize">
		<view class="vehicleList-content">
			<scroll-view scroll-y style="height: 100%;">
				<view class="vehicleList-contents" v-for="(item, index) in list" :key="index">
					<view class="layout">
						<view class="container flex justify-start">
							<image :src="item.carImg1"></image>
							<view class="layoutList">
								<text class="layoutList-a layoutList-width">{{ item.brandSeries }}</text>
								<view class="contrue flex layoutList-b layoutList-width  ">
									<text class="contrue">{{ item.carOldBoadTime}}年</text>
									<text class="layoutList-e">|</text>
									<text class="contrue">{{ item.carMieage }}万公里</text>
									<text class="layoutList-e">|</text>
									<text class="contrue">{{ item.cityLocation }}</text>
								</view>
								<view class="layoutList-c layoutList-width">
									<view>
										<text class="layoutList-c-price" v-if="item.interPrice">￥{{ item.interPrice }}万</text>
										<text class="layoutList-c-price" v-else>未定价</text>
<!-- 										<text class="layoutList-c-prices" style=" text-decoration: line-through;">{{ item.costPrice }}万</text>
 -->									</view>
								</view>
							</view>
						</view>
						<view class="promote" v-if="item.type !== 2">
							<text class="remaining">剩余{{ item.type === 0 ? '推广' : '刷新'}}时长:</text>
							<text class="time">{{ item.timeStr}}</text>
						</view>
					</view>
					<view class="btns" v-if="item.type === 0">
						<button class="btn spread disable" disabled @tap="showModal(item)">推广</button>
						<button class="btn freshen disable" disabled @tap="conFiemRefresh(item)">刷新</button>
					</view>
					<view class="btns" v-if="item.type === 1">
						<button class="btn spread disable" disabled @tap="showModal(item)">推广</button>
						<button class="btn freshen disable" disabled @tap="conFiemRefresh(item)">刷新</button>
					</view>
					<view class="btns" v-if="item.type === 2">
						<button class="btn spread" @tap="showModal(item)">推广</button>
						<button class="btn freshen" @tap="conFiemRefresh(item)">刷新</button>
					</view>
				</view>
			</scroll-view>
			<UiLoading :loadingType="loadingType"></UiLoading>
			<!-- 推广模态框 -->
			<view class="cu-modal" v-if="modalName == 'Modal'" :class="modalName == 'Modal' ? 'show' : ''">
				<view class="cu-dialog">
					<view class="telet">请输入推广天数</view>
					<view class="container">
						<view class="telet-input flex justify-between">
							<text>置顶推广</text>
							<input class="input" type="number" v-model="promotionNum" />
							<text>{{promotion.unit}}</text>
						</view>
						<view class="hint-text">推广{{promotion.configPrice}}元/{{promotion.unit}},到期自动转为普通显示</view>
					</view>
					<view class="cu-bar bg-white">
						<view class="action text-blue center" @tap="modalName = null">取消</view>
						<view class="action text-green center" @tap="confirmPay">确定</view>
					</view>
				</view>
			</view>
			<!-- 刷新 -->
			<view class="cu-modal" v-if="modalFlush == 'flush'" :class="modalFlush == 'flush' ? 'show' : ''">
				<view class="cu-dialog">
					<view class="telet">请输入刷新天数</view>
					<view class="container">
						<view class="telet-input flex justify-between">
							<text>全国刷新</text>
							<input class="input" type="number" v-model="flushNum" />
							<text>{{flush.unit}}</text>
						</view>
						<view class="hint-text">刷新{{flush.configPrice}}元/{{flush.unit}},到期自动转为普通显示</view>
					</view>
					<view class="cu-bar bg-white">
						<view class="action text-blue center" @tap="modalFlush = null">取消</view>
						<view class="action text-green center" @tap="confirmFlushPay">确定</view>
					</view>
				</view>
			</view>
		</view>
		<PayModal :isShow="payModalShow" @hideModal="hideModal" @sendPay="sendPay"></PayModal>
	</view>
</template>

<script>
	import {
		carList,
		refresh,
		configInfo,
		useFlush,
		usePromotion,
		clickFlush
	} from '../../api/popularize.js';
	import {
		buyPromotion,
		buyFlush
	} from '../../api/order.js';
	import utils from '../../utils/utils.js';
	import {
		loadMoreList,
		payMixins
	} from '../../mixins/index.js';
	import UiLoading from '../../colorui/components/ui-loading.vue'
	import PayModal from '../../components/pay/pay.vue'
	export default {
		mixins: [loadMoreList, payMixins],
		components: {
			UiLoading,
			PayModal
		},
		data() {
			return {
				data: [],
				modalName: null,
				modalFlush: null,
				promotion: {}, // 推广信息
				promotionNum: '', // 购买推广天数
				flush: {}, // 刷新信息
				flushNum: '', // 刷新天数
				actCarId: '', // 选中的车辆id
				payMode: ''
			};
		},
		onLoad() {
			this.reqFn = carList;
			this.reqValue = 'list';
			this.params.pageSizeKey = 5;
		},
		onShow() {
			this.getData();
			this.callback = data => {
        this.noData = Boolean( data.length);
				data.forEach(item => {
          item.carOldBoadTime = item.carOldBoadTime.substring(0, 4);
					item.timeStr = this.timeStamp(item.expireMinute)
            
				});
			}
		},
		methods: {
			// 模态框
			showModal(item) {
				const that = this;
				that.payMode = 'promotion';
				// 判断是否有剩余的推广次数
				if (Number(that.promotion.surplusSize) < 1) {
					uni.showModal({
						title: '提示',
						content: '您的推广次数为零！',
						confirmText: '去购买',
						success(res) {
							if (res.confirm) {
								that.modalName = 'Modal';
								that.actCarId = item.carId
							}
						}
					})
					return false
				}
				that.useZsong(item.carId)
			},
			// 获取数据
			getData() {
        this.list = [];
        this.currentPage = 1;
        this.getList();
				configInfo().then(res => {
					if (res.code === 200) {
						this.promotion = res.data.promotion;
						this.flush = res.data.flush;
					}
				})
			},
			// 时间转换
			timeStamp(StatusMinute) {
				var day = parseInt(StatusMinute / 60 / 24);
				var hour = parseInt((StatusMinute / 60) % 24);
				var min = parseInt(StatusMinute % 60);
        let timeStr = '';
        timeStr = `${day}天${hour}时${min}分`
				return timeStr;
			},
			// 刷新
			conFiemRefresh(item) {
				const that = this;
				that.payMode = 'flush';
				// 能否进行刷新
				if (item.isFlush) {
					clickFlush({carId: item.carId}).then(res => {
						if (res.code === 200) {
							utils.showTextToast(res.msg);
						}
					})
					return false;
				}
				// 判断是否有剩余的刷新次数
				if (Number(that.flush.surplusSize) < 1) {
					uni.showModal({
						title: '提示',
						content: '您的刷新次数为零！',
						confirmText: '去购买',
						success(res) {
							if (res.confirm) {
								that.modalFlush = 'flush';
								that.actCarId = item.carId
							}
						}
					})
					return false
				}
				that.useSxing(item.carId);
			},
			// 使用赠送推广
			useZsong(id) {
				usePromotion({carId: id}).then(res => {
					if (res.code === 200) {
						utils.showTextToast(res.msg)
						this.getData();
					}
				})
			},
			// 使用赠送刷新
			useSxing(id) {
				useFlush({carId: id}).then(res => {
					if (res.code === 200) {
						utils.showTextToast(res.msg)
						this.getData();
					}
				})
			},
			// 确定购买刷新
			confirmFlushPay() {
				if ( Number(this.flushNum) < 3  ) {
					utils.showTextToast('购买天数为 3 - 15 天');
					return
				} else if(Number(this.flushNum) > 15 ){
					utils.showTextToast('购买天数为 3 - 15 天');
					return
				}else{
					this.modalFlush = null;
					this.payModalShow = true;
				}
			},
			// 确定购买推广
			confirmPay() {
				if ( Number(this.promotionNum) < 3  ) {
					utils.showTextToast('购买天数至少为 3 - 15 天');
					return
				} else if(Number(this.promotionNum) > 15 ){
					utils.showTextToast('购买天数至少为 3 - 15 天');
					return
				}else{
					this.modalName = null;
					this.payModalShow = true;
				}
			},
			// 发起购买推广支付
			sendPay(type) {
				const that = this;
				if (that.payMode === 'promotion') {
				 buyPromotion({
				 	type,
				 	num: Number(that.promotionNum),
				 	carId: that.actCarId
				 }).then(res => {
				 	if (res.code === 200) {
				 		that.actCarId = '';
				 		that.unifiedPay({
				 			payType: type,
				 			params: res.data.info,
				 			successBack() {
				 				that.getData();
				 			}
				 		})
				 	}
				 })	
				} else if (that.payMode === 'flush') {
					refresh({
						type,
						num: Number(that.flushNum),
						carId: that.actCarId
					}).then(res => {
						if (res.code === 200) {
							that.actCarId = '';
							that.unifiedPay({
								payType: type,
								params: res.data.info,
								successBack() {
									that.getData();
								}
							})
						}
					})	
				}
			}
		}
	};
</script>

<style scoped lang="less">
	.popularize {
		width: 100%;
		min-height: 100vh;
		background: rgba(242, 242, 242, 1);
		padding-bottom: 20upx;

		.promote {
			width: 100%;
			margin-top: 28upx;
			border-top: 2upx solid #F2F2F2;
			border-radius: 0 0 10upx 10upx;
			padding-left: 30upx;
		}

		.time {
			font-size: 20upx;
			color: #fa2c22;
			line-height: 70upx;
		}

		.remaining {
			font-size: 20upx;
			color: rgba(0, 0, 0, 1);
			line-height: 70upx;
			margin-right: 12upx;
		}

		.btns {
			position: absolute;
			top: 72upx;
			right: 20upx;
			.btn {
				width: 130upx;
				padding: 0 16upx;
				height: 50upx;
				border-radius: 10upx;
				font-size: 24upx;
				font-weight: bold;
				color: rgba(255, 254, 254, 1);
				line-height: 50upx;
			}

			.disable {
				background: #989898;
			}
		}

		/* 推广 */
		.spread {
			background: rgba(107, 115, 255, 1);
		}

		/* 刷新 */
		.freshen {
			background: rgba(165, 123, 255, 1);
			margin-top: 16upx;
		}
	}

	.vehicleList-contents {
		position: relative;
	}
	.vehicleList-contents {
		height: auto;
		min-height: 200upx;
	}
	.layout {
		display: block;
		.layoutList {
			width: 398upx;
			margin-left: 30upx;
			.layoutList-width {
				width: 100%;
			}
		}
	}
	.layoutList-b{
		max-width: 350upx;
	}
</style>
