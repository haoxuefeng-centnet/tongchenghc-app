<!-- 我的订单 -->
<template>
	<view>
		<!-- 头部 -->
		<view class="headjs flex justify-center">
			<view :class="['item', changeIndex === 0 ? 'active' : '']" @tap="changeOrder(0)">
				<text>买车</text>
			</view>
			<view :class="['item', changeIndex === 1 ? 'active' : '']" @tap="changeOrder(1)">
				<text>卖车</text>
			</view>
		</view>
		<!-- 车辆信息列表 -->
		<view class="">
			<view class="content-list flex flex-direction" v-for="item in list" :key="item.orderId">
				<view class="content-title flex justify-between">
					<view class=" flex justify-start" style="align-items: center;">
						<image :src="item.cusHeadImg"></image>
						<text class="subtitles">{{ item.cusName }}</text>
					</view>
					<view class="" style="color: #FA3930;" >
						<text>{{ item.dealStatusStr }}</text>
					</view>
				</view>
        <view class="" @tap="jumpsk(item.orderId)">
          <view class="middle flex justify-between">
          	<image :src="item.carImg"></image>
          	<view class="middle-content flex flex-direction">
          		<view class="titleScreen">{{ item.brandSeries }}</view>
          		<view class="titleScreen-first">{{ item.carOldBoadTimeFmt }}年 | {{item.carMileage}}万公里 | {{item.cityLocation}}</view>
          		<view class="layoutList-c layoutList-width">
          			<view>
          				<text class="layoutList-c-price" v-if="item.interPrice">￥{{item.interPrice}}万</text>
          				<text class="layoutList-c-price" v-else>未定价</text>
          				<!-- <text class="layoutList-c-prices" style=" text-decoration: line-through;">{{item.costPrice}}万</text> -->
          			</view>
          		</view>
          	</view>
          </view>
        </view>

				<view class="flex justify-end" v-if="item.dealStatus == 3">待支付定金: ￥{{ item.depositPrice }}</view>
				<view class="flex justify-end" v-if="item.dealStatus == 0 || item.dealStatus == 4">已支付定金: ￥{{ item.depositPrice }}</view>
				<view class="flex justify-end" v-if="item.dealStatus == 5">已退款: ￥{{ item.depositPrice }}</view>
				<view class="tradeButton flex justify-end" v-if="item.dealStatus == 0">
					<view class="failure" @tap="confirm(2,item.orderId)">交易失败</view>
					<view class="successful" data-target="Modal" @tap="confirm(1,item.orderId,$event,item.carId)">交易成功</view>
				</view>
			</view>
		</view>
		<!-- 填写成交价 -->
		<view class="cu-modal" v-show="modalName == 'Modal'" :class="modalName == 'Modal' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="read">
					<view class="title">成交</view>
					<view class="flex align-center justify-between turnover">
						<view>成交价<text class="hint">*</text></view>
						<view class="flex align-center strikePrice">
							<input class="" type="digit" maxlength="9" v-model="formData.transactionPrice" placeholder="请输入成交价(万)" />
						</view>
						<view>万元</view>
					</view>
					<view class=" flex justify-center align-center tabList-content">
						<view class="radio-item">
							<text class="iconfont radio-icon" @tap="carType" v-if="!purchase">&#xe75b;</text>
							<text class="iconfont radio-icon" style="color: #A57BFF" @tap="carType" v-if="purchase">&#xe659;</text>
							<text style="margin-left: 17upx;font-size:24upx; ;">零售</text>
						</view>
						<view class="radio-item">
							<text class="iconfont radio-icon" @tap="carType" v-if="purchase">&#xe75b;</text>
							<text class="iconfont radio-icon" style="color: #A57BFF" @tap="carType" v-if="!purchase">&#xe659;</text>
							<text style="margin-left: 17upx; font-size:24upx;;">批发</text>
						</view>
					</view>
					<view class="flex align-center justify-between name">
						<text>姓名</text>
						<view class="flex align-center justify-between strikePrice">
							<input type="text" v-model="formData.name" placeholder="请输入姓名" />
						</view>
						<view class="placeholders"></view>
					</view>
					<view class="flex align-center justify-between name">
						<text>电话</text>
						<view class="flex align-center strikePrice">
							<input type="number" maxlength="11" v-model="formData.phone" placeholder="请输入电话" />
						</view>
						<view class="placeholders"></view>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action text-blue center" @tap="hideModal">取消</view>
					<view class="action text-green center" @tap="undercarriage">确定</view>
				</view>
			</view>
		</view>
		<UiLoading :loadingType="loadingType"></UiLoading>
	</view>
</template>

<script>
	import {below} from '../../../api/home.js';
	import {carDeal} from '../../../api/order.js'
	import {orderList , depositConfirm} from '../../../api/order.js'
	import {loadMoreList} from '../../../mixins/index.js';
	import UiLoading from '../../../colorui/components/ui-loading.vue';
	import utils from '../../../utils/utils.js';
	export default {
		components: {
			UiLoading
		},
		mixins: [loadMoreList],
		data() {
			return {
				changeIndex: 0,
				modalName: null,
				purchase: true,
				status:'',
				orderId:'',
				formData:{
					carId:'',
					name:'',
					phone:'',
					transactionPrice:'',
					sellType: 1
				}
			};
		},
		onLoad() {
			this.reqFn = orderList;
			this.params.type = this.changeIndex;
			this.params.pageSizeKey = 30;
		},
		onShow() {
			this.getList();
		},
		methods: {
      jumpsk(item){
        uni.navigateTo({
          url: `../orderDetails/orderDetails?type=${this.changeIndex}&orderId=${item}`
        });
      },
			// 切换数据
			changeOrder(type) {
				this.list = [];
				this.changeIndex = type;
				this.params.type = type;
				this.getList();
			},
			// 交易操作
			confirm(item,orderId,e,id){
				const that =this
				uni.showModal({
				    title: '提示',
				    content: '是否确认交易',
				    success: function (res) {
				        if (res.confirm) {
				            that.orderId = orderId
				            that.status = item
				            that.formData.carId = id
							depositConfirm({status:item,orderId:orderId}).then(res=>{
								if(res.code == 200){
									that.getList();
								}
							})
							if(id){
								if(that.changeIndex == 1){
									that.modalName = e.currentTarget.dataset.target;
								}
							}
				        } 
				    }
				});
			},
			hideModal(e) {
				this.modalName = null;
			},
			// 选择零售 批发
			carType() {
				if (this.purchase) {
					this.purchase = false;
					this.sellType = 2;
				} else {
					this.purchase = true;
					this.sellType = 1;
				}
			},
			// 下架
			undercarriage() {
				if (this.formData.transactionPrice) {
          if(!/^\d+(\.\d{1,2})?$/.test(this.formData.transactionPrice)){
                  utils.showTextToast('成交价小数点后最多两位小数');
                  return;
                }
					if(this.formData.phone){
						if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.formData.phone)) {
							utils.showTextToast('手机号码错误');
							return
						}
					}
					carDeal(this.formData).then(res => {
						if (res.code == 200) {
							this.modalName = null;
							this.formData.perice = '';
							this.formData.name = '';
							this.formData.phone = '';
						} else {
							utils.showTextToast(res.msg);
						}
					});
				} else {
					utils.showTextToast('请输入成交价');
				}
			},
		}
	};
</script>

<style scoped lang="less">
	.headjs {
		width: 100%;
		height: 60upx;
		text-align: center;
		font-size: 30upx;
		color: #989898;

		.item {
			width: 40%;
			height: 100%;
			line-height: 60upx;
			margin: 0 20upx;
			border-bottom: 2upx solid transparent;

			&.active {
				border-color: #007AFF;
				color: #007AFF;
			}
		}
	}

	.content-list {
		width: 93%;
		background: rgba(255, 255, 255, 1);
		box-shadow: 3upx 2upx 8upx 0upx rgba(66, 71, 157, 0.22);
		border-radius: 10px;
		margin: 8upx auto;
		padding: 30upx;

		.content-title {
			height: 50upx;
			align-items: center;

			image {
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
			}
		}

		.subtitles {
			margin-left: 20upx;
			font-size: 24upx;
			color: rgba(152, 152, 152, 1);
		}
	}

	.middle {
		margin: 34upx 0;

		image {
			width: 150upx;
			height: 150upx;
			border-radius: 10upx;
		}

		.middle-content {
			width: 70%;

			.titleScreen {
				font-size: 30upx;
				line-height: 45upx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.titleScreen-first {
				font-size: 22upx;
				line-height: 45upx;
				color: rgba(152, 152, 152, 1);
			}

			.titleScreen-money {
				font-size: 34upx;
				color: rgba(250, 44, 34, 1);

			}
		}
	}
	.tradeButton{
		padding-top: 30upx;
		view{
			width:150upx;
			height:46upx;
			border-radius:20px;
			font-size:24upx;
			line-height: 46upx;
			text-align: center;
		}
		.failure{
			border:1px solid #252525;
			color:#252525 ;
		}
		.successful{
			border:1px solid #6B73FF;
			color: #6B73FF;
			margin-left: 10upx;
		}
	}
</style>
