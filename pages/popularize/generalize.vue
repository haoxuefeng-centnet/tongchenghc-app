<!-- 购买vip -->
<template>
	<view class="payVip">
		<view class="bg"></view>
		<view class="vip">
			<view :class="{on:active==index}" @tap="purchase(index,item.extensionId)" v-for="(item,index) in data" :key="item.extensionId">
				<text class="time">推广{{item.extensionDuration}}天</text>
				<text class="money">￥{{item.extensionPrice}} </text>
			</view>
		</view>
		<view class="hint">注：购买广告位推广,您发布的车辆信息将优先展示给卖家.</view>
		<button type="primary" class="pay" @tap="pay">支    付</button>
	</view>
</template>

<script>
	import{configList}from'../../api/popularize.js'
	export default{
		data(){
			return{
				data:[],
				active:-1,
				extensionId:''
			}
		},
		onShow() {
			configList().then(res=>{
				this.data=res.data;
			})
		},
		methods:{
			purchase(index,id){
				this.active=index;
				this.extensionId=id;
			},
			// 购买
			pay(){
				// this.extensionId 选择的配置
			}
		}
	}
</script>

<style scoped lang="less">
.payVip {
	background: #fff;
	height: 100vh;
	.bg {
		height: 16upx;
		background: rgba(242, 242, 242, 1);
	}
	.on{
		background: #dee0ff;
	}
	.vip {
		display: flex;
		background: #fff;
		padding-top: 50upx;
		flex-wrap: wrap;
		view {
			width: 30%;
			height: 170upx;
			margin: 20upx auto;
			border: 2upx solid #A57BFF;
			border-radius: 10upx;
			padding-top: 40upx;
			.time,
			.money {
				font-size: 36upx;
				line-height: 23upx;
				display: block;
				text-align: center;
			}
			.money {
				color: rgba(250, 44, 34, 1);
				margin-top: 28upx;
			}
			.time {
				color: rgba(37, 37, 37, 1);
			}
		}
	}
	.hint {
		font-size: 24upx;
		color: rgba(233, 144, 54, 1);
		line-height: 23upx;
		padding-left: 25upx;
		margin-top: 40upx;
	}
	.pay {
		width: 500upx;
		height: 100upx;
		background: linear-gradient(0deg, rgba(165, 123, 255, 1), rgba(107, 115, 255, 1));
		border-radius: 20px;
		line-height: 100upx;
		font-size: 36upx;
		color: rgba(255, 255, 255, 1);
		margin: 95upx auto;
	}
}
</style>
