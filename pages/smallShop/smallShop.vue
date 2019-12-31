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
		<view class="prompt flex align-center">
			<view style="width: 100%;">
			  <uni-notice-bar class="prompt-a" show-icon="true" scrollable="true" single="true" :text="shopInfo.storeNotice"></uni-notice-bar>
			</view>
		</view>
		<!-- 卖车估价 -->
		<view class="box">
			<view class="box-boos" @tap="jumpEstimated(2)">
				<view class="box-left">
					<image class="box-imageOne mafr-left" src="../../static/icon/zhuanye@2x.png" mode=""></image>
					<view class="mafr-left" style="font-size:34upx;font-weight:bold;">卖车估价</view>
				</view>
				<image class="box-imageTow" src="../../static/icon/maiche@2x.png" mode=""></image>
			</view>
			<view class="box-boos" @tap="jumpEstimated(1)">
				<view class="box-left">
					<image class="box-imageOne mafr-left" src="../../static/icon/shengqian@2x.png" mode=""></image>
					<view class="mafr-left" style="font-size:34upx;font-weight:bold;">求购信息</view>
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
				<view class="vehicleListTop" v-show="!noData">
					<view class="public-share-btn" @tap="choiceShare">{{ shareBtnTxt }}</view>
				</view>
			</view>
			<!--  -->
			<view class="vehicleList-content" :class="isShare? 'padbotm':''">
				<checkbox-group class="public-checkbox-list" @change="checkboxChange">
					<view class="vehicleList-contents" v-for="(item, index) in information" :key="index">
						<label class="public-checkbox" v-if="isShare">
							<checkbox :value="item.carId" :checked="item.checked" />
						</label>
						<view class="layout" @tap="jump(item)">
							<image :src="item.carImg1" mode="aspectFill"></image>
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
				<!-- #ifdef MP-WEIXIN -->
				<button type="primary" open-type="share" data-sharetype="list" :data-sharecarIds="shareCarIds" :data-storeId="storeId"
				 :disabled="isShareDisable" class="public-share-btn">分享</button>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<button type="primary" :disabled="isShareDisable" class="public-share-btn" @tap="shareCars">分享</button>
				<!-- #endif -->
			</view>
		</view>
		<view class="share-fixed-btn">
			<!--  #ifdef MP-WEIXIN -->
			<button type="primary" class="btn" data-sharetype="shop" :data-storeId="storeId" open-type="share">
				<image class="icon" src="../../static/icon/share-icon.png" mode="mode"></image>
				<text>分享微店</text>
			</button>
			<!-- #endif -->
			<!--  #ifdef APP-PLUS -->
			<button type="primary" class="btn" @tap="shareShopCars">
				<image class="icon" src="../../static/icon/share-icon.png" mode="mode"></image>
				<text>分享微店</text>
			</button>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	import uniNoticeBar from "@/components/uni-notice-bar/uni-notice-bar.vue"
	import {saveShareList} from '../../api/share.js';
	import {getUser} from '../../api/login.js';
	import {smallShop,storeList} from '../../api/smallShop.js';
	import {shareMixins} from '../../mixins/index.js'
	export default {
		components: {
			uniNoticeBar
		},
		mixins: [shareMixins],
		data() {
			return {
				storeId: '', //微店ID
				shopInfo: {}, //微店信息
				information: [], //车辆列表
				carid: '', //点击的车辆ID
				share: '分享多辆车',
				carName: '', //搜索
				url: '', //求购估价地址
				noData: true, // 控制暂无数据显示
				listStr: 'information',
				user:{}, //用户信息
				};
		},
		// #ifdef MP-WEIXIN
		onShareAppMessage(res) {
			let sharecarids = [];
			let storeId = '';
			let shareType = 'list';
			if (res.from === 'button') { // 来自页面内分享按钮
				sharecarids = res.target.dataset.sharetype === 'list' ? res.target.dataset.sharecarids.join(',') : '';
				storeId = res.target.dataset.storeid;
				shareType = res.target.dataset.sharetype;
				if (shareType === 'list') {
					saveShareList({
						shareUrl: '',
						shareType: 2,
						shareIds: sharecarids
					}).then(res => {

					})
				} else {
					saveShareList({
						shareUrl: '',
						shareType: 1,
						storeId,
					}).then(res => {

					})
				}
			}
			const userInfo = uni.getStorageSync('userInfo');
			if (shareType === 'list') {
				return {
					title: '微店车辆',
					path: '/pages/share/share?type=2' + '&shareIds=' + sharecarids + '&cusId=' + userInfo.cusId + '&storeId=' +storeId,
				}
			} else if (shareType === 'shop') {
				return {
					title: '微店详情',
					path: '/pages/share/shareShop?type=1' + '&cusId=' + userInfo.cusId + '&storeId=' + storeId
				}
			} else {
				return {}
			}
		},
		// #endif	
		onLoad(option) {
			this.storeId = option.storeId;
		},
		onShow() {
			// 获取用户信息
			uni.getStorage({
			    key: 'userInfo',
			    success:  (res)=> {
			       this.user = res.data
			    }
			});
			this.resetShare();
			// 微店信息
			smallShop({
				storeId: this.storeId
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
			// app 微店列表车辆分享
			shareCars() {
				const that = this;
				const userInfo = uni.getStorageSync('userInfo');
				let sharePath = '/pages/share/share?type=2' + '&shareIds=' + that.shareCarIds.join(',') + '&cusId='+ userInfo.cusId + '&storeId=' + that.storeId;

				// 保存分享记录
				saveShareList({shareUrl: '', shareType: 2, shareIds: that.shareCarIds.join(',') });
				uni.share({
				    provider: 'weixin',
            scene: "WXSceneSession",
				    type: 5,
				    imageUrl: 'http://img.schyxgl.com/logo2.jpg',
				    title: '车辆列表',
				    miniProgram: {
				        id: 'gh_c02989c31ca7',
				        path: sharePath,
				        type: 0,
				        webUrl: 'http://uniapp.dcloud.io'
				    },
				    success: ret => {
				    },
						fail(err) {

							utils.showTextToast('调起分享失败');
						}
				});
			},
			// app微店分享
			shareShopCars() {
				const that = this;
				const userInfo = uni.getStorageSync('userInfo');
				let sharePath = '/pages/share/shareShop?type=1' + '&cusId='+ userInfo.cusId + '&storeId=' + that.storeId;
	
				// 保存分享记录
				saveShareList({shareUrl: '', shareType: 1, storeId: that.storeId });
				uni.share({
				    provider: 'weixin',
            scene: "WXSceneSession",
				    type: 5,
				    imageUrl: 'http://img.schyxgl.com/logo2.jpg',
				    title: '微店详情',
				    miniProgram: {
				        id: 'gh_c02989c31ca7',
				        path: sharePath,
				        type: 0,
				        webUrl: 'http://uniapp.dcloud.io'
				    },
				    success: ret => {
				    },
						fail(err) {
	
							utils.showTextToast('调起分享失败');
						}
				});
			},
			// 估价
			jumpEstimated(item) {
				if(this.user.isVip){
						uni.navigateTo({
							url: '../user/Message?on=' + item,
						});
				}else{
					uni.showModal({
					    title: '提示',
					    content: '您还未开通VIP',
						confirmText: '前往开通',
					    success: function (res) {
					        if (res.confirm) {
					            uni.navigateTo({
					            	url: '../user/VIPcenter/VIPcenter',
					            });
					        }
					    }
					});
				}
				
			},
			// 车辆详情
			jump(item) {
				this.carid = item.carId;
				uni.navigateTo({
					url: `./vehicleDetails/vehicleDetails?storeId=${this.storeId}&carid=${this.carid}`
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
					url: 'smallShopSeach?id=' + this.storeId + '&&carName=' + this.carName
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
	.mafr-left{
		margin-left: 14%;
	}
	.box-imageTow {
		width: 141upx;
		height: 66.6%;
		margin-top: 17%;
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
		bottom: 60%;
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
			width: 26rpx;
			height: 26rpx;
			margin-right: 10upx;
		}
	}
	.padbotm{
		padding-bottom: 130upx;
	}
</style>
