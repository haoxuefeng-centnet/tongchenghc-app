<!-- 车型识别 -->
<template>
	<view>
		<image src="../../static/icon/PIC@2x.png" mode=""></image>
		<view class="base">
			<button class="base-bottow" type="primary" @tap="upload('imags')">
				<text class="base-bottow-text">开 始 拍 摄</text>
			</button>
		</view>

	</view>
</template>

<script>
import utils from '../../utils/utils.js';
	export default {
		data() {
			return {
				imags:'' 
			}
		},
		methods: {
			// 图片上传
			upload(imgKey) {
				const that = this;
				utils.uploadImg({
					callback(res) {
						that[imgKey] = res.data;
					}
				});
			}
		}
	}
</script>

<style>
image{
	width: 100%;
	height: 70vh;
}
.base{
	margin-top: 10vh;
}
</style>
