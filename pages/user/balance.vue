<!-- 余额 -->
<template>
	<view class="">
		<view class="balance flex justify-between">
			<view class="balance-left flex flex-direction">
				<text class="balance-moey">账户余额</text>
				<text class="moeys">{{ money }}</text>
			</view>
			<navigator hover-class="none" url="topUp/topUp">
			<view class="balance-right">充值</view>
			</navigator>
		</view>

		<view class="cu-form-group margin-top">收支明细</view>
	  <scroll-view scroll-y style="height: 100%;">
	  		<view class="cu-form-group" v-for="item in list" :key="item">
	  		<view class="balance-content flex justify-between">
	  			<view class="textContent">
	  				<view class="balance-title">{{ item.productName || '暂无商品名称' }}</view>
	  				<view class="msg">
	  					<text v-if="item.flowType === 0">充值</text>
	  					<text v-if="item.flowType === 1">退款</text>
	  					<text v-if="item.flowType === 2">支付</text>
	  				</view>
	  			</view>
	  			<view class="text-right">
	  				<text class="title" :class="item.flowType !== 2 ? 'oncolor':''">{{ item.flowType === 2 ? '-' : '+' }}{{ item.money}}</text>
	  				<text class="time">{{ item.gmtCreate }}</text>
	  			</view>
	  		</view>
	  	</view>
	  </scroll-view>
		<UiLoading :loadingType="loadingType"></UiLoading>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
import { loadMoreList } from '../../mixins/index.js';
import UiLoading from '../../colorui/components/ui-loading.vue';
import { accountList } from '../../api/money.js';
export default {
	components: { UiLoading },
	mixins: [ loadMoreList ],
	data() {
		return {
			money: ''
		};
	},
	onLoad(route) {
	 this.reqFn = accountList;
	 this.reqValue = 'list';
	 this.params.pageSizeKey = 10;
	 this.money = route.money || '0.00';
	},
	onShow() {
		const that = this
		that.getList()
	}
};
</script>

<style scoped lang="less">
.balance {
	background: linear-gradient(-90deg, rgba(165, 123, 255, 1), rgba(107, 115, 255, 1));
	height: 240upx;
	padding: 0 5%;
	align-items: center;
}
.balance-left {
	color: rgba(255, 255, 255, 1);
	text {
		margin: 20upx 0;
	}
	.balance-moey {
		font-size: 34upx;
	}
	.moeys {
		font-size: 72upx;
		font-weight: bold;
	}
}
.balance-right {
	width: 160upx;
	height: 60upx;
	background: rgba(255, 255, 255, 1);
	border-radius: 30upx;
	font-size: 34upx;
	text-align: center;
	line-height: 60upx;
	color: #6b73ff;
	margin-top: 9%;
}
.balance-content {
	width: 100%;
	.text-right {
		text {
			width: 100%;
			display: block;
			text-align: right;
		}
		.time {
			color: #989898;
			font-size: 26upx;
			margin: 18upx 0;
		}
	}
}
.textContent {
	view {
		margin: 18upx 0;
	}
}
.balance-title {
	width: 478upx;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.msg{
	font-size:26upx;
	color: #252525;
}
.oncolor{
  color: red;
}
</style>
