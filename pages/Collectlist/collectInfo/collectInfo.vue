<!-- 收车详情 -->
<template>
	<view class="index">
		<view class="indexImage">
			<view class="indexImages">
				<image class="indexImages-image" :src="data.carImg1" v-if="data.carImg1 != '暂无'"></image>
				<view class="indexImages-a" v-else>
					<text class="iconfont iconfontsize">&#xe81a;</text>
					<text>暂无</text>
				</view>
				<text class="indexImages-title">车辆照片</text>
			</view>
			<view class="indexImages">
				<image class="indexImages-image" :src="data.carImg2"  v-if="data.carImg2 != '暂无'"></image>
				<view class="indexImages-a" v-else>
					<text class="iconfont iconfontsize">&#xe81a;</text>
					<text>暂无</text>
				</view>
				<text class="indexImages-title">车辆照片</text>
			</view>
			<view class="indexImages">
				<image class="indexImages-image" :src="data.carImg3" v-if="data.carImg3 != '暂无'"></image>
				<view class="indexImages-a" v-else>
					<text class="iconfont iconfontsize">&#xe81a;</text>
					<text>暂无</text>
				</view>
				<text class="indexImages-title">车辆照片</text>
			</view>
		</view>
		<view class="index-text">基本信息</view>
		<view class="boos-lise">
			<view class="boos-title">车身颜色</view>
			<view class="boos-picker-width" >{{data.carColour}}</view>
			<text class="iconfont boos-icons">&#xe627;</text>
		</view>
		<view class="boos-lise">
			<view class="boos-title">品牌车型</view>
			<view class="boos-picker-width contrue" >{{data.carType}}</view>
			<text class="iconfont boos-icons">&#xe627;</text>
		</view>
		<view class="boos-lise">
			<view class="boos-title">出厂日期</view>
			<view class="boos-picker-width" >{{data.factoryTime}}</view>
			<text class="iconfont boos-icons">&#xe627;</text>
		</view>
		<view class="boos-lise">
			<view class="boos-title">上户时间</view>
			<view class="boos-picker-width" >{{data.boadTime}}</view>
			<text class="iconfont boos-icons">&#xe627;</text>
		</view>
		<view class="boos-lise" style="border-bottom: solid #FFFFFF;">
			<view class="boos-title">描述</view>
			
		</view>
    <view class="boos-text">
    	<textarea
    		type="text"
    		v-model="data.description"
    		maxlength="500"
        disabled=true,
    		placeholder-class="textPlaceholder"
    	/>
    </view>
		<view class="boos-lise">
			<view class="boos-title">车主联系方式</view>
			<view class="boos-picker-width" style="width: 91%;" >{{data.phone}}</view>
		</view>
		<view class="boos-lise">
			<view class="boos-title">车主期望价格</view>
			<view class="boos-picker-width" style="width: 76%;" >{{data.hopePrice}}</view>
			<text class="iconfont boos-icons" style="font-size: 24upx; width: 14%;">万元</text>
		</view>
    <view class="boos-lise">
    	<view class="boos-title">成交价</view>
    	<view class="boos-picker-width" style="width: 76%;">{{data.clinchPrice}}</view>
      <text class="iconfont boos-icons" style="font-size: 24upx; width: 14%;">万元</text>
    </view>
		<view class="base" v-if="data.buyStatus == 0 " @tap="Modify"><button class="base-bottow">修 改</button></view>
	</view>
</template>

<script>
import utils from '../../../utils/utils.js';
import { Info } from '../../../api/collectlist.js';
export default {
	data() {
		return {
			id: '',
			data: '',
			type: '',
		};
	},
	onLoad(query) {
		this.id = query.id;
	},
	onShow() {
		Info({ buyCarId: this.id }).then(res => {
			this.data = res.data;
			for(var i in this.data){
				if(!this.data[i] && this.data[i] !== 0){
					this.data[i] = '暂无'
				}
			}
		});
	},
	methods: {
		Modify() {
			uni.redirectTo({
				url: '../collectNew/collectNew?id=' + this.id 
			});
		}
	}
};
</script>

<style>
.boos-title{
	width: 35%;
}
.boos-picker-width{
	line-height: 100upx;
}
.base{
	margin: 20rpx 0;
}
.indexImage{
	margin-top: 20upx;
}
.index{
  padding-bottom: 30rpx;
}
</style>
