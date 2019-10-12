<!-- 罚款代缴 -->
<template>
	<view class="contenss">
		<web-view :src="urls"></web-view>
	</view>
</template>
<script>
import utils from '../../utils/utils.js';
import { easyDriver } from '../../api/thirdParty.js'
	export default {
		data() {
			return {
				urls:'',
			}
		},
		onShow() {
			easyDriver().then(res=>{
				if(res.code == 200){
					this.urls = res.data
				}else{
					utils.showTextToast('跳转失败请重试');
					uni.navigateBack({
						delta: 1
					});
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style>
.contenss{
	width: 100%;
	height: 100%;
}
</style>
