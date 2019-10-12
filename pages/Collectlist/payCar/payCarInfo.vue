<!-- 卖车详情-->
<template>
	<view class="index">
		<!-- image 上传-->
		<view class="indexImage">
			<view class="indexImages">
				<image class="indexImages-image" :src="datas.carImg1" v-if="datas.carImg1 != '暂无'"></image>
				<view class="indexImages-a" v-else>
					<text class="iconfont iconfontsize">&#xe81a;</text>
					<text>暂无</text>
				</view>
				<text class="indexImages-title">车辆照片</text>
			</view>
			<view class="indexImages">
				<image class="indexImages-image" :src="datas.carImg2" v-if="datas.carImg2 != '暂无'"></image>
				<view class="indexImages-a" v-else>
					<text class="iconfont iconfontsize">&#xe81a;</text>
					<text>暂无</text>
				</view>
				<text class="indexImages-title">车辆照片</text>
			</view>
			<view class="indexImages">
				<image class="indexImages-image" :src="datas.carImg3" v-if="datas.carImg3 != '暂无'"></image>
				<view class="indexImages-a" v-else>
					<text class="iconfont iconfontsize">&#xe81a;</text>
					<text>暂无</text>
				</view>
				<text class="indexImages-title">车辆照片</text>
			</view>
		</view>
		<view class="index-text">车辆详情</view>
			<view class="boos-lise" style="border-bottom: solid #FFFFFF;" >
				<view class="boos-title">买主要求</view>
			</view>
      <view class="boos-text">
      	<textarea
      		type="text"
      		v-model="datas.claim"
      		maxlength="500"
          disabled=true,
      		placeholder-class="textPlaceholder"
      	/>
      </view>
			<view class="boos-lise">
				<view class="boos-title">车主联系方式</view>
				<view class="boos-picker-width" style="width: 96%;">{{datas.phone}}</view>
			</view>
			<view class="boos-lise">
				<view class="boos-title">车主期望价格</view>
				<view class="boos-picker-width">{{datas.hopePrice}}</view>
				<text class="iconfont boos-icons" style="font-size: 24upx; width: 10%;">万元</text>
			</view>
			<view class="boos-lise" >
				<view class="boos-title">成交价</view>
				<view class="boos-picker-width" style="width: 84%;">{{datas.realPrice}}</view>
        <text class="iconfont boos-icons" style="font-size: 24upx; width: 10%;">万元</text>
			</view>
		<view class="base" v-if="datas.sellStatus == '0'"><button class="base-bottow" @tap="jmup">修改</button></view>
	</view>
</template>
<script>
	import utils from '../../../utils/utils.js';
	import {sellInfo} from '../../../api/collectlist.js';
	export default {
		data() {
			return {
				id: '',
				datas: '',
			};
		},
		onLoad(query) {
			this.id = query.carId;
		},
		onShow() {
			if (this.id) {
				sellInfo({
					sellCarId: this.id
				}).then(res => {
					for (var i in res.data) {
						if (!res.data[i] && res.data[i] !== 0) {
							res.data[i] = '暂无'
						}
					}
					this.datas = res.data;
				});
			}
		},
		methods: {
			jmup() {
				uni.redirectTo({
					url: '../salecar/salecar?carId='+this.id,
				});
			}
		}
	};
</script>

<style scoped lang="less">
	.boos-title {
		color: #989898;
		width: 35%;
		
	}
	.indexImage{
		margin-top: 20upx;
	}
	.boos-picker-width{
		line-height: 100upx;
	}
	.base {
		position: fixed;
		bottom: 20upx;

		.base-bottow {
			color: #fff;
		}
	}
</style>
