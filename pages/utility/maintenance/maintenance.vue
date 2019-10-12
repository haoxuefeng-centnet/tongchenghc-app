<!-- 查询列表 -->
<template>
	<view>
		<view class="maintenance">
			<view class="maintenance-search flex justify-between">
				<view class="maintenance-input">
					<input type="text" confirm-type="search" v-model="carName" @confirm="search()" placeholder="搜索" maxlength="17"/>
					<text class="iconfont">&#xe612;</text>
				</view>
				<view class="maintenance-text"  @tap="search()">搜索</view>
			</view>
			<scroll-view scroll-y style="height: 100%;">
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
			</scroll-view>
			<UiLoading :loadingType="loadingType"></UiLoading>
		</view>
	</view>
</template>

<script>
	import { loadMoreList } from '../../../mixins/index.js';
	import { insuranceList, maintenanceList } from '../../../api/thirdParty.js'
	import UiLoading from '../../../colorui/components/ui-loading.vue';
	export default {
		mixins: [loadMoreList],
		components: {UiLoading},
		data() {
			return {
				id:'',
				carName:''
			}
		},
		onLoad(option) {
			// option 1代表 维保页面跳转  2 代表车险页面跳转
			this.id = option.id
			if(this.id == 1){
				this.reqFn = maintenanceList;
			}else{
				this.reqFn = insuranceList;
			}
			this.reqValue = 'list';
			this.params.pageSizeKey = 100;
		},
		onShow(){
			this.getList()
		},
		methods: {
			// 第三方跳转
			jump(item,url){
				if(item == 0){
          const urls = encodeURIComponent(url)
					uni.navigateTo({
						url: `../Outside/Outside?urls=${urls}&item=${this.id}`
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
page{
	background-color: #F1F1F1;
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
