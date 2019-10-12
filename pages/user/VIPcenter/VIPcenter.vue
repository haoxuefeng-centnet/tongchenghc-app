<!-- 会员中心 -->
<template>
	<view>
		<navigator hover-class="none" url="payVip">
		<view class="membercenter flex flex-direction">
			<view class="vipremoteagent">VIP尽享特权</view>
			<view class="vip-time">
				<text v-if="vipInfo.isVip">会员截至日期: {{ vipInfo.failureTime }}</text>
			</view>
			<view class="customize">{{ vipInfo.isVip ? '立即续费' : '立即加入'}}</view>
		</view>
		</navigator>
		<view class="benefits">会员利益</view>
		<view class="generalBox flex flex-direction">
			<view class="localTitle">查看批发价</view>
			<view class="itemcontent">VIP尊享全国在线车源批发价</view>
		</view>
		<view class="generalBox flex flex-direction">
			<view class="localTitle">查看出价</view>
			<view class="itemcontent">随时掌握自己车辆的行情</view>
		</view>
		<view class="generalBox flex flex-direction">
			<view class="localTitle">查看车估价、求购信息</view>
			<view class="itemcontent">为你提供一手信息资源</view>
		</view>
		<view class="generalBox flex flex-direction">
			<view class="localTitle">VIP尊享</view>
			<view class="itemcontent">1V1客户经理服务</view>
		</view>
	</view>
</template>

<script>
import { userVip } from '../../../api/vip.js'	
export default {
	data() {
		return {
			vipInfo: {}
		};
	},
	onShow() {
		// 查看vip信息
		userVip().then(res => {
			if (res.code === 200) {
				this.vipInfo = res.data
			}
		})
	},
	methods: {}
};
</script>

<style scoped lang="less">
.membercenter{
	width:600upx;
	height:300upx;
	text-align: center;
	margin: 40upx auto ;
	background:linear-gradient(-90deg,rgba(165,123,255,1),rgba(107,115,255,1));
	border-radius:10upx;
	color: #FFFFFF;
	align-items: center;
	padding: 38upx 0;
	.vip-time {
		font-size: 24upx;
		padding: 28upx 0;
	}
	.vipremoteagent{
		font-size:46upx;
		font-weight:bold;
		color:rgba(255,255,255,1);
	}
	.customize{
		width:300upx;
		height:80upx;
		line-height: 80upx;
		border:2upx solid rgba(255,255,255,1);
		border-radius:40upx;
		font-size:36upx;
		font-weight:500;
		color:rgba(255,255,255,1);
	}
}
.benefits{
	width: 93%;
	height: 80upx;
	margin: 0 auto ;
	line-height: 80upx;
	color: #6B73FF;
	font-size: 36upx;
	border-bottom: 2upx solid #F2F2F2;
}
.generalBox{
	width: 93%;
	margin: 0 auto;
	border-bottom: 2upx solid #F2F2F2;
	padding: 27upx 0 ;
	view{
		margin: 9upx 0;
	}
	.localTitle{
		font-size:32upx;
		font-weight:500;
		color:rgba(37,37,37,1);
	}
	.itemcontent{
		font-size:28upx;
		color:rgba(152,152,152,1);
	}
}
</style>
