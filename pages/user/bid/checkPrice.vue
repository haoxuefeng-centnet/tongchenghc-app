<!-- 查看出价详情 -->
<template>
	<view class="indexs">
		<!-- 头部 -->
		<view class="nav">
			<!-- 轮播图 -->
			<view>
				<swiper indicator-active-color="#7975FD" indicator-color="#F2F2F2" class="nav-swiper" :indicator-dots="indicatorDots"
				 :autoplay="true" :interval="2000" :duration="500">
					<swiper-item>
						<image class="swiper-item" :src="data.carImg1"></image>
					</swiper-item>
					<swiper-item>
						<image class="swiper-item" :src="data.carImg2"></image>
					</swiper-item>
					<swiper-item>
						<image class="swiper-item" :src="data.carImg3"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="nav-boox">
				<view class="nav-text nav-margin">{{ data.brandSeries }}</view>
				<view class="nav-content nav-margin">
					<text class="nav-content-a" style="position: relative; top: 10upx;">￥{{ data.carMileage }}万</text>
				</view>
				<view class="nav-location nav-margin">
					<view class="" style="margin: 10upx 0; font-size:28upx; color: #989898;">
						<text class="iconfont" style="margin: 0 10upx;">&#xe61e;</text>
						<text>{{ data.cityLocation }}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 中间位置 -->
		<view class="nav-content">
			<view class="nav-content-boox">
				<view class="nav-content-text">
					<text class="title">车辆信息</text>
					<text class="datas">{{data.updateTime}}更新</text>
				</view>
				<view class="nav-content-center">
					<view class="nav-content-centerList">
						<text class="nav-content-centerList-a">上牌日期</text>
						<text class="nav-content-centerList-b">{{data.carOldBoadTime ? data.carOldBoadTime : '暂无'}}</text>
					</view>
					<view class="nav-content-centerList">
						<text class="nav-content-centerList-a">排放标准</text>
						<text class="nav-content-centerList-b">{{data.carDischarge ? data.carDischarge : '暂无'}}</text>
					</view>
					<view class="nav-content-centerList">
						<text class="nav-content-centerList-a">行驶里程</text>
						<text class="nav-content-centerList-b">{{ data.carMileage ? data.carMileage : '暂无' }}</text>
					</view>
					<view class="nav-content-centerList">
						<text class="nav-content-centerList-a">车辆颜色</text>
						<text class="nav-content-centerList-b">{{ data.carColor ? data.carColor : '暂无'}}</text>
					</view>
					<view class="nav-content-centerList">
						<text class="nav-content-centerList-a">燃油类型</text>
						<text class="nav-content-centerList-b">{{ data.fuelType ? data.fuelType : '暂无' }}</text>
					</view>
					<view class="nav-content-centerList">
						<text class="nav-content-centerList-a">车辆归属地</text>
						<text class="nav-content-centerList-b">{{ data.cityLocation ? data.cityLocation : '暂无' }}</text>
					</view>
				</view>
				<view class="nav-content-bottom">
					<view class="nav-content-bottomHerder">车辆描述</view>
					<text>{{ data.carDescribe }}</text>
				</view>
			</view>
		</view>
		<!-- 出价列表 -->
		<view class="nav-footer">
			<view class="nav-footer-box">
				<view class="nav-footer-title">出价列表</view>
				<view class="nav-footer-text" style="color: #989898;">
					<text>出价人</text>
					<text style="width: 70%;">联系方式</text>
					<text>出价</text>
				</view>
				<view class="nav-footer-text" v-for="(item, index) in bidData" :key="index">
					<text>{{ item.cusNick }}</text>
					<text style="width: 70%;">{{ item.phone }}</text>
					<text>￥{{ item.price }}万</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		bidInfo
	} from '../../../api/user.js';
	import utils from '../../../utils/utils.js';
	export default {
		name: 'checkPrice',
		data() {
			return {
				data: '',
				id: '',
				bidData: []
			};
		},
		onLoad(query) {
			this.id = query.carId;
		},
		onShow() {
			bidInfo({
				carId: this.id
			}).then(res => {
				this.data = res.data.carInfo;
				this.bidData = res.data.cusBids;
			});
		}
	};
</script>
<style>
	.nav-footer {
		width: 100%;
		background: #ffffff;
	}

	.nav-footer-box {
		width: 93.3%;
		margin: 0 auto;
	}

	.nav-footer-title {
		width: 100%;
		text-align: left;
		padding: 20upx 0;
		font-size: 32upx;
		font-weight: bold;
		border-bottom: 1upx solid #f2f2f2;
	}

	.nav-footer-text {
		width: 100%;
		padding: 15upx 10%;
		display: flex;
		font-size: 26upx;
		justify-content: space-between;
	}

	.nav-footer-text text {
		width: 26%;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
