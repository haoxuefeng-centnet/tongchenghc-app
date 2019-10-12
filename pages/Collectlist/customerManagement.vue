<!-- //客户管理 -->
<template>
		<view class="customerManagement">
			<navigator hover-class="none" url="Collectlist">
			<view class="customerManagementlast payColor">
				收车
			</view>
			</navigator>
			<navigator hover-class="none" url="sellCars">
			<view class="customerManagementlast SellColor">
				卖车
			</view>
			</navigator>
		</view>
	
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.customerManagement{
	width: 100%;
	height: 1000upx;
	text-align: center;
	display: flex;
	justify-content: center;
	flex-direction: column;
}
.customerManagementlast{
	width:400upx;
	height:150upx;
	background:rgba(165,123,255,1);
	box-shadow:3upx 2upx 8upx 0upx rgba(66,71,157,0.22);
	border-radius:10upx;
	text-align: center;
	line-height: 150upx;
	margin: 20upx auto;
	font-size:56upx;
	font-family:PingFang-SC-Regular;
	font-weight:bold;
	color:rgba(255,255,255,1);}
.payColor{
	background: rgba(165,123,255,1);
}
.SellColor{
	background: #6B73FF;
}
</style>
