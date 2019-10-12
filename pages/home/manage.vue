<!-- 管理助手 -->
<template>
	<view class="manage">
		<view class="nav">
			<view :class="{ on: status == 0 }" @tap="change(0)">未上架({{constCar.notOn || 0}})</view>
			<view :class="{ on: status == 1 }" @tap="change(1)">在售({{constCar.onSale || 0}})</view>
			<view :class="{ on: status == 2 }" @tap="change(2)">已售({{constCar.sold || 0 }})</view>
			<view :class="{ on: status == 3 }" @tap="change(3)">未同步</view>
		</view>
		<!-- <view class="navTop contents">
			<text>分享车辆</text>
			<text>分享多辆车辆</text>
		</view> -->
		<view v-show="!isShow" style="height: 100%;">
			<view class="flex justify-between">
				<view class="searchCar">
					<text class="iconfont seachImg" @tap="search">&#xe612;</text>
					<input type="text" confirm-type="search" @confirm="search()" v-model="carName" placeholder="搜索" />
				</view>
				<!-- <view class="searchCarbuttom" v-show="!isShow" v-if="status==1">
					分享多辆车
				</view> -->
			</view>
			<scroll-view scroll-y style="height: 100%;">
				<view class="vehicleList-content">
					<view class="vehicleList-contents" v-for="(item, index) in list" :key="index" @tap="jump(item.carId)">
						<view class="layout">
							<image :src="item.carImg1"></image>
							<view class="layoutList">
								<text class="layoutList-a layoutList-width maxwidth">{{ item.brandSeries }}</text>
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
<!-- 										<text class="layoutList-c-prices" style=" text-decoration: line-through;">{{ item.costPrice }}万</text>
 -->									</view>
									<button type="primary" catchtap="" data-target="Modal" @tap="showModal($event, item.carId)" v-if="status == 1 && item.isHandle && !item.isOrder"
									 class="undercarriage">
										下架
									</button>
									<text class="layoutList-c-right layoutList-c-prices" v-if="status != 1">{{item.createTime}}</text>
								</view>
								<view class="layoutList-details" catchtap="" v-if="status==1" @tap="details(item.carId,item.microShop,item.platform,item.storeId)">车辆详情</view>
							</view>
							<!-- <view class="cu-form-group" @change="CheckboxChange">
								<checkbox class='round blue' :class="checkbox[0].checked?'checked':''" :checked="checkbox[0].checked?true:false"
								 v-if="status == 1" :value="item.carId"></checkbox>
							</view> -->
							
							<view class="index-bottom">
								<view class="index-bottom-content">
									<text class="iconfont radio-icon" style="width: 30upx;color: #989898;font-size: 24upx;" v-if="item.microShop==2">&#xe75b;</text>
									<text class="iconfont radio-icon" v-if="item.microShop==1" style="width: 30upx;color: #A57BFF;font-size: 24upx;">&#xe659;</text>
									<text style="font-size:24upx;">微店</text>
									<text class="iconfont radio-icon" style="width: 30upx;color: #989898;font-size: 24upx;" v-if="item.platform==2">&#xe75b;</text>
									<text class="iconfont radio-icon" v-if="item.platform==1" style="width: 30upx;color: #A57BFF;font-size: 24upx;">&#xe659;</text>
									<text style="font-size:24upx;">平台</text>
								</view>
							</view>
						</view>
						<view class="pop" v-if="status != 1"></view>
						<view class="popCenter">
							<text class="iconfont" v-if="status == 0" :class="status == 0? 'omcolor' : ''">&#xe609;</text>
							<text class="iconfont" v-if="status == 2">&#xe602;</text>
						</view>
					</view>
					<UiLoading :loadingType="loadingType"></UiLoading>
				</view>
			</scroll-view>
		</view>
		<!-- 未同步 -->
		<view class="notSynchronized" v-show="isShow">
			<text class="iconfont noCredit">&#xe600;</text>
			<view class="">该功能暂未开通</view>
		</view>
		<!-- 没有数据 -->

		<!-- 下架 -->
		<view class="cu-modal" v-show="modalName == 'Modal'" :class="modalName == 'Modal' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="read">
					<view class="title">成交</view>
					<view class="flex justify-between align-center turnover">
						<view class="">成交价<text class="hint">*</text></view>
						<view class="flex align-center strikePrice">
							<input class="" type="digit" maxlength="9" v-model="perice" placeholder="请输入成交价(万)" />
						</view>
						<view >万元</view>
					</view>
					<view class=" flex justify-center align-center tabList-content">
						<view class="radio-item">
							<text class="iconfont radio-icon" @tap="carType" v-if="!purchase">&#xe75b;</text>
							<text class="iconfont radio-icon" style="color: #A57BFF" @tap="carType" v-if="purchase">&#xe659;</text>
							<text style="margin-left: 17upx;font-size:24upx; ;">零售</text>
						</view>
						<view class="radio-item">
							<text class="iconfont radio-icon" @tap="carType" v-if="purchase">&#xe75b;</text>
							<text class="iconfont radio-icon" style="color: #A57BFF" @tap="carType" v-if="!purchase">&#xe659;</text>
							<text style="margin-left: 17upx; font-size:24upx;;">批发</text>
						</view>
					</view>
					<view class="flex align-center justify-between name">
						<text>姓名</text>
						<view class="flex align-center justify-between strikePrice">
							<input type="text" v-model="name" placeholder="请输入姓名" />
						</view>
						<view class="placeholders"></view>
					</view>
					<view class="flex align-center justify-between name">
						<text>电话</text>
						<view class="flex align-center strikePrice">
							<input type="number" v-model="phone" placeholder="请输入电话" />
						</view>
						<view class="placeholders"></view>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action text-blue center" @tap="hideModal">取消</view>
					<view class="action text-green center" @tap="undercarriage">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {carList,below,carConst} from '../../api/home.js';
	import utils from '../../utils/utils.js';
	import {
		loadMoreList
	} from '../../mixins/index.js';
	import UiLoading from '../../colorui/components/ui-loading.vue';
	export default {
		mixins: [loadMoreList],
		components: {
			UiLoading
		},
		data() {
			return {
				carName: '',
				status: 0,
				isShow: false,
				modalName: null,
				purchase: true,
				perice: '',
				name: '',
				phone: '',
				sellType: 1,
				id: '',
				url: '',
				withs: '700', //搜索条宽度,
				allCarId: '',
				constCar: {},
				checkbox: [],
			};
		},
		onLoad() {
			this.status = 1
			this.reqFn = carList;
			this.reqValue = 'list';
			this.params.pageSizeKey = 10;
		},
		onShow() {
			this.get(this.status);
			this.getNumber()
		},
		methods: {
			carType() {
				if (this.purchase) {
					this.purchase = false;
					this.sellType = 2;
				} else {
					this.purchase = true;
					this.sellType = 1;
				}
			},
			// 获取头部数量信息
			getNumber(){
				carConst().then(res => {
					if (res.code == 200) {
						this.constCar = res.data || {};
					} else {
						utils.showTextToast(res.msg);
					}
				})
			},
			// 车辆详情页跳转
			details(carsid,shop,platform,storsid){
				if(shop==1 && platform==1){
					uni.navigateTo({
						url: '../vehicleDetails/vehicleDetail?carId='+ carsid,
					});
				}else if(shop==1 && platform==2){
					if(storsid){
						uni.navigateTo({
							url: `../smallShop/vehicleDetails/vehicleDetails?storeId=${storsid}&carid=${carsid}`
						});
					}else{
						uni.showModal({
						    title: '提示',
						    content: '你还没有微店,暂时不能查看',
							confirmText: '前往创建',
						    success: function (res) {
						        if (res.confirm) {
						           uni.navigateTo({
										url: '../user/management/management',
						           })
						        }
						    }
						});
					}
				}else if(shop==2 && platform==1){
					uni.navigateTo({
						url: '../vehicleDetails/vehicleDetail?carId='+ carsid,
					});
				}
			},
			// 详情跳转
			jump(item) {
				if (this.status == 0) {
					this.url = '../sale/sale?carId=' + item;
				} else if (this.status == 1) {
					this.url = '../sale/sale?carId=' + item;
				} else if (this.status == 2) {
					this.url = '../vehicleInformation/vehicleInformation?carId=' + item;
				}
				uni.navigateTo({
					url: this.url
				});
			},
			showModal(e, id) {
				this.modalName = e.currentTarget.dataset.target;
				this.id = id;
			},
			hideModal(e) {
				this.modalName = null;
			},
			get() {
				this.params.carStatus = this.status;
				this.params.keyword = this.carName;
				this.getList(1, () => {
					this.list.forEach(item => {
						item.carOldBoadTime = item.carOldBoadTime.substring(0, 4)
						let radio = {
							value: item.carId,
							checked: false
						};
						this.checkbox.push(radio)
					})
				});
			},
			// 搜索
			search() {
				this.get();
			},
			// 筛选
			change(item) {
				this.status = item;
				this.list = [];
				if (item == 3) {
					this.isShow = true;
				} else {
					this.isShow = false;
					this.get(this.status);
				}
			},
			// 下架
			undercarriage() {
				if (this.perice != '' ) {
          if(!/^\d+(\.\d{1,2})?$/.test(this.perice)){
                  utils.showTextToast('成交价小数点后最多两位');
                  return;
          }
					if(this.phone){
						if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone)) {
							utils.showTextToast('手机号码错误');
							return
						}
					}
					below({carId: this.id,transactionPrice: this.perice,name: this.name,phone: this.phone,sellType: this.sellType}).then(res => {
						if (res.code == 200) {
							this.modalName = null;
							this.perice = '';
							this.name = '';
							this.phone = '';
							this.get();
							this.getNumber()
						} else {
							utils.showTextToast(res.msg);
						}
					});
				} else {
					utils.showTextToast('请完善信息');
				}
			},
			// 分享
			CheckboxChange(e) {
				var items = this.checkbox
				values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].value == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
			},
		}
	};
</script>

<style scoped lang="less">
	.searchCarbuttom {
		width: 220upx;
		height: 60upx;
		margin-right: 3.5%;
		line-height: 60upx;
		text-align: center;
		background: linear-gradient(0deg, rgba(165, 123, 255, 1), rgba(107, 115, 255, 1));
		border-radius: 10upx;
		font-size: 32upx;
		color: rgba(255, 255, 255, 1);
		display: inline-block;
	}
	.manage {
		width: 100%;
		min-height: 100vh;
		background: rgba(242, 242, 242, 1);
		padding-bottom: 20upx;
		.search {
			width: 454upx;
			height: 60upx;
			background: #fff;
			margin: 0 auto;
			box-shadow: 3upx 2upx 8upx 0upx rgba(66, 71, 157, 0.22);
			border-radius: 30upx;
			display: flex;
			.seachImg {
				line-height: 60upx;
				position: relative;
				font-size: 36upx;
				left: 27upx;
			}
		}
		.searchCar {
			width: 93%;
			height: 60upx;
			background: #fff;
			margin: 0 auto;
			box-shadow: 3upx 2upx 8upx 0upx rgba(66, 71, 157, 0.22);
			border-radius: 30upx;
			display: flex;
			position: relative;
			.seachImg {
				position: absolute;
				font-size: 36upx;
				left: 27upx;
				top: 18upx;
			}
		}
input {
				width: 100%;
				height: 60upx;
				border-radius: 30upx;
				font-size: 28upx;
				margin: 0 auto;
				color: rgba(152, 152, 152, 1);
				line-height: 60px;
				text-align: center;
			}
		.radioShare {
			width: 40upx;
			height: 40upx;
			border: 2upx solid rgba(152, 152, 152, 1);
			border-radius: 50%;
			position: absolute;
			background: #fff;
			top: 68upx;
			right: 36upx;
			padding: 0;
			z-index: 999;
		}

		.active {
			background: #A57BFF;
		}

		.notSynchronized {
			position: absolute;
			top: 80upx;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			width: 200upx;
			z-index: 10;

			text {
				font-size: 180upx;
				text-align: center;
				color: #989898;
				display: block;
			}

			view {
				font-size: 26upx;
				text-align: center;
				margin-top: 60upx;
				color: rgba(152, 152, 152, 1);
			}
		}

		.nav {
			width: 100%;
			height: 70upx;
			display: flex;
			background: #fff;
			padding: 0 64upx;
			margin-bottom: 26upx;
			view {
				width: 100upx;
				flex: 1;
				height: 71upx;
				text-align: center;
				font-size: 30upx;
				color: rgba(37, 37, 37, 1);
				line-height: 70upx;
			}

			.on {
				color: #a57bff;
				border-bottom: 4upx solid #a57bff;
			}
		}
	}

	.index-bottom {
		position: absolute;
		bottom: 5upx;
		left: 0;
		font-size: 24upx;
	}

	.index-bottom-content {
		margin: 0;
		width: 27%;
	}

	.undercarriage {
		z-index: 2;
		background: linear-gradient(0deg, rgba(165, 123, 255, 1), rgba(107, 115, 255, 1));
		border-radius: 10upx;
		line-height: 50upx;
		font-size: 24upx;
		text-align: center;
		position: absolute;
		right: 0upx;
		bottom: -30upx;
	}

	.navTop {
		display: flex;
		flex-direction: row-reverse;

		text {
			width: 220upx;
			height: 60upx;
			line-height: 60upx;
			text-align: center;
			margin: 0 10upx;
			background: linear-gradient(0deg, rgba(165, 123, 255, 1), rgba(107, 115, 255, 1));
			border-radius: 10upx;
			display: block;
		}
	}

	
	

	.radio {
		width: 32upx;
		height: 32upx;
		border-radius: 50%;
		border: 2upx solid rgba(208, 208, 208, 1);
		margin-left: 17upx;
	}

	.vehicleList-contents {
		position: relative;
		height: 220upx;
	}

	// 蒙版
	.pop {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		background: rgba(255, 255, 255, 1);
		opacity: 0.63;
		border-radius: 10upx;
	}

	// 右上角
	.popCenter {
		position: absolute;
		top: 0;
		left: 0;
		margin-left: -10upx;
		margin-top: -10upx;
		font-size: 100upx;
		color: #FA2C22;
		z-index: 10;

	}

	.omcolor {
		color: #000000;
	}
	.layoutList-details{
		position: absolute;
		top: 0;
		right: 0;
		width: 130upx;
		height: 50upx;
		background:linear-gradient(0deg,rgba(165,123,255,1),rgba(107,115,255,1));
		border-radius:10upx;
		color: #FFFFFF;
		line-height: 50upx;
		text-align: center;
	}
	.maxwidth{
		max-width: 320upx;
	}
</style>
