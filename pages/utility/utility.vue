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
			<view class="maintenance">
				<view class="maintenance-search flex justify-between">
					<view class="maintenance-input">
						<input type="text" confirm-type="search" v-model="carName" @confirm="search()" placeholder="搜索" maxlength="17"/>
						<text class="iconfont">&#xe612;</text>
					</view>
					<view class="maintenance-text"  @tap="search()">搜索</view>
				</view>
		          <view style="height: calc(100vh - 570upx);overflow: auto;">
					<view class="maintenance-list flex flex-direction" v-for="(item , index) in list" :key="index" @tap="jump(item.resStatus,item.result)">
						<view class="flex justify-between" style="margin-top: 10upx;" >
							<view class="flex" style="color: #989898;">
								<text>{{item.gmtCreateFmt}}</text>
							</view>
							<text style="color:#FA3930 ;" v-if="item.resStatus == 0">查询成功</text>
							<text style="color:#FA3930 ;" v-if="item.resStatus == 1">无数据</text>
							<text style="color:#FA3930 ;" v-if="item.resStatus == 2">查询中</text>
							<text style="color:#FA3930 ;" v-if="item.resStatus == 3">查询失败</text>
						</view>
						<view style="font-size: 30upx; font-weight: 500;">
							<text>VIN码：</text>
							<text class="margingleft">{{item.carVin}}</text>
						</view>
					</view>
					 <UiLoading :loadingType="loadingType"></UiLoading>
		           </view>		
			</view>	
		</view>
		<PayModal :isShow="payModalShow" @hideModal="hideModal" @sendPay="submitOrder"></PayModal>
	</view>
</template>

<script>
	import utils from '../../utils/utils.js';
	import { payOrder, maintenancUse, maintenanceInfo, maintenancePay,maintenanceList} from '../../api/thirdParty.js'
	import PayModal from '../../components/pay/pay.vue'
	import { payMixins } from '../../mixins/index.js'
	import UiLoading from '../../colorui/components/ui-loading.vue'
	import { loadMoreList } from '../../mixins/index.js';
	export default {
		mixins: [ payMixins,loadMoreList ],
		components: { PayModal,UiLoading},
		data() {
			return {
				vin: '', //VIN码
				infoData:'',
				carName:''
			}
		},
		onLoad(option) {
			this.reqFn = maintenanceList;
			this.reqValue = 'list';
			this.params.pageSizeKey = 5;
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
			this.getList();
		},
		methods: {
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
						const url = resquery.data.result
						if(url!=null&&url!=''&&url.indexOf('api.chaboshi.cn')>-1){
							this.jump(0,url);
						}else{
							uni.showModal({title: '提示',content: '查询中,请稍候刷新页面查看结果',showCancel :false,});
							return
						}
						/* console.log("result:"+resquery.data.result)
						if(!resquery.data.resStatus){
							uni.showModal({title: '提示',content: '查询中',showCancel :false,});
						}else if(resquery.data.resStatus == 1 ){
							uni.showModal({title: '提示',content: '无数据',showCancel :false,});
							return
						}else if( resquery.data.resStatus == 2){
							uni.showModal({title: '提示',content: '查询中',showCancel :false,});
							return
						}else if(resquery.data.resStatus == 3){
							uni.showModal({title: '提示',content: '无数据',showCancel :false,});
							return
						}else if(resquery.data.resStatus == 0){
							const replaceUrl = encodeURIComponent(resquery.data.result);
							uni.navigateTo({
								url: `Outside/Outside?urls=${replaceUrl}&item=${1}`
							});
						} */
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
										const url = resorder.data.result
										if(url!=null&&url!=''&&url.indexOf('api.chaboshi.cn')>-1){
											this.jump(0,url);
										}else{
											uni.showModal({title: '提示',content: '查询中,请稍候刷新页面查看结果',showCancel :false,});
											return
										}
										/* if(!resorder.data.resStatus){
											uni.showModal({title: '提示',content: '查询中',showCancel :false,});
											return
										}else if(resorder.data.resStatus == 1 ){
											uni.showModal({title: '提示',content: '无数据',showCancel :false,});
											return
										}else if( resorder.data.resStatus == 2){
											uni.showModal({title: '提示',content: '查询中',showCancel :false,});
											return
										}else if(resorder.data.resStatus == 3){
											uni.showModal({title: '提示',content: '无数据',showCancel :false,});
											return
										}else if(resorder.data.resStatus == 0){
											const replaceUrl = encodeURIComponent(resorder.data.result)
											uni.navigateTo({
												url: `Outside/Outside?urls=${replaceUrl}&item=${1}`
											});
										} */
									}
								})
							}
						})
					}
				})
			},
			// 第三方跳转
			jump(item,url){
				if(item == 0){
					const replaceUrl = encodeURIComponent(url)
					uni.navigateTo({
						url: `Outside/Outside?urls=${replaceUrl}&item=${1}`
					});
				}
			},
			// 搜索
			search(){
				this.params.vin = this.carName;
				this.getList()
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
		height: 400upx;
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
	.maintenance{
		width: 93%;
		margin: 10upx auto;
	}
	.maintenance-search{
		width: 100%;
		height: 60upx ;
		line-height: 60upx;
		margin-bottom: 8upx;
		.maintenance-input{
			width: 77%;
			background: #ffffff;
			position: relative;
			background:rgba(255,255,255,1);
			box-shadow:3upx 2upx 8upx 0upx rgba(66,71,157,0.22);
			border-radius:30upx;
			text{
				position: absolute;
				top: 20upx;
				left: 20upx;
				font-size: 46upx;
				color: #989898;
			}
			input{
				height: 100%;
				text-align: center;
				line-height: 60upx
			}
		}
		.maintenance-text{
			width:123upx;
			height:60upx;
			background:linear-gradient(0deg,rgba(165,123,255,1),rgba(107,115,255,1));
			border-radius:10upx;
			font-size:32upx;
			color:rgba(255,255,255,1);
			line-height: 60upx;
			text-align: center;
		}
	}
	.maintenance-list{
		width: 100%;
		height: 163upx;
		background:rgba(255,255,255,1);
		box-shadow:3upx 2upx 8upx 0upx rgba(66,71,157,0.22);
		border-radius:10upx;
		margin: 8upx auto;
		padding: 0 5%;
		font-size: 24upx;
		view{
			height: 40%;
			line-height: 81.5upx;
		}
	}
	.margingleft{
		margin-left: 20upx;
	}
</style>
