<!-- 统一支付弹框 -->
<template>
	<view class="cu-modal show" v-if="isShow">
		<view class="cu-dialog" @tap.stop="">
			<view class="cu-bar bg-white justify-end cu-dialog-head">
				<view class="content">请选择支付方式</view>
				<view class="action" @tap="hideModal">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
			<view class="padding-xs">
				<radio-group class="block" @change="RadioChange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="item in payTypeList" :key="item.type">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub pay-group-item">
									<text class="pay-icon cuIcon-moneybag" v-if="item.type === 0"></text>
									<text class="pay-icon cuIcon-pay" v-if="item.type === 1"></text>{{ item.name }}
									<text v-if="item.type === 0" style="color: #999;">({{ userInfo.surplusMoney }}元)</text>
									</view>
								<radio class="round" :class="activeType == item.type ?'checked':''" :checked="activeType == item.type ?true:false"
								 :value="item.type"></radio>
							</label>
						</view>
					</view>
				</radio-group>
			</view>
			<view class="cu-bar bg-white justify-end">
				<view class="action">
					<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
					<button class="cu-btn bg-green margin-left" @tap="sendPay">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getUser }  from '../../api/login.js'
	export default {
		props: {
			// 控制弹框隐藏显示
			isShow: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				payTypeList: [
					{
							name: '账号支付',
							type: 0
						},
					{
						name: '微信支付',
						type: 1
					}
				],
				activeType: 0,
				payType: 0,
				userInfo: {}
			}
		},
		methods: {
			hideModal() {
				this.$emit('hideModal');
			},
			RadioChange(e) {
				this.activeType = Number(e.detail.value)
				// #ifdef MP-WEIXIN
				this.payType = this.activeType
				// #endif
				// #ifdef APP-PLUS
				this.payType = this.activeType === 1 ? 2 : this.activeType
				// #endif
			},
			sendPay(){
				const that = this
        // #ifdef APP-PLUS
             that.$emit('sendPay', that.payType);
         // #endif
         
         // #ifdef MP-WEIXIN
         if (that.payType !== 0) {
         	that.validationWxAuth(() => {
         		that.$emit('sendPay', that.payType);
         	})
         } else {
         	that.$emit('sendPay', that.payType);
         }
         // #endif
			}
		},
		created() {
			getUser().then(res => {
				if (res.code === 200) {
					this.userInfo = res.data
				}
			}).catch(err => {
				console.error(err)
			})
		}
	}
</script>

<style lang="less" scoped>
	.cu-dialog-head {
		border-bottom: 1rpx solid #e5e5e5;
	}

	.pay-group-item {
		// color: #07c160;
		font-size: 32rpx;
	}

	.pay-icon {
		padding-right: 18rpx;
	}
</style>
