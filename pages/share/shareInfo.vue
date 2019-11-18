<!-- 分享车辆详情页 -->
<template>
	<view class="indexs">
		<!-- 头部 -->
		<view class="nav">
			<!-- 轮播图 -->
			<view>
				<swiper class="nav-swiper" :indicator-dots="false" :autoplay="true" :interval="2000" :duration="500">
          <swiper-item v-if="item" v-for="(item, index) in carPicture" :key="index">
          	<image class="swiper-item" mode="aspectFill" @tap="previewImage(index)" :src="item"></image>
          </swiper-item>
				<!-- 	<swiper-item>
						<image class="swiper-item" :src="carInfo.carImg1"></image>
					</swiper-item>
					<swiper-item>
						<image class="swiper-item" :src="carInfo.carImg2"></image>
					</swiper-item>
					<swiper-item>
						<image class="swiper-item" :src="carInfo.carImg3"></image>
					</swiper-item> -->
				</swiper>
			</view>
			<view class="nav-boox">
				<view class="nav-text nav-margin">{{carInfo.brandSeries}}</view>
				<view class="nav-content nav-margin">
					<text class="nav-content-a" style="position: relative; top: 5upx;" v-if="carInfo.interPrice">￥{{carInfo.interPrice}}万</text>
					<text class="nav-content-a" style="position: relative; top: 5upx;" v-else>未定价</text>
					<text class="nav-content-a nav-content-c" style="background:#A57BFF ;" @tap="wholesale" >查看批发价</text>
					<text class="nav-content-a nav-content-c" v-if="!carInfo.isOrder"  @tap="jumps">定金保管</text>
				</view>
				<view class="nav-location nav-margin">
					<view class="" style="margin: auto 0; font-size:28upx; color: #989898;">
						<text class="iconfont" style="margin: 0 10upx;">&#xe61e;</text>
						<text>{{carInfo.cityLocation}}</text>
					</view>
					<view class="nav-buttom"  data-target="Modal" @tap="showModal">出价</view>
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
						<text class="nav-content-centerList-b">{{ carInfo.carMieage }}</text>
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
		<view class="index-title">
			<view class="index-title-boox">
				<image :src="creater.cusAvatar"></image>
				<view class="index-title-boox-b">
					<text>{{creater.cusNick}}</text>
					<view class="">在售车源: {{carInfo.carSize}}台</view>
				</view>
				<text class="iconfont index-title-boox-a">&#xe617;</text>
			</view>
		</view>
		<!-- 底部列表 -->
		<view class="bottomList" v-show="!noData">
			<view class="bottomList-boox">
				<view class="bottomList-content" v-for="(item, index) in carList" :key="index">
          <view @tap="jump(item.carId)">
            <view class="bottomList-a">
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
						<button type="primary" @tap="jumps" class="btn" v-if="!carData.isStoreCus">签署电子合同</button>
						<button type="primary" class="btn disable" v-if="carData.isStoreCus">本人车源不可预定</button>
					</view>
					<view class="bottomList-right" v-if="carInfo.isOrder">
						<button type="primary" class="btn disable">此车已被预定</button>
					</view>
			</view>
		</view>
		<!-- 模态框 -->
		<view class="cu-modal" :class="modalName == 'Modal' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="read"><input class="pay" type="number" maxlength="9" v-model="perice" placeholder="请输入价格(万)" /></view>
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
import { platformShareInfo } from '../../api/share.js'
import utils from '../../utils/utils.js';
export default {
		data() {
			return {
				carId: null,  //车辆ID
				cusId:null,
				carInfo: '', //页面数据
				carList: '', //推广列表
				noData:true,  //控制车辆列表显示隐藏
				modalName: null,
				perice:'' ,//出价
				isVip: false  ,//是否VIP
				creater:'' ,//创建者信息
				id:'', //创建者ID
				carData: {},
        carPicture: [],
			}
		},
		onLoad(query) {
			// 车辆ID
			this.carId = Number(query.carId);
			this.cusId = Number(query.cusId);
			// 校验当前用户是否需要授权
			uni.getStorage({
				key: 'shareParams',
				success(res) {
					if (!res.data.nickName || !res.data.avatarUrl) {
					 uni.navigateTo({
					 	url: '../shareAuth/shareAuth'
					 })	
					}
				},
				fail(err) {
					console.error(err);
					uni.navigateTo({
						url: '../shareAuth/shareAuth'
					})
				}
			})
		},
		onShow() {
			// 获取ISVIP
			const userInfo = uni.getStorageSync('userInfo') || null;
			const shareParams = uni.getStorageSync('shareParams') || {};
			this.isVip = (userInfo && userInfo.isVip) ? userInfo.isVip : false
			// 车辆数据
			platformShareInfo({carId: this.carId, cusId: this.cusId, cusHead: shareParams.avatarUrl, cusNick: shareParams.nickName }).then(res => {
				if (res.code == 200) {
					this.carData = res.data;
					this.carInfo = res.data.carInfo || {};
					this.carList = res.data.matched || [];
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
			// 商户跳转 平台列表
			jumpList(){
				if(this.carInfo.carSize != 0){
					uni.navigateTo({
						url: `../vehicleDetails/searchListings/searchListings?creator=${this.carInfo.creator}&creater=${this.creater.cusAvatar}&cusNick=${this.creater.cusNick}`
					});
				}else{
					utils.showTextToast('没有车源');
				}
			},
      jump(item){
        uni.navigateTo({
          url: './shareInfo?carId='+ item
        });
      },
			hideModal(e) {
				this.modalName = null;
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target;
			},
			update() {
        if (this.perice == '') {
          utils.showTextToast('请输入成交价');
          return;
        }
        if(!/^\d+(\.\d{1,2})?$/.test(this.perice)){
          utils.showTextToast('成交价小数点后最多两位');
          return;
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
				if(this.isVip){
					uni.showModal({
						title: "当前批发价",
						content: `${this.carInfo.wholesalePrice}` ,
						confirmText: "确定"
					})
				}else{
					utils.showTextToast('你还不是VIP无法查看批发价');
					setTimeout(function() {
							uni.navigateTo({
							url: '../user/VIPcenter/VIPcenter',
						});
					}, 500);
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
</style>
