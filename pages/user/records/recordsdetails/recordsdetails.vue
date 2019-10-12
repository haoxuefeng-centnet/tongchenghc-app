<template>
	<view>
		<view class="records">
			<view class="records-list flex flex-direction">
				<view class="recordsList flex">
					<image :src="shareDateils.sharePhoto" mode=""></image>
					<view class="text-ellipsis-1 title-name recordsList-right"><text class="text-ellipsis-1">{{shareDateils.shareName}}</text></view>
				</view>
				<view class="recordsList-bottom flex justify-between">
					<view class="flex justify-between">
						<text class="">{{shareDateils.createTime}}</text>
						<text class="" style="margin-left: 20upx;" v-if="shareDateils.shareType === 1">微店分享</text>
						<text class="" style="margin-left: 20upx;" v-if="shareDateils.shareType === 2">微店车辆分享</text>
						<text class="" style="margin-left: 20upx;" v-if="shareDateils.shareType === 3">平台车辆分享</text>
					</view>
				</view>
			</view>
		</view>
		<view class="recordsRecord flex flex-direction">
			<view class="recordsRecord-title text-left">{{browsers.length}}个客户看过</view>
			<scroll-view scroll-y style="height: 100%;">
				<view class="recordsRecord-list flex justify-between" v-for="item in browsers" :key="item.shareId">
					<view class="text-ellipsis-1 recordsRecord-left flex">
						<image style="margin: auto 0;" :src="item.cusHead" mode=""></image>
						<text style="margin:0 10upx; max-width: 300upx; line-height: 1.5;" class="text-ellipsis-1">{{item.cusNick}}</text>
					</view>
					<view class="recordsRecord-right" style="margin: auto 0;">
						<text>{{item.visitTime}}</text>
					</view>
				</view>
			</scroll-view>
			<view class="no-more" v-if="!browsers.length">
				<text>暂无浏览记录～</text>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		shareInfo
	} from '../../../../api/share.js'
	export default {
		data() {
			return {
				shareDateils: {},
				browsers: []
			};
		},
		onLoad(route) {
			shareInfo({
				shareId: route.shareId
			}).then(res => {
				if (res.code === 200) {
					this.shareDateils = res.data.share;
					this.browsers = res.data.browsers;
				}
			})
		},
		methods: {}
	};
</script>
<style lang="less">
	page {
		background-color: #f2f2f2;
	}

	.active {
		height: 230upx;
	}

	.recordsRecord {
		width: 93%;
		margin: 20upx auto;
		border-radius: 10upx;
		background: #FFFFFF;

		.recordsRecord-title {
			height: 90upx;
			line-height: 90upx;
			font-size: 30upx;
			font-weight: bold;
			color: rgba(37, 37, 37, 1);
			border-bottom: 1upx solid #F2F2F2;
			padding-left: 5%;
		}

		.recordsRecord-list {
			width: 100%;
			height: 90upx;
			line-height: 90upx;
			padding: 0 5%;

			.recordsRecord-left {
				align-items: center;

				image {
					width: 70upx;
					height: 70upx;
					border-radius: 50%;
				}

				text {
					font-size: 36upx;
					color: rgba(37, 37, 37, 1);
				}
			}

			.recordsRecord-right {
				font-size: 28upx;
				color: rgba(152, 152, 152, 1);
			}
		}
	}

	.records {
		width: 93%;
		overflow: hidden;
		margin: 10upx auto;
		background: rgba(255, 255, 255, 1);
		border-radius: 10upx;
		transition: 1s;
	}

	.iconfont {
		font-size: 33upx;
	}

	.records-list {
		width: 100%;
		border-bottom: 2upx solid #f2f2f2;

		.recordsList {
			width: 93%;
			height: 100upx;
			line-height: 100upx;
			margin: 31upx auto 0;
			padding: 0 5%;
			background: rgba(242, 242, 242, 1);
			border-radius: 10upx;
			flex-direction: row;

			image {
				width: 80upx;
				height: 80upx;
				border-radius: 10upx;
				margin: auto 0;
				background-color: black;
			}

			view {
				line-height: 100upx;
				margin-left: 20upx;
			}
		}
	}

	.recordsList-bottom {
		padding: 0 2%;
		line-height: 100upx;
		color: #989898;
		font-size: 26upx;

		view {
			image {
				width: 36upx;
				height: 36upx;
				border-radius: 50%;
				margin: auto 0;
			}

			text {
				line-height: 100upx;
			}
		}
	}
	.title-name {
		width: 500upx;
		text {
			max-width: 500upx;
			display: inline-block;
		}
	}
	.recordsList-right{
		max-width: 500upx;
	}
</style>
