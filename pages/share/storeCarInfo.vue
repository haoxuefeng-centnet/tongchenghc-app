<!-- 微店车辆详情 -->
<template>
	<view class="indexs" >
		<!-- 头部 -->
		<view class="nav">
			<!-- 轮播图 -->
			<view>
				<swiper
					indicator-active-color="#7975FD"
					indicator-color="#F2F2F2"
					class="nav-swiper"
					:indicator-dots="indicatorDots"
					:autoplay="autoplay"
					:interval="interval"
					:duration="duration"
				>
					<swiper-item v-if="item.url" v-for="(item, index) in shuffling" :key="index"><image class="swiper-item" mode="aspectFill" @tap="previewImage(index)" :src="item.url"></image></swiper-item>
				</swiper>
			</view>
			<view class="nav-boox">
				<view class="nav-text nav-margin">{{ageInformation.brandSeries}}</view>
				<view class="nav-content nav-margin">
					<text class="nav-content-a" style="position: relative; top: 5upx;" v-if="ageInformation.interPrice">￥{{ageInformation.interPrice}}万</text>
					<text class="nav-content-a" style="position: relative; top: 5upx;" v-else>未定价</text>
					<text class="nav-content-a nav-content-c" v-if="!ageInformation.isOrder" @tap="deposit">定金托管</text>
				</view>
				<view class="nav-location nav-margin">
					<text class="iconfont" style="margin: 0 10upx;">&#xe61e;</text>
					<text>{{ageInformation.cityLocation}}</text>
				</view>
			</view>
		</view>
		<!-- 中间位置 -->
		<view class="nav-content">
			<view class="nav-content-boox">
				<view class="nav-content-text">
					<text class="title">车辆信息</text>
					<text class="datas">{{ageInformation.updateTime}}更新</text>
				</view>
				<view class="nav-content-center">
					<view class="nav-content-centerList">
						<text class="nav-content-centerList-a">上牌日期</text>
						<text class="nav-content-centerList-b">{{ageInformation.carOldBoadTime}}</text>
					</view>
					<view class="nav-content-centerList">
						<text class="nav-content-centerList-a">排放标准</text>
						<text class="nav-content-centerList-b">{{ageInformation.carDischarge}}</text>
					</view>
					<view class="nav-content-centerList" >
						<text class="nav-content-centerList-a">行程里程</text>
						<text class="nav-content-centerList-b">{{ageInformation.carMieage}}万公里</text>
					</view>
					<view class="nav-content-centerList">
						<text class="nav-content-centerList-a">车身颜色</text>
						<text class="nav-content-centerList-b">{{ageInformation.carColor}}</text>
					</view>
					<view class="nav-content-centerList">
						<text class="nav-content-centerList-a">燃油类型</text>
						<text class="nav-content-centerList-b">{{ageInformation.fuelType}}</text>
					</view>
					<view class="nav-content-centerList">
						<text class="nav-content-centerList-a">车辆归属地</text>
						<text class="nav-content-centerList-b">{{ageInformation.cityLocation}}</text>
					</view>
				</view>
				<view class="nav-content-bottom">
					<view class="nav-content-bottomHerder">车辆描述</view>
					<text>{{ageInformation.carDescribe}}</text>
				</view>
			</view>
		</view>
		<!-- 商户名称 -->
		
		<view class="index-title">
			<view class="index-title-boox">
				<image :src="titlemsg.storePhoto"></image>
				<view class="index-title-boox-b">
					<text>{{titlemsg.storeName}}</text>
					<view class="">在售车源: {{titlemsg.carSize}}台</view>
				</view>
				<text class="iconfont index-title-boox-a">&#xe617;</text>
			</view>
		</view>
		<!-- 底部列表 -->
		<view class="bottomList">
			<view class="bottomList-boox">
				<view class="bottomList-content" v-for="(item, index) in carlist" :key="index">
					<view class="bottomList-a" :data-carid="item.carId" @tap="details">
						<image :src="item.carImg1"></image>
						<text class="bottomList-a-text">{{ item.brandSeries }}</text>
						<view class="">
							<text class="theprice" v-if="item.interPrice">￥{{ item.interPrice }}万</text>
							<text class="theprice" v-else>未定价</text>
							<text class="theprice-a">{{ item.cityLocation }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="temporarily" v-show="noData">
			暂无在售车辆...
		</view>
		<!-- 底部合同 -->
		<view class="footer-bottom">
			<view class="bottomList-bottom flex justify-between align-center">
				<view class="bottomList-left" @tap="thephone">
					<text class="iconfont" style="font-size: 50upx;">&#xe608;</text>
					<text>电话</text>
				</view>
					<view class="bottomList-right" v-if="!ageInformation.isOrder">
						<button type="primary" @tap="deposit" class="btn" v-if="!carData.isStoreCus">签署电子合同</button>
						<button type="primary" class="btn disable" v-if="carData.isStoreCus">本人车源不可预定</button>
					</view>
					<view class="bottomList-right" v-if="ageInformation.isOrder">
						<button type="primary" class="btn disable">此车已被预定</button>
					</view>
			</view>
		</view>
	</view>
</template>

<script>
import { storeCarInfo } from '../../api/share.js'
import utils from '../../utils/utils.js';
export default {
	data() {
		return {
			shuffling: [{url: ''},{url: ''},{url: ''}], //轮播图
			carlist: '', //车辆列表  
			ageInformation: '', //页面信息
			titlemsg:'', //微店标题信息
			indicatorDots: true, // 控制轮播图
			autoplay: true,
			interval: 2000,
			duration: 500,
			carids:'',  //点击当前车辆ID
			isStoreCus:'' , //是否是员工 店长进入自己微店
			noData: true, //控制暂无数据显示隐藏
			carData: {},
			fromData: {
				storeId: '', //微店ID
				carId: '' //车辆ID
			},
		};
	},
	// 获取上个页面车辆ID & 微店ID
	onLoad(option) {
		this.fromData.carId = Number(option.carId);
		this.fromData.cusId = Number(option.cusId);
		this.fromData.storeId = Number(option.storeId);
		// 校验当前用户是否需要授权
		uni.getStorage({
			key: 'shareParams',
			success(res) {
        console.log('微店车辆详情拿到的授权信息', res.data);
				if (!res.data.nickName) {
				 uni.navigateTo({
				 	url: '../shareAuth/shareAuth'
				 })	
				}
			},
			fail(err) {
				uni.navigateTo({
					url: '../shareAuth/shareAuth'
				})	
			}
		})
	},
	onShow() {
			// 请求详情页信息
		const shareParams = uni.getStorageSync('shareParams') || {};
    console.log('拿到的参数', shareParams);
		let currStoreId = shareParams.storeId || this.fromData.storeId;
		storeCarInfo({ carId: this.fromData.carId, cusId: this.fromData.cusId, storeId: currStoreId, cusHead: shareParams.avatarUrl, cusNick: shareParams.nickName }).then(res => {
			this.carlist = res.data.matched;
			if(res.data.matched ){
				this.noData = false
			}else{
				this.noData = true
			}
			this.carData = res.data;
			this.ageInformation = res.data.carInfo || {};
			this.titlemsg = res.data.storeInfo;
			this.isStoreCus = res.data.isStoreCus;
			let data = res.data.carInfo;
			// 轮播图
			this.shuffling[0].url = data.carImg1;
			this.shuffling[1].url = data.carImg2;
			this.shuffling[2].url = data.carImg3;
		});
		
	},
	methods: {
		// 点击定金托管 & 签署电子合同
		deposit(){
			if( this.isStoreCus == true ){
				utils.showTextToast('你是该店店长或员工不能进行此操作');
			}else{
				uni.navigateTo({
					url: '/pages/home/agreement?carId='+this.fromData.carId
				});
			}
		},
		// 点击商户头部
		returnstore(){
			uni.redirectTo({
				url: '/pages/smallShop/smallShop?storeId=' + this.fromData.storeId
			})
		},
		// 车辆详情
		details(e){
			this.carids = e.currentTarget.dataset.carid || e.target.dataset.carid
			uni.navigateTo({
				url: `./storeCarInfo?carId=${this.carids}`
			});
		},
		thephone(){
			if(this.isStoreCus == true){
				utils.showTextToast('你是该店店长或员工不能进行此操作');
			}else{
				uni.makePhoneCall({
					phoneNumber: `${this.ageInformation.cusPhone}` 
				});
			}
		},
    // 预览图片
    previewImage(index) {
      let list = this.shuffling.map(item => item.url);
      uni.previewImage({
        current: index,
        urls: list,
        success() {
          
        },
        fail() {
          utils.showTextToast('预览图片失败');
        }
      });
    }
	},
	
};
</script>

<style>
.temporarily{
	width: 100%;
	height: 300upx;
	text-align:center;
	line-height: 300upx;
	color: #989898;
}
.nav-location {
	width: 10%;
	color: #989898;
}
.bottomList{
	margin-bottom: 150upx;
}
</style>
