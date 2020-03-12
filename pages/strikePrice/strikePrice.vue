<!-- 成交价查询 -->
<template>
	<view>
		<form>
			<!--<view class="flex align-center boos-lise" style="margin-bottom: 20upx;">
				<view class="boos-title">车身颜色<text class="hint">*</text></view>
				<view class="boos-nvget" style=" font-size: 30upx; line-height: 100upx;">{{formData.carColor}}</view>
			</view>
			<view class="boox-title">
				<scroll-view class="boox-title-background" scroll-with-animation="true" scroll-x="true">
					<view class="boox-title-background-view" :class="{on:TabCur==index,borderred:index==0&&TabCur!=index}" v-for="(item,index) in backgrounds"
					 :style="'background:'+item.color+';'" :key="index" @tap="tabSelect(item.text,index)" :data-id="index">
					</view>
				</scroll-view>
			</view>
			-->
			<view class="boos-lise" style="border-top: 1px solid #f3f3f3; margin-top: 30upx;">
				<view class="boos-title">品牌车型</view>
				<navigator hover-class="none" class="boos-nvget" url="../modelsChoose/brand">
					<view class="nvgetboos contrue" :class="formData.brandSeries =='' ? 'active' : ''">{{formData.brandSeries!=""?formData.brandSeries:'请选择'}}</view>
					<text class="iconfont boos-icons" style="font-size: 40upx;">&#xe627;</text>
				</navigator>
			</view>
			<view class="boos-lise">
				<view class="boos-title">初次上牌</view>
				<picker class="boos-picker" :class="datas == '' ? 'active' : ''" @change="DateChange" :range="newdata">
					<view class="pickerboos">{{ datas != '' ? datas : '请选择时间' }}</view>
					<view class="iconfont boos-icons">&#xe627;</view>
				</picker>
			</view>
			<view class="boos-lise">
				<view class="boos-title">表显示里程</view>
				<input v-model="formData.carMileage" type="digit" maxlength="9" placeholder="最多两位小数" style="padding-left:0 ;width: 55%;"></input>
				<view class="title-bottom">万公里</view>
			</view>
			<view class="boos-lise">
				<view class="boos-title">车辆所在地</view>
				<navigator hover-class="none" class="boos-nvget" :class="formData.cityLocation =='' ? 'active' : ''" url="../home/city">
					<view class="nvgetboos contrue">{{formData.cityLocation!=""?formData.cityLocation:'请选择'}}</view>
					<text class="iconfont boos-icons">&#xe627;</text>
				</navigator>
			</view>
			<view class="base">
				<button type="primary" class="base-bottow" @tap="check">立即查询</button>
			</view>
		</form>
		<!-- 购买预定收车 -->
		<view class="cu-modal" :class="modalDeal == 'deal' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="telet">请输入购买的次数</view>
				<view class="container">
					<view class="telet-input flex justify-between">
						<text>查询成交价</text>
						<input class="input" type="number" v-model="dealNum" />
						<text>{{dealConfigData.unit}}</text>
					</view>
					<view class="hint-text">成交价{{dealConfigData.configPrice}}元/{{dealConfigData.unit}}</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action text-blue center" @tap="modalDeal = null">取消</view>
					<view class="action text-green center" @tap="confirmDEalPay">确定</view>
				</view>
			</view>
		</view>
		<!-- 支付 -->
		<PayModal :isShow="payModalShow" @hideModal="hideModal" @sendPay="sendPay"></PayModal>
	</view>
</template>

<script>
	import {
		deal
	} from '../../api/strikePrice.js'
	import utils from '../../utils/utils.js';
	import cityData from '../../components/cityData.js';
	import { payMixins } from '../../mixins/index.js';
	import PayModal from '../../components/pay/pay.vue';
	import { buyDeal } from '../../api/order.js';
	export default {
		components: {
			PayModal
		},
		mixins: [ payMixins ],
		data() {
			return {
				newdata: ['不限', '1年以内', '2年以内', '3年以内', '4年以内 ', '5年以内', '6年以内', '6年以上'], //初次上牌
				datas: '', //页面渲染时间
				backgrounds: [{
						"color": "#FFFFFF",
						"text": "白色"
					},
					{
						"color": "#F54746",
						"text": "红色"
					},
					{
						"color": "#3788FF",
						"text": "蓝色"
					},
					{
						"color": "#FCBF48",
						"text": "金色"
					},
					{
						"color": "#BABABA",
						"text": "灰色"
					},
					{
						"color": "#724623",
						"text": "棕色"
					},
					{
						"color": "#79386A",
						"text": "紫色"
					},
					{
						"color": "#98CB68",
						"text": "绿色"
					},
					{
						"color": "#EEAE00",
						"text": "黄色"
					},
					{
						"color": "#252525",
						"text": "黑色"
					}
				],
				cityData: cityData, //城市联动
				countyLocation: '',
				TabCur: -1, //控制颜色
				formData: {
					carColor: '', //颜色
					carOldBoadTime: '', // 上牌时间
					brandSeries: '', //品牌车型
					carMileage: '', //车辆里程
					cityLocation: '', //车辆所在市
				},
				modalDeal: null,
				dealConfigData: {},
				dealNum: ''
			}
		},

		onShow() {
			// 地区
			uni.getStorage({
				key: 'cityName',
				success: res => {
					this.formData.cityLocation = res.data;
					if (this.formData.cityLocation != '') {
						uni.removeStorage({
							key: 'cityName',
						});
					}
				}
			});
			// 品牌车型数据
			uni.getStorage({
				key: 'brandName',
				success: (res) => {
					this.formData.brandSeries = res.data
					if (this.formData.brandSeries != '') {
						uni.removeStorage({
							key: 'brandName',
						});
					}
				}
			});

		},
		methods: {
			// 上牌时间
			DateChange(e) {
				this.datas = this.newdata[e.detail.value]
				this.formData.carOldBoadTime = e.detail.value;
			},
			// 选择颜色
			tabSelect(item, index) {
				this.TabCur = index;
				this.formData.carColor = item;
			},
			// 查询
			check() {
				const that = this;
        if(that.formData.carMileage !== ''){
          if(!/^\d+(\.\d{1,2})?$/.test(that.formData.carMileage)){
            utils.showTextToast('表显里程小数点后最多两位');
            return;
          }
        }
				deal(that.formData).then(res => {
					if (res.code == 200) {
						that.dealConfigData = res.data;
						uni.setStorage({
							key: 'queryData',
							data: that.formData
						})
						if (res.data.state) {
							uni.navigateTo({
								url: 'historicalPrice/historicalPrice'
							});
						} else {
							 uni.showModal({
							 	title: '提示',
							 	content: '您需要购买查询成交价功能！',
							 	confirmText: '去购买',
							 	success(res) {
							 		if (res.confirm) {
							 			that.modalDeal = 'deal';
							 		}
							 	}
							 })
						}
					}
				})
			},
			// 确定购买成交价
			confirmDEalPay() {
				if (Number(this.dealNum) < 1) {
					utils.showTextToast('购买成交价次数不能少于1');
					return false;
				}
				this.modalDeal = null;
				this.payModalShow = true;
			},
			// 确定购买
			sendPay(type) {
				const that = this;
				buyDeal({num: Number(that.dealNum), type }).then(res => {
					if (res.code === 200) {
						that.unifiedPay({
							payType: type,
							params: res.data.info,
							successBack() {
								
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.on {
		border: 4upx solid #A57BFF;
		background-color: #FFFFFF;
	}
	.borderred {
		border: 2upx solid #BABABA;
	}

	.active {
		color: #808080;
	}

	.title-bottom {
		font-size: 24upx;
		color: rgba(152, 152, 152, 1);
		width: 15%;
		line-height: 105upx;
		text-align: right;
	}
	.base {
		width: 100%;
		text-align: center;
		position: fixed;
		bottom: 20upx;
	}
	.base-bottow {
		margin: 0 auto;
	}
	.boos-lise {
		justify-content: space-between;
	}
	.boos-nvget{
		width: 75%;
	}
	.boos-picker {
		width: 75%;
	}
</style>
