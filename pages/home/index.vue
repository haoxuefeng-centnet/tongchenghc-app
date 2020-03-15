<!-- 首页 -->
<template>
	<view class="home-page">
		<view class="index-boosList" v-if="shuffling.length">
			<view class="banner">
				<swiper class="swiper" indicator-color="rgb(255, 255, 255)" :indicator-dots="true" :autoplay="true" :interval="2000"
				 :duration="500">
					<swiper-item v-for="(item , index ) in shuffling" :key="index">
						<image :src="item"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="nav">
				<view class="" @tap="options">
					<i class="iconfont lookCar">&#xe76a;</i>
					<text>找车源</text>
				</view>
				<view class="" @tap="vehicle">
					<i class="iconfont management">&#xe60c;</i>
					<text>车辆管理</text>
				</view>
				<view class="" @tap="update">
					<i class="iconfont spread">&#xe61b;</i>
					<text>推广更新</text>
				</view>
				<view class="" @tap="customer">
					<i class="iconfont custom">&#xe66f;</i>
					<text>客户管理</text>
				</view>
				<view class="" @tap="goSmallShop">
					<i class="iconfont smallShop">&#xe645;</i>
					<text>微店</text>
				</view>
				<view class="" @tap="valence">
					<i class="iconfont valence">&#xe622;</i>
					<text>查成交价</text>
				</view>
				<view class="" @tap="collect">
					<i class="iconfont subscribe">&#xe675;</i>
					<text>预订收车</text>
				</view>
			</view>
			<view class="tool">
				<view class="titles">实用工具</view>
				<view class="tools flex flex-wrap">
					<view  class="tools-content flex" @tap="insurance">
						<view class="tools-contents flex flex-direction">
							<text class="iconfont">&#xe60f;</text>
							<text class="tools-text">车险纪录</text>
						</view>
					</view>
					<view class="tools-content flex" @tap="maintenance">
						<view class="tools-contents flex flex-direction">
							<text class="iconfont" style="font-size: 88upx;">&#xe613;</text>
							<text class="tools-text">4S维保</text>
						</view>
					</view>
					<view class="tools-content flex" @tap="capturejump">
						<view class="tools-contents flex flex-direction">
							<text class="iconfont">&#xe61d;</text>
							<text class="tools-text">违章代缴</text>
						</view>
					</view>
					<!-- <navigator class="tools-content flex" url="../utility/recognition"> -->
					<!-- <view class="tools-content flex">
						<view class="tools-contents flex flex-direction" @tap="notOpened">
							<text class="iconfont" style="font-size: 66upx;">&#xe686;</text>
							<text class="tools-text">车型识别</text>
						</view>
					</view> -->
					<!-- <view class="tools-content flex" @tap="notOpened">
						<view class="tools-contents flex flex-direction">
							<text class="iconfont">&#xe614;</text>
							<text class="tools-text">查违章</text>
						</view>
					</view> -->
		<!-- 			<view class="tools-content flex" @tap="notOpened">
						<view class="tools-contents flex flex-direction">
							<text class="iconfont">&#xe610;</text>
							<text class="tools-text">车估价</text>
						</view>
					</view> -->
				</view>
			</view>
			<view class="home-list" style="padding-bottom: 60upx;">
				<view class="titles flex justify-between"><text>推荐车辆</text><text :class="transforms !=0 ? 'transforms' :''" :style="{transform:'rotate'+'('+transforms+'deg'+')' , }"
					 class="iconfont" @tap="refreshs">&#xe635;</text></view>
				<view class="vehicleList-content">
					<view class="vehicleList-contents" v-for="(item , index) in favoriteList" :key="index">
						<view class="layout" @tap="vehicleDetails(item.carId)">
							<image :src="item.carImg1" mode="aspectFill"></image>
							<view class="layoutList">
								<text class="layoutList-a layoutList-width">{{ item.brandSeries }}</text>
								<view class="layoutList-b layoutList-width flex ">
									<text>{{ item.carOldBoadTime}}年</text>
									<text class="layoutList-e">|</text>
									<text>{{ item.carMieage }}万公里</text>
									<text class="layoutList-e">|</text>
									<text>{{ item.cityLocation }}</text>
								</view>
								<view class="layoutList-c layoutList-width">
									<view>
										<text class="layoutList-c-price" v-if="item.interPrice">￥{{ item.interPrice }}万</text>
										<text class="layoutList-c-price" v-else>未定价</text>
										<!-- <text class="layoutList-c-prices" style=" text-decoration: line-through;">{{ item.costPrice }}万</text> -->
									</view>
									<text class="layoutList-c-right layoutList-c-prices">{{item.createTime}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<ScreenLoading :isShow="isShow"></ScreenLoading>
	</view>
</template>

<script>
	import utils from '../../utils/utils.js';
	import {
		getUser
	} from '../../api/login.js'
	import {
		shuffling,
		favoriteList
	} from '../../api/home.js'
	import ScreenLoading from '../../colorui/components/screen-loading.vue'
	export default {
		data() {
			return {
				shuffling: '', //轮播图
				isShow: true,
				favoriteList: '', //猜你喜欢
				transforms: '', //角度
			};
		},
		components: {
			ScreenLoading
		},
		onLoad() {


			// 轮播图
			shuffling().then(res => {
				if (res.code == 200) {
					this.shuffling = res.data
					this.isShow = false
				}
			})
			// 猜你喜欢列表
			this.lstes()
		},
		onShow() {
			// 用户信息
			this.transforms = 0;
		},
		methods: {
			// 验证当时用户是否登陆，是否拥有微店
			isLoginUserAuth() {
				return new Promise((resolve, reject) => {
					uni.getStorage({
						key: 'userInfo',
						success: (res) => {
							resolve(res.data || {})
						},
						fail(err) {
							reject(err);
							// 未登陆
							utils.showTextToast('请先登陆');
							setTimeout(() => {
								uni.navigateTo({
									url: '../login/login'
								})
							}, 300);
						}
					})
				})
			},
			// 车辆详情
			vehicleDetails(item){
				this.isLoginUserAuth().then(res=>{
					uni.navigateTo({
						url: '../vehicleDetails/vehicleDetail?carId=' + item,
					});
				})
			},
			// 找车源
			options() {
				this.isLoginUserAuth().then(res => {
					uni.navigateTo({
						url: 'lookCar',
					});
				})
			},
			// 车辆管理
			vehicle() {
				this.isLoginUserAuth().then(res => {
					uni.navigateTo({
						url: 'manage',
					});
				})
			},
			// 推广更新
			update() {
				this.isLoginUserAuth().then(res => {
					uni.navigateTo({
						url: '../popularize/popularize',
					});
				})
			},
			// 成交价
			valence() {
				this.isLoginUserAuth().then(res => {
					uni.navigateTo({
						url: '../strikePrice/strikePrice',
					});
				})
			},
			// 客户管理
			customer() {
				this.isLoginUserAuth().then(res => {
					uni.navigateTo({
						url: '../Collectlist/customerManagement',
					});
				})
			},
			// 预定收车
			collect() {
				this.isLoginUserAuth().then(res => {
					uni.navigateTo({
						url: '../Wishlist/Wishlist',
					});
				})
			},
			// 车险
			insurance() {
				this.isLoginUserAuth().then(res => {
					uni.navigateTo({
						url: '../utility/insurance',
					});
				})
			},
			// 维保查询
			maintenance() {
				this.isLoginUserAuth().then(res => {
					uni.navigateTo({
						url: '../utility/utility',
					});
				})
			},
			// 违章代缴
			capturejump() {
				this.isLoginUserAuth().then(res => {
					//#ifdef MP-WEIXIN
					uni.navigateToMiniProgram({
						appId: 'wx6485d1f3164f18db',
						path: 'pages/index/index',
					})
					//#endif
					//#ifdef APP-PLUS
					uni.navigateTo({
						url: '../utility/Actingapture',
					});
					//#endif
				})
			},
			// 刷新
			refreshs() {
				this.lstes()
				this.transforms -= 360
			},
			// 暂未开放
			notOpened() {
				utils.showTextToast('此功能暂未开放,敬请期待');
			},
			lstes() {
				favoriteList().then(res => {
					if (res.code == 200) {
						this.favoriteList = res.data
						this.favoriteList.forEach(item => {
							item.carOldBoadTime = item.carOldBoadTime.substring(0, 4);
						});
					}
				})
			},
			goSmallShop() {
				this.isLoginUserAuth().then(res => {
					if (res.cusType !== 2 && res.storeId) {
						uni.navigateTo({
							url: '../smallShop/smallShop?storeId=' + res.storeId
						})
					} else {
						uni.showModal({
							title: '提示',
							content: '您还没有微店，将前往设置微店信息',
							success: function(data) {
								if (data.confirm) {
									uni.navigateTo({
										url: '../user/management/management'
									})
								}
							}
						});

					}
				});
			}
		},

	};
</script>

<style scoped lang="less">
	.home-page {
		margin-top: 60upx;
	}

	.home-list {
		background: #fff;
		margin-top: 28upx;
	}

	.transforms {
		transition: 1s;
	}

	.tools {
		width: 93%;
		margin: 0 auto;
		margin-top: 20upx;

		.tools-content {
			text-align: center;
			width: 25%;
			height: 150upx;

			.tools-contents {
				margin: auto;

				.iconfont {
					font-size: 75upx;
					color: #6E91FF;
				}

				.tools-text {
					margin-top: 35upx;
					font-size: 28upx;
				}
			}
		}
	}

	.index {
		padding: 0upx !important;
	}

	.index-boosList {
		background: rgba(242, 242, 242, 1);
		width: 100%;

		.banner {
			padding: 0 14upx;
			height: 330upx;
			border-radius: 10upx;
			background: #fff;

			image {
				width: 100%;
				height: 100%;
				border-radius: 10upx;
			}
		}

		.nav {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			background: #fff;
			padding-bottom: 40upx;

			i {
				font-size: 60upx;
				line-height: 20upx;
				color: #fff;
			}

			view {
				background: #fff;
				width: 186upx;
				text-align: center;
				font-size: 30upx;
				color: rgba(37, 37, 37, 1);
				line-height: 80upx;
				padding-top: 40upx;

				.iconfont {
					width: 100upx;
					height: 100upx;
					border-radius: 50%;
				}

				.lookCar {
					background: linear-gradient(0deg, rgba(255, 111, 103, 1), rgba(245, 41, 30, 1));
				}

				.management {
					background: linear-gradient(0deg, rgba(255, 156, 116, 1), rgba(245, 84, 12, 1));
				}

				.spread {
					background: linear-gradient(0deg, rgba(255, 220, 107, 1), rgba(255, 195, 0, 1));
				}

				.custom {
					background: linear-gradient(0deg, rgba(122, 152, 248, 1), rgba(54, 94, 222, 1));
				}

				.smallShop {
					background: linear-gradient(0deg, rgba(255, 220, 107, 1), rgba(255, 195, 0, 1));
				}

				.valence {
					background: linear-gradient(0deg, rgba(122, 152, 248, 1), rgba(54, 94, 222, 1));
				}

				.subscribe {
					background: linear-gradient(0deg, rgba(255, 111, 103, 1), rgba(245, 41, 30, 1));
				}

				text {
					text-align: center;
					display: block;
					font-size: 28upx;
					color: rgba(37, 37, 37, 1);
					line-height: 45upx;
				}

				image {
					width: 46upx;
					height: 46upx;
					background: fuchsia;
					border-radius: 10upx;
				}
			}
		}

		.tool {
			min-height: 150upx;
			background: #fff;
			margin-top: 28upx;
		}
	}

	.swiper {
		height: 330upx;
	}

	.titles {
		padding: 25upx;
		font-size: 34upx;
		color: rgba(37, 37, 37, 1);
		line-height: 23upx;
		font-weight: bold;
	}
</style>
