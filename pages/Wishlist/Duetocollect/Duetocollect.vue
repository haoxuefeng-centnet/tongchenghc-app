<!-- 预定收车 发布-->
<template>
	<view>
		<view class="boos">
      <view class="flex align-center boos-lise">
      	<view class="boos-title">车身颜色<text class="hint">*</text></view>
      	<view class="boos-picker-width" style=" font-size: 30upx;">{{backgrounds[TabCur].text}}</view>
      </view>
			<view class="boox-title">
				<scroll-view class="boox-title-background" scroll-with-animation="true" scroll-x="true">
					<view class="boox-title-background-view" :class="{ on: TabCur == index, borderred: index == 0 && TabCur != index }"
					 v-for="(item, index) in backgrounds" :style="'background:' + item.color + ';'" :key="index" @tap="tabSelect(item.text, index)"
					 :data-id="index"></view>
				</scroll-view>
			</view>
			<view class="vehicle">
				<text class="vehicleContent flex justify-between">车辆类型<text class="hint">*</text></text>
				<scroll-view class="vehicleList-a flex" scroll-with-animation="true" scroll-x="true">
					<view class="vehicleContentName " v-for="(item, index) in models" :key="index" :class="{ on: modelsCur == index }"
					 @tap="modelschange(item, index)">{{ item }}</view>
				</scroll-view>
			</view>
			<view class="boos-lise">
				<view class="boos-title">地区1<text class="hint">*</text></view>
				<navigator hover-class="none" class="boos-nvget" url="../../home/city?city=1">
					<view class="nvgetboos contrue" :class="formData.regionCity == '' ? 'active' : ''">{{ formData.regionCity != '' ? formData.regionCity : '请选择' }}</view>
					<text class="iconfont boos-icons">&#xe627;</text>
				</navigator>
			</view>
			<view class="boos-lise">
				<view class="boos-title">地区2</view>
				<navigator hover-class="none" class="boos-nvget" url="../../home/city?type=1">
					<view class="nvgetboos contrue" :class="formData.region2City == '' ? 'active' : ''">{{ formData.region2City != '' ? formData.region2City : '请选择' }}</view>
					<text class="iconfont boos-icons">&#xe627;</text>
				</navigator>
			</view>
			<view class="boos-lise">
				<view class="boos-title">品牌车型<text class="hint">*</text></view>
				<navigator hover-class="none" class="boos-nvget" url="../../modelsChoose/brand">
					<view class="nvgetboos contrue" :class="formData.brandSeries == '' ? 'active' : ''">{{ formData.brandSeries != '' ? formData.brandSeries : '请选择' }}</view>
					<text class="iconfont boos-icons">&#xe627;</text>
				</navigator>
			</view>
			<view class="boos-lise">
				<view class="boos-title">表显里程<text class="hint">*</text></view>
				<input style="padding-left: 0; width: 68%;" maxlength="9" type="digit" v-model="formData.carMileage" placeholder="请输入最大公里数(必填)" />
				<view class="boos-icons" style="font-size: 24upx;">万公里</view>
			</view>
			<view class="boos-lise">
				<view class="boos-title">初次上牌<text class="hint">*</text></view>
				<picker class="boos-picker" @change="DateChange" :range="newdata">
					<view class="pickerboos" v-if="drawing != ''">{{drawing}}</view>
					<view class="pickerboos active" v-else>请选择</view>
					<view class="iconfont boos-icons">&#xe627;</view>
				</picker>
			</view>
			<view class="boos-lise">
				<view class="boos-title">使用性质</view>
				<picker class="boos-picker" @change="PickerChange" :range="nature" :class="[formData.carNature == '' ? 'active' : '']">
					<view class="pickerboos">{{ formData.carNature != '' ? formData.carNature : '请选择' }}</view>
					<view class="iconfont boos-icons">&#xe627;</view>
				</picker>
			</view>
			<view class="boos-lise">
				<view class="boos-title">变速箱</view>
				<picker class="boos-picker" @change="transmissionchange" :range="transmission" :class="[formData.carGearbox == '' ? 'active' : '']">
					<view class="pickerboos">{{ formData.carGearbox != '' ? formData.carGearbox : '请选择' }}</view>
					<view class="iconfont boos-icons">&#xe627;</view>
				</picker>
			</view>
			<view class="base">
				<button class="base-bottow" type="primary" @tap="sava">
					<text class="base-bottow-text" v-if="id">修 改</text>
					<text class="base-bottow-text" v-else>保 存</text>
				</button>
			</view>
		</view>
		<!-- 购买预定收车 -->
		<view class="cu-modal" :class="modalReserve == 'reserve' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="telet">请输入购买的月份</view>
				<view class="container">
					<view class="telet-input flex justify-between">
						<text>{{ reserveAuth.configName }}</text>
						<input class="input" type="number" v-model="reserveNum" />
						<text>{{reserveAuth.configUnit}}</text>
					</view>
					<view class="hint-text">预定收车{{reserveAuth.configPrice}}元/{{reserveAuth.configUnit}}</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action text-blue center" @tap="modalReserve = null">取消</view>
					<view class="action text-green center" @tap="confirmReservePay">确定</view>
				</view>
			</view>
		</view>
		<!-- 支付 -->
		<PayModal :isShow="payModalShow" @hideModal="hideModal" @sendPay="sendPay"></PayModal>
	</view>
</template>

<script>
	import UiLoading from '../../../colorui/components/ui-loading.vue';
	import PayModal from '../../../components/pay/pay.vue';
	import {payMixins} from '../../../mixins/index.js';
	import utils from '../../../utils/utils.js';
	import {
		reserve,
		reservemsg,
		reserveInfos,
		frequency
	} from '../../../api/wishlist.js';
	import {
		buyReserve
	} from "../../../api/order.js"
	export default {
		components: {
			UiLoading,
			PayModal
		},
		mixins: [payMixins],
		data() {
			return {
				modalReserve: null,
				reserveAuth: {}, // 预定收车验证
				reserveNum: null, // 购买的月份
				id: '', //接收的心愿单ID
				index: '-1',
				newdata: ['不限', '1年以内', '2年以内', '3年以内', '4年以内 ', '5年以内', '6年以内', '6年以上'], //初次上牌
				drawing: '',
				nature: ['营运', '非营运', '租债营运', '租债非营运 '], //使用性质选择
				transmission: ['自动', '手动'],
				TabCur: 0, //颜色控制
				modelsCur: 0, //车型控制
				backgrounds: [{
						color: '#FFFFFF',
						text: '白色'
					},
					{
						color: '#F54746',
						text: '红色'
					},
					{
						color: '#3788FF',
						text: '蓝色'
					},
					{
						color: '#FCBF48',
						text: '金色'
					},
					{
						color: '#BABABA',
						text: '灰色'
					},
					{
						color: '#724623',
						text: '棕色'
					},
					{
						color: '#79386A',
						text: '紫色'
					},
					{
						color: '#98CB68',
						text: '绿色'
					},
					{
						color: '#EEAE00',
						text: '黄色'
					},
					{
						color: '#252525',
						text: '黑色'
					}
				],
				models: ['轿车', 'SUV', 'MPV', '面包车', '工程车', '客车', '皮卡', '跑车'],
				formData: {
					carColor: '白色', //车辆颜色
					carType: '轿车', //车辆类型
					regionCity: '', //地区市1
					region2City: '', //地区市2
					carMileage: '', //车辆里程
					brandSeries: '', //品牌车型
					carOldBoadTime: '', //初次上牌时间
					carNature: '', //使用性质
					carGearbox: '' //变速箱
				}
			};
		},
		onLoad(option) {
			// 通过是否传心愿单id 判断修改或发布
			this.id = option.id;
			if (option.id) {
				reservemsg({
					reserveId: option.id
				}).then(res => {
					if (res.code == 200) {
						for (var i in res.data) {
							if (res.data[i] == null) {
								res.data[i] = ''
							}
						}
						this.formData = res.data;
						if (this.formData.carOldBoadTime == '') {
							this.drawing = this.newdata[0]
						} else {
							this.drawing = this.newdata[res.data.carOldBoadTime]
						}
					}

				});
			}
		},
		// 品牌车型数据
		onShow() {
			uni.getStorage({
				key: 'brandName',
				success: res => {
					this.formData.brandSeries = res.data;
					if (this.formData.brandSeries != '') {
						uni.removeStorage({
							key: 'brandName'
						});
					}
				}
			});
			// 地区1
			uni.getStorage({
				key: 'cityName',
				success: (res) => {
					this.formData.regionCity = res.data;
					if (this.formData.regionCity != '请选择') {
						uni.removeStorage({
							key: 'cityName'
						});
					}
				}
			});
			// 地区2
			uni.getStorage({
				key: 'affiliation',
				success: (res) => {
					this.formData.region2City = res.data;
					if (this.formData.region2City != '请选择') {
						uni.removeStorage({
							key: 'affiliation'
						});
					}
				}
			});
		},
		methods: {
			// 日期
			DateChange(e) {
				this.formData.carOldBoadTime = e.detail.value;
				this.drawing = this.newdata[this.formData.carOldBoadTime]
			},
			// 性质....
			PickerChange(e) {
				this.formData.carNature = this.nature[e.detail.value];
			},
			// 变速箱
			transmissionchange(e) {
				this.formData.carGearbox = this.transmission[e.detail.value];
			},
			// 颜色选择
			tabSelect(item, index) {
				this.TabCur = index;
				this.formData.carColor = item;
			},
			//车型选择
			modelschange(item, index) {
				this.modelsCur = index;
				this.formData.carType = item;
			},
			//地区1
			bindRegionChange(e) {
				this.formData.regionProvince = e.detail.value[0];
				this.formData.regionCity = e.detail.value[1];
			},
			//地区2
			bindRegionChangetow(e) {
				this.formData.region1Province = e.detail.value[0];
				this.formData.region2City = e.detail.value[1];
			},
			// 发布请求
			release(){
				reserve(this.formData).then(res => {
					if (res.code == 200) {
						utils.showTextToast('发布成功');
						uni.navigateBack({
							delta: 1
						});
					} else {
						utils.showTextToast('发布失败请重试');
					}
				});
			},
			Modify(){
				// 修改请求
				reserveInfos(this.formData).then(res => {
					if (res.code == 200) {
						utils.showTextToast('修改成功');
						uni.navigateBack({
							delta: 1
						});
					} else {
						utils.showTextToast('修改失败请重试');
					}
				});
			},
			sava() {
				const data = this.formData
				if (data.carColor == '' ||data.carType == '' ||data.regionCity == '' ||data.brandSeries == '' || data.carMileage == '' || data.carOldBoadTime === '') {
					utils.showTextToast('请完善您的信息');
					return
				}
        if(!/^\d+(\.\d{1,2})?$/.test(data.carMileage)){
            utils.showTextToast('表显里程小数点后最多两位');
            return;
        }
				// 验证该用户是否有预定收车功能
				frequency().then(res => {
					const that = this;
					if (res.code == 200) {
						that.reserveAuth = res.data;
						if (res.data.isReserve) {
							if(that.id){
								that.Modify()
							}else{
								that.release()
							}  
						} else {
							uni.showModal({
								title: '提示',
								content: '您需要购买预定收车功能！',
								confirmText: '去购买',
								success(res) {
									if (res.confirm) {
										that.modalReserve = 'reserve';
									}
								}
							})
						}
					}
				})
			},
			// 确定购买预定收车
			confirmReservePay() {
				if (Number(this.reserveNum) < 1) {
					utils.showTextToast('请填写购买预定收车的月份');
					return false;
				}
				this.modalReserve = null;
				this.payModalShow = true;
			},
			// 发起支付
			sendPay(type) {
				const that = this;
				buyReserve({
					num: Number(that.reserveNum),type}).then(res => {
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
		},

	};
</script>

<style>
	page {
		background-color: #ffffff;
	}

	.base {
		position: fixed;
		bottom: 20upx;
	}

	.boos-icons-icon {
		font-size: 40upx;
	}

	.prompt {
		font-size: 24upx;
	}

	.active {
		color: #808080;
	}

	.on {
		border: 4upx solid #a57bff;
		background-color: #FFFFFF;
	}
</style>
