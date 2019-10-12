<template>
	<view class="contents">
	<view class="vehicleList-content">
		<scroll-view scroll-y style="height: 100%;" v-if="dataList.length">
			<view class="vehicleList-contents" v-for="(item, index) in dataList" :key="index">
				
					<view class="layout" @tap="jump(item.carId)">
						<image :src="item.carImg1"></image>
						<view class="layoutList">
							<text class="layoutList-a layoutList-width">{{ item.brandSeries }}</text>
							<view class="layoutList-b layoutList-width flex ">
								<text>{{ item.carOldBoadTime}}年</text>
								<text class="layoutList-e">|</text>
								<text>{{ item.carMieage }}万公里</text>
								<text class="layoutList-e">|</text>
								<text>{{ item.cityLocation }}</text>
							</view>
							<view class="layoutList-c layoutList-width">
								<view>
									<text class="layoutList-c-price" v-if="item.interPrice">￥{{ item.interPrice }}万</text>
									<text class="layoutList-c-price" v-else>未定价</text>
									<!-- <text class="layoutList-c-prices" style=" text-decoration: line-through;">{{ item.costPrice }}万</text> -->
								</view>
								<text class="layoutList-c-right layoutList-c-prices">{{item.createTime}}</text>
							</view>
						</view>
					</view>
				
			</view>
		</scroll-view>
		<UiLoading :loadingType="loadingType" :isLoad="isLoad"></UiLoading>
	</view>
	</view> 
</template>

<script>
	import {
		storeList
	} from '../../api/smallShop.js'
	import utils from '../../utils/utils.js';
	import UiLoading from '../../colorui/components/ui-loading.vue'
	export default {
		components: {
				UiLoading
			},
		data() {
			return {
				id: '', //微店id
				carName: '', //微店搜索内容
				dataList: '',
				loadingType:0,
			}
		},
		onLoad(query) {
			this.id = query.id;
			this.carName = query.carName;
		},
		onShow() {
			storeList({storeId: this.id,keyword: this.carName}).then(res => {
				if (res.code == 200 && res.data.length) {
					this.loadingType=2;
					this.dataList = res.data;
					this.dataList.forEach(item => {
						if (item.carOldBoadTime) {
							item.carOldBoadTime = item.carOldBoadTime.substring(0, 4)
						}
					})
				} else {
					this.loadingType=2;
				}
			})
		},
    methods:{
      jump(item){
        uni.navigateTo({
            url: `vehicleDetails/vehicleDetails?carid=${item}&storeId=${this.id}`
        });
      }
    }
	}
</script>

<style lang="less">
page{
	background-color: #F1F1F1;
}
	.contents {
		width: 100%;
		text-align: center;
		margin: 0;
		background: rgba(242, 242, 242, 1);
		.content {
			margin: 16upx auto;
		}

		.notSynchronized {
			color: #252525;
			z-index: 10;
			width: 100%;
		}
	}
</style>
