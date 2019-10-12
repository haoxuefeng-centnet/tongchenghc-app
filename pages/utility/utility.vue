<!-- 维保查询 -->
<template>
	<view>
		<view class="">
			<view class="utility first flex flex-direction">
				<view class="utility-top flex justify-between">
					<view class="">VIN码({{vin.length}}/17)</view>
					<input type="text" focus="true" maxlength="17" v-model="vin" />
				</view>
				<button class="base-bottow" type="primary" @tap="querys">
					<text class="base-bottow-text">查 询</text>
				</button>
				<view style="margin: 20upx 0; text-align: center; color: red;" >
					注:当前剩余查询次数为 {{infoData.surplusSize}} 次 <br>
					购买单价为 {{infoData.configPrice}} 元一次
				</view>
			</view>
			<view class="utility last flex justify-between">
				<view class="utility-bottom flex flex-direction" @tap="insurance">
					<text class="iconfont ">&#xe60f;</text>
					<text class="padding-heigt">保险纪录</text>
				</view>
				<view class="utility-bottom flex flex-direction" @tap="jump">
					<text class="iconfont" style="font-size: 61upx;">&#xe750;</text>
					<text class="padding-heigt">查询纪录</text>
				</view>
			</view>
		</view>
		<PayModal :isShow="payModalShow" @hideModal="hideModal" @sendPay="submitOrder"></PayModal>
	</view>
</template>

<script>
	import utils from '../../utils/utils.js';
	import { payOrder, maintenancUse, maintenanceInfo, maintenancePay} from '../../api/thirdParty.js'
	import PayModal from '../../components/pay/pay.vue'
	import { payMixins } from '../../mixins/index.js'
	export default {
		mixins: [ payMixins ],
		components: { PayModal },
		data() {
			return {
				vin: '', //VIN码 
				infoData:''
			}
		},
		onShow() {
			// 获取查询次数
			maintenanceInfo().then(res=>{
				if(res.code == 200){
					this.infoData = res.data
				}
			})
			// 获取已经输入的VIN
			uni.getStorage({
				key: 'utilityVin',
				success: (res =>{
					if(res.data){
						this.vin = res.data
					}
				})
			});
		},
		methods: {
			// 跳转查询纪录列表
			jump() {
				uni.navigateTo({
					url: 'maintenance/maintenance?id='+ 1,
				});
			},
			insurance(){
				uni.navigateTo({
					url: 'insurance',
				});
			},
			// 查询
			querys() {
				if(!/^[A-Za-z0-9]{17}$/.test(this.vin)){
					utils.showTextToast('VIN码错误请检查(只允许数字+字母)');
					return
				}
				uni.setStorage({
					key: 'utilityVin',
					data: this.vin
				});
				if(this.infoData.surplusSize){
					// 根据赠送次数查询
					maintenancUse({vin:this.vin}).then(resquery=>{
            if(!resquery.data.resStatus){
              uni.showModal({title: '提示',content: '查询中 请在查询纪录中查看',showCancel :false,});
              return
            }else if(resquery.data.resStatus == 1 ){
							uni.showModal({title: '提示',content: '无数据',showCancel :false,});
							return
						}else if( resquery.data.resStatus == 2){
							uni.showModal({title: '提示',content: '查询中 请在查询纪录中查看',showCancel :false,});
							return
						}else if(resquery.data.resStatus == 3){
							uni.showModal({title: '提示',content: '无数据',showCancel :false,});
							return
						}else if(resquery.data.resStatus == 0){
              const replaceUrl = encodeURIComponent(resquery.data.result);
              uni.navigateTo({
              	url: `Outside/Outside?urls=${replaceUrl}&item=${1}`
              });
						}
					})
				}else{
					this.payModalShow = true
				}
			},
			// 提交订单发起支付
			submitOrder(payType) {
				// 购买请求 payType 0 账号支付 1 微信支付
				maintenancePay({vin:this.vin,type: payType}).then(res => {
					if (res.code === 200) {
						// 调起支付
						this.unifiedPay({
							payType,
							params: res.data.info,
							successBack() {
								// 支付成功后通过订单ID查询
								payOrder({orderId:res.data.orderId}).then(resorder=>{
									if(resorder.code == 200 ){
                    if(!resorder.data.resStatus){
                      uni.showModal({title: '提示',content: '查询中 请在查询纪录中查看',showCancel :false,});
                      return
                    }else if(resorder.data.resStatus == 1 ){
											uni.showModal({title: '提示',content: '无数据',showCancel :false,});
											return
										}else if( resorder.data.resStatus == 2){
                      uni.showModal({title: '提示',content: '查询中 请在查询纪录中查看',showCancel :false,});
											return
										}else if(resorder.data.resStatus == 3){
                      uni.showModal({title: '提示',content: '无数据',showCancel :false,});
											return
										}else if(resorder.data.resStatus == 0){
                      const replaceUrl = encodeURIComponent(resorder.data.result)
                      uni.navigateTo({
                      	url: `Outside/Outside?urls=${replaceUrl}&item=${1}`
                      });
										}
									}
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F1F1F1;
	}

	.utility {
		width: 93%;
		margin: 7.5upx auto;
		background: rgba(255, 255, 255, 1);
		box-shadow: 3upx 2upx 8upx 0upx rgba(66, 71, 157, 0.22);
		border-radius: 10upx;
		padding-bottom:30upx;
		view {
			width: 93%;
			margin: 0 auto;
		}

		.utility-top {
			border-bottom: 2upx solid #F2F2F2;
			align-items: center;
			font-size: 30upx;
			height: 120upx;

			view {
				width: 30%;
			}

			input {
				width: 70%;
			}
		}

		.base-bottow {
			margin: 32upx auto;
		}
	}
	.utility-bottom {
		padding-top: 9%;
		text-align: center;

		.iconfont {
			font-size: 75upx;
		}

		.padding-heigt {
			margin-top: 28upx;
		}
	}
</style>
