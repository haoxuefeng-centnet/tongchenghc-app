<!--个人平台列表 -->
<template>
	<view>
		<view class="heder flex justify-between">
			<!-- <view class="flex justify-between header">
				<image :src="cusAvatar"></image>
				<text>{{cusNick}}</text>
			</view> -->
			<view class=""></view>
			<view class="public-share-btn" style="padding: 0 20upx;" @tap="choiceShare(list)">{{ shareBtnTxt }}</view>
		</view>
		<checkbox-group class="public-checkbox-list" @change="checkboxChange">
			<scroll-view scroll-y style="height: 100%;">
			<view class="vehicleList-content" v-for="(item , index) in list" :key="index">
					<view class="vehicleList-contents" @tap="jump(item)">
						<label class="public-checkbox" v-if="isShare">
							<checkbox :value="item.carId" :checked="item.checked" catchtap="" />
						</label>
						<view class="layout">
							<image :src="item.carImg1"></image>
							<view class="layoutList">
								<text class="layoutList-a layoutList-width">{{ item.brandSeries }}</text>
								<view class="layoutList-b layoutList-width  ">
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
										<!-- <text class="layoutList-c-prices" style=" text-decoration: line-through;" v-if="item.costPrice">{{ item.costPrice }}万</text>
										<text class="layoutList-c-prices" style=" text-decoration: line-through;" v-else>未定价</text> -->
									</view>
									<text class="layoutList-c-right layoutList-c-prices">{{item.createTime}}</text>
								</view>
								<view class="choose" v-show="isArea"></view>
							</view>
						</view>
					</view>
			</view>
			</scroll-view>
		</checkbox-group>
		<UiLoading :loadingType="loadingType"></UiLoading>
		<view class="place" v-show="isShare">
			
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
				<button type="primary" open-type="share" :data-sharecarIds="shareCarIds" :disabled="isShareDisable" class="public-share-btn">分享</button>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<button type="primary" :disabled="isShareDisable" class="public-share-btn" @tap="shareCars()">分享</button>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
	import {cuscarList} from '../../../api/home.js'
	import {loadMoreList} from '../../../mixins/index.js';
	import UiLoading from '../../../colorui/components/ui-loading.vue';
	import {saveShareList} from '../../../api/share.js';
	import {shareMixins} from '../../../mixins/index.js';
	export default {
		mixins: [loadMoreList, shareMixins],
		components: {UiLoading},
		data() {
			return {
				creator: '', //创建人
				cusAvatar: '', //头像
				cusNick: '', //用户昵称
			}
		},
		// #ifdef MP-WEIXIN
		onShareAppMessage(res) {
			let sharecarids = [];
			if (res.from === 'button') { // 来自页面内分享按钮
				sharecarids = res.target.dataset.sharecarids.join(',');
				saveShareList({
					shareUrl: '',
					shareType: 3,
					shareIds: sharecarids
				}).then(res => {
				})
			}
			const userInfo = uni.getStorageSync('userInfo');
			return {
				title: '车辆列表',
				path: '/pages/share/share?type=3' + '&shareIds=' + sharecarids + '&cusId=' + userInfo.cusId
			}
		},
		// #endif
		onLoad(option) {
			this.reqFn = cuscarList;
			this.reqValue = 'list';
			this.params.pageSizeKey = 30;
			this.params.creator = option.creator;
			this.cusAvatar = option.creater
			this.cusNick = option.cusNick
      this.callback = data => {
      	data.forEach(item => {
      		item.carOldBoadTime = item.carOldBoadTime.substring(0, 4);
      	});
      	this.list = data
      }
		},
		onShow() {
			this.resetShare();
			this.getList();
		},
		methods: {
			jump(item) {
				uni.navigateTo({
					url: '../vehicleDetail?carId=' + item.carId
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F1F1F1;
	}

	/* 分享选择底部 */
	.bottomChoice {
		width: 100%;
		padding: 0 5%;
		height: 98upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 3upx 2upx 8upx 0upx rgba(66, 71, 157, 0.22);
		margin-top: 55upx;
	}

	.on {
		width: 160upx !important;
	}

	.bottomChoice-left {
		height: 100%;
		align-items: center;

		.chooses {
			width: 40upx;
			height: 40upx;
			border: 2upx solid rgba(152, 152, 152, 1);
			border-radius: 50%;
		}

		.bottomChoice-last {
			width: 140upx;
			height: 60upx;
			background: linear-gradient(0deg, rgba(165, 123, 255, 1), rgba(107, 115, 255, 1));
			border-radius: 10upx;
			font-size: 32upx;
			color: rgba(255, 255, 255, 1);
			line-height: 60upx;
		}

		text {
			font-size: 30upx;
			color: rgba(37, 37, 37, 1);
		}

	}

	.heder {
		width: 93%;
		height: 60upx;
		margin: 16upx auto;

		.header {
			padding: 0 2%;
			height: 60upx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 3upx 2upx 8upx 0upx rgba(66, 71, 157, 0.22);
			border-radius: 10upx;
			align-items: center;

			image {
				width: 40upx;
				height: 40upx;
				border-radius: 50%;
			}

			text {
				font-size: 32upx;
				margin-left: 20upx;
				margin-top: 5upx;
			}
		}

		.heder-bottom {
			width: 220upx;
			height: 60upx;
			background: linear-gradient(0deg, rgba(165, 123, 255, 1), rgba(107, 115, 255, 1));
			border-radius: 10upx;
			font-size: 32upx;
			text-align: center;
			line-height: 60upx;
			color: #ffffff;
		}
	}
	.place{
		height: 120upx;
	}
</style>
