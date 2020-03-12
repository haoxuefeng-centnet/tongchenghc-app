<!-- 心愿单详情 -->
<template>
	<view class="">
		<view class="nav-content">
			<view class="nav-content-boox">
				<view class="nav-content-text">
					<text class="title">车辆信息</text>
					<text class="datas">{{ageInformation.createTime}}更新</text>
				</view>
				<view class="nav-content-center">
					<view class="nav-content-centerList">
						<text class="nav-content-centerList-a">上牌日期</text>
						<text class="nav-content-centerList-b">{{registration[ageInformation.carOldBoadTime]}}</text>
					</view>
					<view class="nav-content-centerList">
						<text class="nav-content-centerList-a">车辆归属地1</text>
						<text class="nav-content-centerList-b">{{ageInformation.regionCity}}</text>
					</view>
					<view class="nav-content-centerList" >
						<text class="nav-content-centerList-a">车辆归属地2</text>
						<text class="nav-content-centerList-b">{{ageInformation.region2City}}</text>
					</view>
					<view class="nav-content-centerList">
						<text class="nav-content-centerList-a">品牌车型</text>
						<text class="nav-content-centerList-b contrue">{{ageInformation.brandSeries}}</text>
					</view>
					<view class="nav-content-centerList">
						<text class="nav-content-centerList-a">行驶里程</text>
						<text class="nav-content-centerList-b">{{ageInformation.carMileage}}</text>
					</view>
					<view class="nav-content-centerList">
						<text class="nav-content-centerList-a">车辆类型</text>
						<text class="nav-content-centerList-b">{{ageInformation.carType}}</text>
					</view>
					<!--<view class="nav-content-centerList">
						<text class="nav-content-centerList-a">车身颜色</text>
						<text class="nav-content-centerList-b">{{ageInformation.carColor}}</text>
					</view>-->
					<view class="nav-content-centerList">
						<text class="nav-content-centerList-a">变速箱</text>
						<text class="nav-content-centerList-b">{{ageInformation.carGearbox}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="base">
			<button class="base-bottow" @tap="modify"><text class="base-bottow-text">修 改</text></button>
		</view>
			<view class="bottomList-boox">
				<view class="bottomList-content" v-for="(item, index) in information" :key="index">
					<view class="bottomList-a" @tap="details(item.carId)">
						<image :src="item.carImg1"></image>
						<text class="bottomList-a-text">{{ item.brandSeries }}</text>
						<view class="">
							<text class="theprice" v-if="item.interPrice">￥{{ item.interPrice }}万</text>
							<text class="theprice" v-else>未定价</text>
							<text class="theprice-a">{{item.carOldBoadTime}}</text>
							<text class="theprice-a">{{ item.cityLocation }}</text>
						</view>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
import utils from '../../../utils/utils.js';
import { reserveInfo } from '../../../api/wishlist.js'
	export default {
		data() {
			return {
				id:'' ,//心愿单ID
				ageInformation:'' ,//页面数据
				information:'' ,//车辆列表
				registration:['不限','1年以内', '2年以内', '3年以内', '4年以内 ' , '5年以内' , '6年以内' , '6年以上'] //上牌时间
			}
		},
		onLoad(option) {
			this.id= option.reserveId
		},
		onShow() {
			// 页面信息
			reserveInfo({reserveId : this.id}).then(res =>{
				if(res.code == 200){
					this.ageInformation = res.data.reserveCarInfo
					this.information = res.data.matched 
					for(var i in this.ageInformation){
						if(!this.ageInformation[i] && this.ageInformation[i] !== 0 ){
							this.ageInformation[i] = '暂无'
						}
					}
				}
			})
		},
		methods: {
			// 车辆详情页跳转
			details(item){
				uni.navigateTo({
					url: '../../vehicleDetails/vehicleDetail?carId='+item
				});
			},
			// 修改按钮
			modify(){
				uni.navigateTo({
					url: `../Duetocollect/Duetocollect?id=${this.id}`
				});
			}
		}
	}
</script>

<style>
page{
	background-color: #F2F2F2;
}
.nav-content{
	width: 93%;
	margin: 20upx auto;
	border-radius: 10upx;
}
.base-bottow{
	color: #FFFFFF;
	background:linear-gradient(0deg,rgba(165,123,255,1),rgba(107,115,255,1));
}
</style>
