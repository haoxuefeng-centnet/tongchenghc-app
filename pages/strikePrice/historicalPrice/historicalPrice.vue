<!-- 查询成交价 -->
<template>
	<view class="historicalPrice">
		<scroll-view scroll-y style="height: 100%;" v-if="dataList.length">
			<view class="histor" @tap="jump(item.dealId)" v-for="item in dataList" :key="item.carId">
				<view class="histor">
					<view class="carMsg">
						<view class="carInfo">
							<view class="car">{{ item.brandSeries }}</view>
							<view class="price">￥{{ item.transactionPrice }}万</view>
						</view>
						<view class="carCondition">
							<view class="time">{{ item.carBoadTime }}上牌</view>
							<view class="city">{{ item.cityLocation }}</view>
							<view class="mileage">{{ item.carMileage }}万公里</view>
							<view class="volTime">成交于{{ item.createTime }}</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<UiLoading :loadingType="loadingType"></UiLoading>
	</view>
</template>

<script>
import utils from '../../../utils/utils.js';
import { dealList } from '../../../api/strikePrice.js';
import UiLoading from '../../../colorui/components/ui-loading.vue'
export default {
	components: {
			UiLoading
		},
	data() {
		return {
			dataList: [],
			loadingType:0
		};
	},
	onLoad() {
		
	},
	onShow() {
		uni.getStorage({
			key: 'queryData',
			success: res => {
				dealList(res.data).then(res => {
					if(res.code==200){
						this.loadingType=2;
						this.dataList = res.data || [];
					}
					if(this.dataList == ''){
						uni.showModal({
						    title: '提示',
						    content: '暂无数据,次数将会保留',
						    success: function (res) {
						        if (res.confirm) {
						            // console.log('用户点击确定');
						        } else if (res.cancel) {
						            // console.log('用户点击取消');
						        }
						    }
						});
					}
				});
			}
		});
	},
  methods: {
    jump(item){
      uni.navigateTo({
          url: '../priceDetails/priceDetails?dealId=' + item
      });
    }
  },
};
</script>

<style scoped lang="less">
.historicalPrice {
	height: 100vh;
	background: rgba(242, 242, 242, 1);
	padding-top: 16upx;
	.histor {
		margin-top: 16upx;
		.carMsg {
			width: 702upx;
			height: 132upx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 3upx 2upx 8upx 0upx rgba(189, 189, 189, 0.33);
			border-radius: 10upx;
			margin: 0 auto;
			padding: 22upx;
			.carInfo {
				display: flex;
				width: 100%;
				justify-content: space-between;
				.car {
					max-width: 76%;
					font-size: 30upx;
					line-height: 34upx;
					color: rgba(0, 0, 0, 1);
					overflow: hidden;
					-o-text-overflow: ellipsis;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}
				.price {
					font-size: 34upx;
					line-height: 34upx;
					color: rgba(250, 44, 34, 1);
				}
			}
			.carCondition {
				display: flex;
				justify-content: space-between;
        height:100%;
				.time,
				.city,
				.mileage,
				.volTime {
					font-size: 22upx;
					color: rgba(152, 152, 152, 1);
					line-height: 100upx;
				}
			}
		}
	}
	.notSynchronized{
		color: #252525;
		z-index: 10;
		width: 100%;
	}
}
</style>
