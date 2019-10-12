<template>
	<view class="city"><uni-select :listData="listData" :quickPanelData="quickPanelData" @chooseItem="chooseItem"></uni-select></view>
</template>

<script>
import city from '../../common/city.js';
import uniSelect from '../../components/lee-select/lee-select.vue';
export default {
	components: {
		uniSelect
	},
	data() {
		return {
			listData: city,
			quickPanelData: [
				{
					title: '热门城市',
					navName: '热',
					data: [],
					height: 224,
					titleColor: '#252525'
				}
			],
			listAttr: {
				listBackgroundColor: 'none',
				titleFontSize: 34,
				titleColor: '#252525',
				titleHeight: 60,
				titleBackground: '#ccc',
				titlePadding: 20,
				itemHeight: 80,
				itemFontSize: 34,
				itemBorderBottom: '1px solid rgba(0, 0, 0, 0.1)',
				itemColor: '#252525'
			},
			navAttr: {
				backgroundColor: 'rgba(0, 0, 0, 1)',
				color: '#252525',
				activeColor: '#fff',
				fontSize: 34,
				itemPadding: '6 0',
				borderRadius: 0,
				padding: '20 0'
			},
			type:''
		};
	},
	onLoad(query) {
		if(query.type){
			this.type=query.type;
		}
		if(query.city){
			this.quickPanelData[0].data = ['全国','北京', '上海', '成都', '重庆', '深圳', '昆明']
		}else{
			this.quickPanelData[0].data = ['北京', '上海', '成都', '重庆', '深圳', '昆明']
		}
	},
	methods: {
		chooseItem(item) {
			// 车辆归属地
			if(this.type){
				uni.setStorage({
				key: 'affiliation',
				data: item,
				success: function() {
					uni.navigateBack({
						delta:1
					})
				}
			});
			}
			else{
				// 地区
				uni.setStorage({
				key: 'cityName',
				data: item,
				success: function() {
					uni.navigateBack({
						delta: 1
					})
				}
			});
			}
			
		}
	}
};
</script>
<style lang="scss" scoped>
.city {
	width: 100%;
	margin-top: 0;
	padding-top: 0;
	height: 100vh;
}
</style>
