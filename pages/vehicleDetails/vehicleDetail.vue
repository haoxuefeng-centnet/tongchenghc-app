<!-- 车辆详情页 -->
<template>
	<view class="indexs">
		<!-- 头部 -->
		<view class="nav">
			<!-- 轮播图 -->
			<view>
				<swiper class="nav-swiper" :indicator-dots="false" :autoplay="true" :interval="2000" :duration="500">
					<swiper-item v-for="(item, index) in carPicture" :key="index">
						<image class="swiper-item" mode="aspectFill" @tap="previewImage(index)" :src="item"></image>
					</swiper-item>
				<!-- 	<swiper-item>
						<image class="swiper-item" mode="scaleToFill" :src="carInfo.carImg2"></image>
					</swiper-item>
					<swiper-item>
						<image class="swiper-item" mode="scaleToFill" :src="carInfo.carImg3"></image>
					</swiper-item> -->
				</swiper>
			</view>
			<view class="nav-boox">
				<view class="nav-text nav-margin">{{carInfo.brandSeries}}</view>
				<view class="nav-content nav-margin flex justify-between">
					<view class="nav-left flex justify-start">
						<text class="nav-content-a" style="position: relative; top: 5upx;" v-if="carInfo.interPrice">￥{{carInfo.interPrice}}万</text>
						<text class="nav-content-a" style="position: relative; top: 5upx;" v-else>未定价</text>
						<text class="nav-content-a nav-content-c" style="background:#A57BFF ;" @tap="wholesale" >查看批发价</text>
						<text class="nav-content-a nav-content-c" v-if="!carInfo.isOrder"  @tap="jumps">定金保管</text>
					</view>
					<view class="nav-right">
					<!--  #ifdef MP-WEIXIN -->
						<button type="primary" class="public-share-btn small" :data-sharecarids="carId" open-type="share">分享</button>
						<!-- #endif -->
						<!--  #ifdef APP-PLUS -->
							<button type="primary" class="public-share-btn small" @tap="appShareFriend">分享</button>
							<!-- #endif -->
					</view>
				</view>
				<view class="nav-location nav-margin">
					<view class="" style="margin: auto 0; font-size:28upx; color: #989898;">
						<text class="iconfont" style="margin: 0 10upx;">&#xe61e;</text>
						<text>{{carInfo.cityLocation}}</text>
					</view>
					<view class="nav-buttom"  data-target="Modal" @tap="showModal" v-if="!carData.isStoreCus">出价</view>
					<view class="nav-buttom gray" v-if="carData.isStoreCus">出价</view>
				</view>
			</view>
		</view>
		<!-- 中间位置 -->
		<view class="nav-content">
			<view class="nav-content-boox">
				<view class="nav-content-text">
					<text class="title">车辆信息</text>
					<text class="datas">{{carInfo.updateTime}}更新</text>
				</view>
				<view class="nav-content-center">
					<view class="nav-content-centerList">
						<text class="nav-content-centerList-a">上牌日期</text>
						<text class="nav-content-centerList-b">{{ carInfo.carOldBoadTime }}</text>
					</view>
					<view class="nav-content-centerList">
						<text class="nav-content-centerList-a">排放标准</text>
						<text class="nav-content-centerList-b">{{ carInfo.carDischarge }}</text>
					</view>
					<view class="nav-content-centerList">
						<text class="nav-content-centerList-a">行驶里程</text>
						<text class="nav-content-centerList-b">{{ carInfo.carMieage }}万公里</text>
					</view>
					<view class="nav-content-centerList">
						<text class="nav-content-centerList-a">车辆颜色</text>
						<text class="nav-content-centerList-b">{{ carInfo.carColor }}</text>
					</view>
					<view class="nav-content-centerList">
						<text class="nav-content-centerList-a">燃油类型</text>
						<text class="nav-content-centerList-b">{{ carInfo.fuelType }}</text>
					</view>
					<view class="nav-content-centerList">
						<text class="nav-content-centerList-a">车辆归属地</text>
						<text class="nav-content-centerList-b">{{ carInfo.cityLocation }}</text>
					</view>
				</view>
				<view class="nav-content-bottom">
					<view class="nav-content-bottomHerder">车辆描述</view>
					<text>{{carInfo.carDescribe}}</text>
				</view>
			</view>
		</view>
		<!-- 商户名称 -->
		<view class="index-title" @tap="jumpList">
			<view class="index-title-boox">
				<image :src="creater.cusAvatar"></image>
				<view class="index-title-boox-b">
					<text class="contrues contrue">{{creater.cusNick}}</text>
					<view class="">在售车源: {{carInfo.carSize}}台</view>
				</view>
				<text class="iconfont index-title-boox-a">&#xe617;</text>
			</view>
		</view>
		<!-- 底部列表 -->
		<view class="bottomList" v-show="!noData">
			<view class="bottomList-boox">
				<view class="bottomList-content" v-for="(item, index) in carList" :key="index">
					<navigator hover-class="none" :url="'../vehicleDetails/vehicleDetail?carId='+item.carId">
					<view class="bottomList-a">
						<image :src="item.carImg1"></image>
						<text class="bottomList-a-text">{{ item.brandSeries }}</text>
						<view class="">
							<text class="theprice" v-if="item.interPrice">￥{{ item.interPrice }}万</text>
							<text class="theprice" v-else>未定价</text>
							<text class="theprice-a">{{ item.cityLocation }}</text>
						</view>
					</view>
					</navigator>
				</view>
			</view>
		</view>
		<view class="temporarily" v-show="noData">
			暂无数据...
		</view>
		<!-- 底部 -->
		<view class="footer-bottom">
			<view class="bottomList-bottom flex justify-between align-center">
				<view class="bottomList-left" @tap="thephone">
					<text class="iconfont" style="font-size: 50upx;">&#xe608;</text>
					<text>电话</text>
				</view>
					<view class="bottomList-right" v-if="!carInfo.isOrder">
						<button type="primary" @tap="jumps" class="btn"  v-if="!carData.isStoreCus">签署电子合同</button>
						<button type="primary" class="btn disable" v-if="carData.isStoreCus">本人车源不可预定</button>
					</view>
					<view class="bottomList-right" v-if="carInfo.isOrder">
						<button type="primary" class="btn disable">此车已被预定</button>
					</view>
			</view>
		</view>
		<!-- 模态框 -->
		<view class="cu-modal"  v-if="modalName=='Modal'" :class="modalName == 'Modal' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="pay flex justify-between align-center">
					<input class="inputs" type="digit" maxlength="10" v-model="perice" placeholder="请输入价格(万)" />
				</view>
				<view class="cu-bar bg-white">
					<view class="action text-blue center" @tap="hideModal">取消</view>
					<view class="action text-green center" @tap="update">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import { bidSave } from '../../api/user.js';
import { saveShareList } from '../../api/share.js';
import { findCarInfo } from '../../api/home.js';
import utils from '../../utils/utils.js';
export default {
		data() {
			return {
				carId: '',  //车辆ID
				carInfo: '', //页面数据
				carData: {},
				carList: '', //推广列表
				noData:true,  //控制车辆列表显示隐藏
				modalName: null,
				perice:'' ,//出价
				isVip: ''  ,//是否VIP
				creater:'' ,//创建者信息
				id:'' ,//创建者ID
        carPicture: [],
			}
		},
		onLoad(query) {
			// 车辆ID
			this.carId = query.carId
			uni.hideShareMenu();
		},
		// #ifdef MP-WEIXIN
		onShareAppMessage(res) {
			let sharecarids = ''
			if (res.from === 'button') { // 来自页面内分享按钮
				sharecarids = res.target.dataset.sharecarids;
				saveShareList({shareUrl: '', shareType: 3, shareIds: sharecarids }).then(res => {
				})
			}
			const userInfo = uni.getStorageSync('userInfo');
			return {
				title: '平台车辆详情',
				path: '/pages/share/shareInfo?carId=' + sharecarids + '&cusId='+ userInfo.cusId
			}
		},
		// #endif
		onShow() {
			// 获取ISVIP
			uni.getStorage({
				key: 'userInfo',
				success: (res =>{
					this.isVip = res.data.isVip
					this.id = res.data.cusId
				}) 
			});
			// 车辆数据
			findCarInfo({carId: this.carId}).then(res => {
				if (res.code == 200) {
					this.carData = res.data;
					this.carInfo = res.data.carInfo;
					this.carList = res.data.matched;
					this.creater = res.data.creater;
          this.carPicture= [this.carInfo.carImg1, this.carInfo.carImg2, this.carInfo.carImg3];
					if(this.carList.length == 0){
						this.noData = true
					}else{
						this.noData = false
					}
				}
			})
		},
		methods:{
			// app分享给好友
			appShareFriend() {
				const that = this;
				let sharePath = '/pages/share/shareInfo' + '?' + 'carId=' + that.carId + '&cusId='+ this.id;
				// 保存分享记录
				saveShareList({shareUrl: '', shareType: 3, shareIds: that.carId });
				uni.share({
				    provider: 'weixin',
				    type: 5,
				    imageUrl: 'http://img.schyxgl.com/IOSshare.png',
				    title: '平台车辆详情',
				    miniProgram: {
				        id: 'gh_628d05d77557',
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
			// 商户跳转 平台列表
			jumpList(){
				if(this.carInfo.carSize != 0){
					uni.navigateTo({
						// url: 'searchListings/searchListings?creator='+this.carInfo.creator,
						url: `searchListings/searchListings?creator=${this.carInfo.creator}`
					});
				}else{
					utils.showTextToast('没有车源');
				}
			},
			hideModal(e) {
				this.modalName = null;
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target;
			},
			update() {
				if (this.perice == '') {
					utils.showTextToast('请输入价格)');
          return
				} else if(!/^\d+(\.\d{1,2})?$/.test(this.perice)){
					utils.showTextToast('价格小数点后保留两位');
          return
				}
        bidSave({ binPrice: this.perice, carId: this.carId }).then(res => {
        	if (res.code == 200) {
        		utils.showTextToast('已出价');
        		this.modalName = null;
        		this.perice = '';
        	} else {
        		utils.showTextToast(res.msg);
        	}
        });
			},
			// 电子合同
			jumps(){
				if(this.carInfo.creator == this.id){
					utils.showTextToast('属于自己的车辆不能进行该操作');
				}else{
					if(this.carInfo.isOrder == 1){
						utils.showTextToast('定金已保管');
					}else{
						uni.navigateTo({
							url: '../home/agreement?carId='+this.carId,
						});
					}
				}
			},
			//查看批发价
			wholesale(e){
				if(this.carInfo.creator == this.id){
					uni.showModal({
						title: "当前批发价为",
						content: `￥ ${this.carInfo.wholesalePrice} 万元` ,
					})
				}else{
					if(this.isVip == true ){
						uni.showModal({
							title: " 当前批发价",
							content: `￥ ${this.carInfo.wholesalePrice} 万元` ,
							confirmText: "确定"
						})
					}else{
						uni.showModal({
							title: "提示",
							content: '你还不是VIP,无法查看' ,
							confirmText: "前往购买",
							success: function (res) {
							    if (res.confirm) {
									uni.navigateTo({
										url: '../user/VIPcenter/VIPcenter',
									});
							    }
							}
						})
					}
				}
			},
			//打电话
			thephone(){
				uni.makePhoneCall({
					phoneNumber: `${this.carInfo.cusPhone}` 
				});
			},
      // 预览图片
     previewImage(index) {
       uni.previewImage({
         current: index,
         urls: this.carPicture,
         success() {
           
         },
         fail() {
           utils.showTextToast('预览图片失败');
         }
       });
     }
		}
	}
</script>
<style scoped lang="less">
	.indexs {
		padding-bottom: 7.5%;
	}

	.bottomList-boox {
		margin-bottom: 80upx;
	}
	.gray{
		background: #999;
	}
	.indexs {
		background: #f1f1f1;
	}
	.temporarily{
		width: 100%;
		height: 300upx;
		text-align:center;
		line-height: 300upx;
		background: rgb(255,255,255);
		color: #989898;
	}
	.bottomList-right {
		.btn {
			letter-spacing : 20upx; text-align: center; margin: auto; 
		}
	}
	.inputs{
		width: 100%;
		line-height: 28upx;
		font-size: 28upx;
		display: inline-block;
	}
	.pay{
		text-align: center;
	}
	.contrues{
		display: block;
		max-width: 400upx;
		line-height: 38upx;
	}
</style>
