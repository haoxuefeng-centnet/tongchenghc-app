<template>
	<view class="vehicleList-content">
		<scroll-view scroll-y style="height: 100%;">
			<view class="vehicleList-contents" v-for="item in list" :key="item.carId">
				<view @tap="goCarInfo(item)">
					<view class="layout">
						<image :src="item.carImg1"></image>
						<view class="layoutList">
							<text class="layoutList-a layoutList-width">{{ item.brandSeries || '——' }}</text>
							<view class="layoutList-b layoutList-width">
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
			</view>
		</scroll-view>
		<UiLoading :loadingType="loadingType"></UiLoading>
	</view>
</template>

<script>
	import UiLoading from '../../colorui/components/ui-loading.vue';
	import utils from '../../utils/utils.js';
	import {getShareList, storeCarList} from '../../api/share.js';
	export default {
		components: {
			UiLoading
		},
		data() {
			return {
				list: [],
				loadingType: 0,
				fromType: 2,
				listFn: null,
				cusId: ''
			}
		},
		onLoad(route) {
			this.fromType = route.type;
			this.cusId = route.cusId;
      switch(Number(this.fromType)) {
      	case 2:
      	// 分享微店车源列表	
      	this.listFn = storeCarList
      	break;
      	case 3:
      	// 获取分享平台车辆列表
      	this.listFn = getShareList;
      	break;
      	default:
      	this.listFn = getShareList;
      	break;
      }
      // 本地是否已存在参数
      uni.getStorage({
        key: 'shareParams',
        success(res) {
         let data = res.data;
          uni.setStorageSync('shareParams', { ...data, ...route});
        },
        fail(err) {
          uni.setStorageSync('shareParams', route);
        }
      }),
      this.getShareListData(route.shareIds, route.storeId || '');
		},
    onShow() {
    },
		methods: {
			getShareListData(shareIds, storeId = null) {
				if (!this.listFn) {
					console.error('请传入listFn');
					return false;
				}
				this.listFn({carIds:shareIds, storeId}).then(res => {
          this.loadingType = 2;
				if (res.code === 200) {
					this.list = res.data;
          console.log(this.list);
          this.list.forEach(item => {
          	if (item.carOldBoadTime) {
          		item.carOldBoadTime = item.carOldBoadTime.substring(0, 4)
          	}
          })
				}
			}).catch(err => {
        this.loadingType = 2;
      })
			},
			goCarInfo(item) {
				const that = this;
			if (Number(that.fromType) === 3) {
					uni.navigateTo({
						url: './shareInfo?carId=' + item.carId + '&cusId=' + this.cusId
					})
				} else {
					uni.navigateTo({
						url: './storeCarInfo?carId=' + item.carId + '&cusId=' + this.cusId
					})
				}
			}
		}
	}
</script>

<style>
</style>
