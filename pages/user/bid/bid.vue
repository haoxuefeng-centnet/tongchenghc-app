<!-- 查看出价 -->
<template>
	<view class="bid">
		<view class="vehicleList-content">
			<scroll-view scroll-y style="height: 100%;">
			<view class="vehicleList-contents" v-for="(item, index) in dataList" :key="index">
				<view class="layout" @tap="jump(item.carId)">
					<image :src="item.carImg1"></image>
					<view class="layoutList">
						<text class="layoutList-a layoutList-width">{{ item.brandSeries }}</text>
						<view class="layoutList-b layoutList-width flex ">
							<text>{{ item.carOldBoadTime}}年</text>
							<text class="layoutList-e">|</text>
							<text>{{ item.carMileage }}万公里</text>
							<text class="layoutList-e">|</text>
							<text>{{ item.cityLocation }}</text>
						</view>
						<view class="layoutList-c layoutList-width">
							<view>
								<text class="layoutList-c-price" v-if="item.interPrice">￥{{ item.interPrice }}万</text>
								<text class="layoutList-c-price" v-else>未定价</text>
								<!-- <text class="layoutList-c-prices" style=" text-decoration: line-through;">{{ item.costPrice }}万</text> -->
							</view>
							<view class="look">查看详情</view>
						</view>
					</view>
				</view>
			</view>
			</scroll-view>
			<UiLoading :loadingType="loadingType"></UiLoading>
		</view>
	</view>
</template>

<script>
import { bidList, bidSave } from '../../../api/user.js';
import utils from '../../../utils/utils.js';
import UiLoading from '../../../colorui/components/ui-loading.vue'
export default {
	components: {
			UiLoading
		},
	data() {
		return {
			dataList: [],
			modalName: null,
			perice: '',
			id: '',
			loadingType: 0,
			isVip: ''
		};
	},
	onShow() {
		uni.getStorage({
		    key: 'userInfo',
		    success: (res)=> {
		        this.isVip = res.data.isVip
		    }
		});
		this.get();
	},
	methods: {
		// 详情跳转
		jump(item){
			if(this.isVip){
				uni.navigateTo({
					url: 'checkPrice?carId=' + item
				});
			}else{
				utils.showTextToast('您还不是VIP请购买');
				setTimeout(function() {
					uni.navigateTo({
						url: '../VIPcenter/payVip',
					});
				}, 1500);
			}
		},
		get() {
			bidList().then(res => {
				if(res.code==200 && res.data.length){
					this.loadingType=2;
					this.dataList = res.data;
				this.dataList.forEach(item => {
					if (item.carOldBoadTime) {
						item.carOldBoadTime = item.carOldBoadTime.substring(0, 4)
					}
				})
				}else{
					this.loadingType=2;
				}
			});
		},
	}
};
</script>

<style scoped lang="less">
.bid {
	width: 100%;
	height: 100vh;
	background: rgba(242, 242, 242, 1);
}
.look{
	width:130upx;
	height:50upx;
	text-align: center;
	line-height: 50upx;
	background:linear-gradient(0deg,rgba(165,123,255,1),rgba(107,115,255,1));
	border-radius:10upx;
	font-size:24upx;
	font-weight:bold;
	color:rgba(255,254,254,1);
	position: absolute;
	right: 0;
}

</style>
