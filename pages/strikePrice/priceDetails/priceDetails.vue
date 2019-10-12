<!-- 成交价详情 -->
<template>
	<view class="collectInfo">
		<view class="index-text">车辆信息</view>
		<view class="boos-lise">
			<view class="boos-title">车身颜色</view>
			<view class="boos-lise-input">{{data.carColor}}</view>
		</view>
		<view class="boos-lise">
			<view class="boos-title">品牌车型</view>
			<view class="boos-lise-input contrue" >{{data.brandSeries}}</view>
		</view>
		<view class="boos-lise">
			<view class="boos-title">初次上牌时间</view>
			<view class="boos-lise-input" >{{data.carBoadTime}}</view>
		</view>
		<view class="boos-lise">
			<view class="boos-title">表显里程</view>
			<view class="boos-lise-input">{{data.carMileage}}</view>
			<view class="msge" >万公里</view>
		</view>
		<view class="boos-lise">
			<view class="boos-title">车辆所在地</view>
			<view class="boos-lise-input">{{data.cityLocation}}</view>
		</view>
		<view class="boos-lise">
			<view class="boos-title">使用性质</view>
			<view class="boos-lise-input" v-text="data.boadTime">{{data.carNature}}</view>
		</view>
		<view class="index-text">价格信息</view>
		<view class="boos-lise">
			<view class="boos-title">成交价</view>
			<view class="boos-lise-input">{{data.transactionPrice}}</view>
      <view class="msge" >万元</view>
		</view>
		<view class="boos-lise">
			<view class="boos-title">成交时间</view>
			<view class="boos-lise-input">{{data.createTime}}</view>
		</view>
	</view>
</template>
<script>
import { dealInfo } from '../../../api/strikePrice.js';
import utils from '../../../utils/utils.js';
export default {
	name:'checkPrice',
	data() {
		return {
			data:'',
			id:'',
		};
	},
	onLoad(query) {
		this.id=query.dealId;
	},
	onShow() {
		dealInfo({dealId:this.id}).then(res=>{
			this.data=res.data;
		})
	}
};
</script>

<style scoped lang="less">
.boos-lise-input{
	width: 53%;
	line-height: 106upx;
	overflow:hidden; 
	text-overflow:ellipsis; 
	white-space:nowrap; 
}
.boos-title{
	width: 23%;
}
.msge{
	width: 23%;
	text-align: right;
	line-height: 106upx;
	font-size:24upx;
	color:rgba(152,152,152,1);
}
</style>