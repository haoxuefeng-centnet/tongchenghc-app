<!-- 微店 -->
<template>
	<view class="shop-page">
		<!-- 头部图片 -->
		<view class="nav">
			<swiper indicator-active-color="#7975FD" indicator-color="#F2F2F2" class="nav-swiper" :indicator-dots="indicatorDots"
			 :autoplay="true" :interval="2000" :duration="500">
				<swiper-item>
					<image class="swiper-item" :src="shopInfo.storeImg1"></image>
				</swiper-item>
				<swiper-item>
					<image class="swiper-item" :src="shopInfo.storeImg2"></image>
				</swiper-item>
				<swiper-item>
					<image class="swiper-item" :src="shopInfo.storeImg3"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="storesTitle">
			<image :src="shopInfo.storePhoto"></image>
			<view class="">
				<text style="font-size:32upx; font-weight:bold;" v-text="shopInfo.storeName"></text>
				<text style="font-size:26upx;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">门店地址: {{ shopInfo.doorNumber }}</text>
			</view>
			<text @tap="tell(shopInfo.storePhone)" class="iconfont" style="margin: auto 0; text-align: center; line-height: 56upx; color: #FFFFFF; width:56upx;height:56upx;background:linear-gradient(0deg,rgba(165,123,255,1),rgba(107,115,255,1));border-radius:50%;">&#xe608;</text>
		</view>
		<!-- 搜索框 -->
		<view class="search">
			<text class="iconfont search-text" @tap="search">&#xe612;</text>
			<input class="input-search" type="text" confirm-type="search" @confirm="search()" v-model="carName" value=""
			 placeholder="店内搜索" />
		</view>
		<!-- 详情 -->
		<view class="prompt">
			<uni-notice-bar class="prompt-a" show-icon="true" scrollable="true" single="true" :text="shopInfo.storeNotice"></uni-notice-bar>
		</view>
		<!-- 卖车估价 -->
		<view class="box">
			<view class="box-boos" @tap="jumpEstimated(2)">
				<view class="box-left">
					<image class="box-imageOne mafr-left" src="../../static/icon/zhuanye@2x.png" mode="">省钱</image>
					<view style="font-size:34upx;font-weight:bold;">卖车估价</view>
				</view>
				<image class="box-imageTow" src="../../static/icon/maiche@2x.png" mode=""></image>
			</view>
			<view class="box-boos" @tap="jumpEstimated(1)">
				<view class="box-left">
					<image class="box-imageOne mafr-left" src="../../static/icon/shengqian@2x.png" mode="">专业</image>
					<view style="font-size:34upx;font-weight:bold;">求购信息</view>
				</view>
				<image class="box-imageTow" src="../../static/icon/qiugou@2x.png" mode=""></image>
			</view>
		</view>
		<!--  -->
		<view class="vehicleList">
			<!--  -->
			<view class="vehicleList-nav flex justify-between">
				<view class="">
					<text class="vehicleList-nav-text">在售车辆</text>
					<view class="vehicleList-nav-content">
						<view class="vehicleList-dart">
							<text>热门车型</text>
							<text>低价抢购</text>
						</view>
					</view>
				</view>
			</view>
			<view class="vehicleList-content">
				<checkbox-group class="public-checkbox-list" @change="checkboxChange">
					<view class="vehicleList-contents" v-for="(item, index) in information" :key="index">
						<label class="public-checkbox" v-if="isShare">
							<checkbox :value="item.carId" :checked="item.checked" />
						</label>
						<view class="layout" :data-carid="item.carId" @tap="jump">
							<image :src="item.carImg1"></image>
							<view class="layoutList">
								<text class="layoutList-a layoutList-width">{{ item.brandSeries }}</text>
								<view class="layoutList-b layoutList-width flex ">
									<text>{{ item.carOldBoadTime}}年</text>
									<text class="layoutList-e">|</text>
									<text>{{ item.carMieage }}万公里</text>
									<text class="layoutList-e">|</text>
									<text>{{ item.cityLocation }}</text>
								</view>
								<view class="layoutList-c layoutList-width">
									<view>
										<text class="layoutList-c-price" v-if="item.interPrice">￥{{ item.interPrice }}万</text>
										<text class="layoutList-c-price" v-else>未定价</text>
										<!-- <text class="layoutList-c-prices" style=" text-decoration: line-through;">{{ item.costPrice }}万</text> -->
									</view>
									<text class="layoutList-c-right layoutList-c-prices">{{item.createTime}}</text>
								</view>
							</view>
						</view>
					</view>
				</checkbox-group>
			</view>
			<view class="temporarily" v-show="noData">
				暂无在售车辆...
			</view>
		</view>
		<view class="flex justify-between public-share-fixed" v-show="isShare">
			<view class="item flex align-center">
				<label class="public-checkbox" @click="checkboxAll">
					<checkbox value="" :checked="checkedAll" />
				</label>
				<text class="lefts">全选</text>
			</view>
			<view class="item flex align-center">
				<view class="text">已选择 {{ shareCarIds.length }} 辆车</view>
				<button type="primary" open-type="share" data-sharetype="list" :data-sharecarIds="shareCarIds" :data-storeId="storeId" :disabled="!shareCarIds.length" class="public-share-btn"
				 @tap="shareCars">分享</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNoticeBar from "@/components/uni-notice-bar/uni-notice-bar.vue"
	import { saveShareList } from '../../api/share.js';
	import {getUser} from '../../api/login.js';
	import {smallShop,storeList} from '../../api/smallShop.js';
	import { storeShopInfo } from '../../api/share.js'
	import {shareMixins} from '../../mixins/index.js'
	export default {
		components: {
			uniNoticeBar
		},
		mixins: [shareMixins],
		data() {
			return {
				storeId: '', //微店ID
				shopInfo: '', //微店信息
				information: [], //车辆列表
				carid: '', //点击的车辆ID
				share: '分享多辆车',
				carName: '', //搜索
				url: '', //求购估价地址
				noData: true, // 控制暂无数据显示
				listStr: 'information',
				params: {}
			};
		},
		onLoad(option) {
			this.storeId = option.storeId;
			this.params.cusId = Number(option.cusId);
			this.params.storeId = Number(option.storeId);
			// 校验当前用户是否需要授权
			uni.getStorage({
				key: 'shareParams',
				success(res) {
					if (!res.data.nickName || !res.data.avatarUrl) {
					 uni.navigateTo({
					 	url: '../shareAuth/shareAuth'
					 })	
					}
				},
				fail(err) {
					console.error(err);
					uni.navigateTo({
						url: '../shareAuth/shareAuth'
					})
				}
			})
		},
		onShow() {
			this.resetShare();
			const shareParams = uni.getStorageSync('shareParams') || {};
			// 微店信息
			storeShopInfo({
				...this.params,
				cusHead: shareParams.avatarUrl,
				cusNick: shareParams.nickName
			}).then(res => {
				this.shopInfo = res.data;
        if(!this.shopInfo.storeNotice ){
        	this.shopInfo.storeNotice  = '暂无公告'
        }
			});
			//加载车辆列表
			storeList({
				storeId: this.storeId
			}).then(reslist => {
				if (reslist.data == '') {
					this.noData = true
				} else {
					this.noData = false
				}
				this.information = reslist.data
				this.information.forEach(item => {
					if (item.carOldBoadTime) {
						item.carOldBoadTime = item.carOldBoadTime.substring(0, 4)
					}
				})
			})
		},
		methods: {
			// 1 求购  2 估价
			jumpEstimated(item) {
				if (item == 2) {
					uni.navigateTo({
						url: `../smallShop/Estimated/Estimated?cusids=${this.params.cusId}&storeId=${this.storeId}`,
					});
				} else if (item == 1) { 
					uni.navigateTo({
						url: `../smallShop/lookingFor/lookingFor?cusids=${this.params.cusId}&storeId=${this.storeId}`,
					});
				}
			},
			// 车辆详情
			jump(e) {
				this.carid = e.currentTarget.dataset.carid || e.target.dataset.carid
				uni.navigateTo({
					url: `./storeCarInfo?cusId=${this.params.cusId}&carId=${this.carid}&storeId=${this.storeId}`,
				});
			},
			// 拨打电话
			tell(item) {
				uni.makePhoneCall({
					phoneNumber: item
				});
			},
			// 搜索
			search() {
				uni.navigateTo({
					url: 'smallShopSeach?id=' + this.storeId + '&carName=' + this.carName
				})
			}
		}
	};
</script>

<style scoped lang="less">
	.shop-page {
		background-color: #F1F1F1;
		min-height: 100vh;
		position: relative;
	}

	.lefts {
		margin-left: 20upx;
	}

	/* 选择框 */
	.choose {
		width: 40upx;
		height: 40upx;
		border: 2upx solid rgba(152, 152, 152, 1);
		border-radius: 50%;
		position: absolute;
		top: 38%;
		right: 0;
	}

	.box {
		width: 100%;
		height: 182upx;
		padding: 0 24upx;
		display: flex;
		justify-content: space-between;
	}

	.box-boos {
		width: 340upx;
		height: 180upx;
		background: #ffffff;
		border-radius: 10upx;
		line-height: 180upx;
		box-shadow: 4upx 4upx 3upx #e1e2e9;
		display: flex;
		justify-content: space-between;
	}

	.box-imageOne {
		width: 120upx;
		height: 40upx;
		margin-bottom: 36upx;
	}

	.box-imageTow {
		width: 141upx;
		height: 66.6%;
		margin-top: 19%;
	}

	.box-left {
		width: 50%;
	}

	.index {
		text-align: center;
	}

	/* 头部图片 */
	.nav image {
		width: 100%;
		height: 350upx;
	}

	/* 搜索框 */
	.search {
		width: 93%;
		margin: 26upx auto;
		position: relative;
		margin-top: 60upx;
		background: #ffffff;
		box-shadow: 4upx 4upx 3upx #e3e4ea;
		border-radius: 28upx;
		padding: 0 72rpx;
	}

	.search-text {
		position: absolute;
		top: 20upx;
		left: 25upx;
		font-size: 36upx;
		color: #989898;
	}

	.input-search {
		width: 100%;
		height: 62upx;
		line-height: 62rpx;
		border-radius: 24upx;
		text-align: center;
	}

	.uni-noticebar__content-text {
		padding-top: 3upx;
	}

	.prompt {
		background: #ffffff;
		width: 100%;
		height: 100upx;
		margin: 26upx auto;
		line-height: 100upx;
	}

	.prompt-a {
		font-size: 28upx;
		color: #252525;
	}

	.prompt-b {
		margin: 0 10upx;
		font-size: 30upx;
		color: #989898;
	}

	.prompt-c {
		font-size: 24upx;
		color: #989898;
	}

	/* 在售车辆 */
	.vehicleList {
		width: 100%;
		padding: 0 24rpx;
	}

	.vehicleList-nav {
		text-align: left;
		margin-top: 25upx;
	}

	.vehicleList-nav-text {
		font-size: 34upx;
		color: #252525;
		font-weight: 600;
	}

	.vehicleList-nav-content {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.vehicleList-dart {
		width: 166upx;
		font-size: 20upx;
		color: #989898;
		margin: 12upx 0;
		display: flex;
		justify-content: space-between;
	}

	.temporarily {
		width: 100%;
		height: 300upx;
		text-align: center;
		line-height: 300upx;
		color: #989898;
	}

	.vehicleList-content {
		padding-bottom: 40upx;
	}

	// 
	.storesTitle {
		width: 94%;
		height: 130upx;
		left: 2.5%;
		position: absolute;
		top: 306upx;
		display: flex;
		justify-content: space-between;
		padding: 13upx 2%;
		background: #ffffff;
		border-radius: 10px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 3px 2px 8px 0px rgba(66, 71, 157, 0.22);
	}

	.storesTitle image {
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
	}

	.storesTitle view {
		width: 70%;
		text-align: left;
		line-height: 50upx;
	}

	.storesTitle text {
		display: block;
	}

	.vehicleListTop {
		width: 220upx;
		height: 60upx;
		background: linear-gradient(0deg, rgba(165, 123, 255, 1), rgba(107, 115, 255, 1));
		border-radius: 10upx;
		line-height: 60upx;
		color: #FFFFFF;
		text-align: center;
	}

	.vehicleList-contents {
		width: 100%;
	}
	.share-fixed-btn {
		position: fixed;
		z-index: 1000;
		right: 0;
		bottom: 20%;
		color: #fff;
		padding: 10upx 20upx;
		border-top-left-radius: 10upx;
		border-bottom-left-radius: 10upx;
		background: rgba(0, 0, 0, .5);
		.btn {
			padding: 0;
			background: none;
			font-size: 26upx;
			color: #fff;
			line-height: 100%;
		}
		.icon {
			font-size: 26upx;
			display: inline-block;
		}
	}
  .mafr-left{
  	margin-left: 14%;
  }
</style>
