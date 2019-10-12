<!-- 品牌车型选择 -->
<template>
	<view>
		<view class="branMdodels" @tap="limit"><view class="branMdodelsList">不限</view></view>
		<view class="branMdodels" v-for="(item, index) of modelsList" :key="index" >
			<view class="branMdodelsList" :data-brandName="item.brandName"  @tap="handleClick">{{ item.brandName }}</view>
		</view>
		<ScreenLoading :isShow="isShow"></ScreenLoading>
	</view>
	
</template>

<script>
import ScreenLoading from '../../../../colorui/components/screen-loading.vue'
import { brandInfos } from '../../../../api/models.js';
export default {
	components: {
		ScreenLoading
	},
	data() {
		return {
			id: '',
			name:'',
			modelsList: '',
			isShow: true
		};
	},
	methods: {
		// 不限
		limit(){
			uni.setStorage({
				key: 'brandName',
				data: this.name,
				success: function() {
					uni.navigateBack({
						delta: 3
					});
				}
			})
		},
		handleClick(e) {
			uni.setStorage({
				key: 'brandName',
				data: e.target.dataset.brandname,
				success: function () {
					uni.navigateBack({
						delta: 3
					});
				}
			});
		}
	},
	onLoad: function(option) {
		this.id = option.id;
		this.name = option.name;
	},
	onShow() {
		brandInfos({ brandId: this.id }).then(res => {
			if(res.code == 200){
				this.modelsList = res.data;
				this.isShow = false
			}
		});
	}
};
</script>

<style>
page {
	background: #ffffff;
}
.branMdodels {
	width: 100%;

	height: 70upx;
	border-bottom: 1px solid #e5e5e5;
}
.branMdodelsList {
	width: 93%;
	margin: 0 auto;
	text-align: left;
	height: 100%;
	line-height: 70upx;
}
</style>
