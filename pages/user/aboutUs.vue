<!-- 关于我们
	廖国钧
-->
<template>
	<view>
		<view class="flex flex-direction align-center">
			<view class="ustop flex flex-direction align-center">
				<image class="usimage" src="../../static/logo.png"></image>
				<!-- <view class="ustop-tell">同行好车</view> -->
			</view>
			<text class="ustext">专注于二手车同行批发，车商店铺管理电商平台.在这里能够找寻车源信息，并进行二手车批发，既包含为车商提供B2B服务等.成立于2015年3月，为车商提供更好的找车管理平台.</text>
			<view class="copyright flex flex-direction align-center">
				<text>四川汇原鑫企业管理服务有限公司 </text>
				<text>版权所有</text>
			</view>
			<view class="version">版本号：1.0</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
.usimage{
	width: 255upx;
	height: 255upx;
	border-radius: 20%;
}
.ustop{
	padding: 190upx 0;
}
.ustop-tell{
	font-size:56upx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(152,152,152,1);
	background:linear-gradient(0deg,rgba(165,123,255,1) 0%, rgba(107,115,255,1) 100%);
	-webkit-background-clip:text;
	-webkit-text-fill-color:transparent;
	margin-top: 30upx;
}
.ustext{
	padding:80upx 5% ;
	font-size:28upx;
	color:rgba(37,37,37,1);
	line-height:42upx;
	border-top: 1upx solid #F1F1F1;
}
.copyright{
	font-size:28upx;
	color:rgba(152,152,152,1);
}
.version{
	width: 100%;
	font-size:28upx;
	color:rgba(152,152,152,1);
	border-top: 1upx solid #F1F1F1;
	padding: 32upx 0;
	margin-top: 20upx;
	text-align: center;
}
</style>
