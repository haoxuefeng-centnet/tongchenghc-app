<!-- 员工账号管理 -->
<template>
	<view class="Employee">
		<view class="search">
			<text class="iconfont seachImg" @tap="search()">&#xe612;</text>
			<input type="text" confirm-type="search" v-model="carName" @confirm="search()" placeholder="搜索" />
		</view>
		<navigator hover-class="none" url="addAccount/addAccount" v-if="userinfo.cusType === 0">
			<view class="flex align-center user">
				<text class="iconfont userImg">&#xe61a;</text>
				<text class="addd" style="margin-left: 20upx;">新建账号</text>
			</view>
		</navigator>
		<view class="flex align-center user" v-for="(item ,index ) in list" :key="index">
			<image :src="item.cusAvatar"></image>
			<view class="" style="margin-left: 20upx;">
				<text class="names">{{item.cusNick}}</text>
				<text class="phone">{{item.cusPhone}}</text>
			</view>
		</view>
		<text class="prompt">没有更多了</text>
	</view>
</template>

<script>
import { loadMoreList } from "../../../mixins/index.js";
import { account } from  "../../../api/account.js"
export default{
	mixins: [ loadMoreList ],
	data(){
		return{
			carName:'',
			userinfo:{}, //用户信息
		}
	},
	onShow(){
		this.reqFn = account;
		this.reqValue = 'list';
		this.params.pageSizeKey = 30;
		this.getList();
		uni.getStorage({
		    key: 'userInfo',
		    success:  (res)=> {
		       this.userinfo = res.data
		    }
		});
	},
	methods:{
		search(){
			this.params.keyword = this.carName;
			this.getList()
		}
	}
}
</script>

<style scoped lang="less">
.Employee {
	background: rgba(242, 242, 242, 1);
	width: 100%;
	height: 100vh;
	.search {
		background: #fff;
		width: 100%;
		padding: 6upx 0;
		position: relative;
		.seachImg {
			line-height: 65upx;
			position: absolute;
			left: 50upx;
			font-size: 36upx;
		}
	}
	input {
		width: 700upx;
		height: 66upx;
		background: rgba(242, 242, 242, 1);
		border-radius: 33upx;
		margin: 0 auto;
		text-align: center;
		font-size: 30upx;
		color: rgba(152, 152, 152, 1);
		line-height: 45upx;
	}
	.user {
		width: 93%;
		height: 100upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 3upx 2upx 8upx 0px rgba(66, 71, 157, 0.22);
		border-radius: 10upx;
		margin: 16upx auto;
		padding: 17upx 10upx;
		.userImg {
			color: #FFFFFF;
			width: 66upx;
			height: 66upx;
			line-height: 66upx;
			text-align: center;
			font-size: 50upx;
			border-radius: 50%;
			background: #007AFF;
		}
		.addd {
			font-size: 30upx;
			color: rgba(37, 37, 37, 1);
			display: block;
			line-height: 65upx;
		}
		image {
			width: 66upx;
			height: 66upx;
			border-radius: 50%;
		}
		.names {
			font-size: 30upx;
			color: rgba(37, 37, 37, 1);
			line-height: 44upx;
			display: block;
		}
		.phone {
			font-size: 22upx;
			color: rgba(152, 152, 152, 1);
			display: block;
		}
	}
}
.prompt{
	display: block;
	text-align: center;
	font-size:22upx;
	color:rgba(152,152,152,1);
}
</style>
