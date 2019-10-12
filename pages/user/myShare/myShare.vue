<!-- 我的分享 -->
<template>
	<view class="container">
		<scroll-view scroll-y style="height: 100%;" class="list">
			<view class="flex justify-between align-center list-item" :class="index === 0 ? 'active' : ''" v-for="(item, index) in list" :key="item.cusId">
        <image class="crown" src="../../../static/icon/huangguan.png" mode=""></image>
				<view class="insertFirst">
					<view class="insertFirst-top">
						<view class="flex justify-start align-center insertFirst-title">
							<image :src="item.cusAvatar" mode=""></image>
							<text class="tit text-ellipsis-1">{{item.cusNick}}</text>
						</view>
						<view class="insertFirst-tail">
							<text>本周分享次数 : </text>
							<text>{{item.counts || 0}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="no-more" v-if="!list.length">
				<text>没有数据了～～～</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		shareLogList
	} from '../../../api/share.js'
	export default {
		data() {
			return {
				list: []
			}
		},
		onShow() {
			shareLogList().then(res => {
				if (res.code === 200) {
					this.list = res.data || [];
				}
			})
		},
		methods: {

		}
	}
</script>

<style scoped lang="less">
 .container {
	 background: #f2f3f3;
	 height: 100vh;
 }
	.list {
		position: relative;
		padding: 0 24upx;
		.list-item {
			margin-top: 16upx;
			padding: 0 30upx;
			background: #fff;
			border-radius: 10upx;
			color: #666;
			box-shadow:3px 2px 8px 0px rgba(66,71,157,0.22);
			&.active {
				color: #fff;
					background: linear-gradient(0deg, rgba(165, 123, 255, 1), rgba(107, 115, 255, 1));
			}
		}
		.insertFirst {
			width: 100%;
			text-align: center;
			font-size: 32upx;
			.insertFirst-top {
				display: flex;
				justify-content: space-between;
				min-height: 160upx;
				.insertFirst-title {
					.tit {
						max-width: 200upx;
						display: inline-block;
						text-align: left;
					}
					image {
						width: 100upx;
						height: 100upx;
						border-radius: 50%;
						margin-right: 46upx;
					}
				}
			}

			.insertFirst-tail {
				padding-left: 30upx;
				line-height: 160upx;
			}
		}
	}

	.crown {
    width: 54rpx;
    height: 54rpx;
		position: absolute;
		top: 1.5%;
		left: 15.2%;
    z-index:10
	}
</style>
