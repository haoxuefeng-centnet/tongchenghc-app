<!-- 意见反馈 -->
<template>
	<view class="">
		<view class="boos-lise flex justify-between" style="border-bottom: solid #FFFFFF;">
			<view class="boos-title">问题描述</view>
			<text class="boos-icons" style="font-size: 22upx;">{{ remnant }}/500</text>
		</view>
		<view class="boos-text">
			<textarea
				type="text"
				v-model="text"
				@input="descInput"
				maxlength="500"
				placeholder="请输入车况具体描述"
				placeholder-class="textPlaceholder"
			/>
		</view>
		<view class="base" @tap="save">
			<view><button class="base-bottow" type="primary">保 存</button></view>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
import { feedack } from '../../api/user.js'
export default{
	data(){
		return{
			remnant: 0,
			text:''
		}
	},
	methods:{
		descInput() {
			this.remnant = this.text.length;
		},
		save(){
			if(!this.text){
				utils.showTextToast('请输入问题描述 ');
				return
			}
			feedack({feedbackContent: this.text}).then(res =>{
				if(res.code == 200){
					utils.showTextToast('反馈成功');
					setTimeout(function() {
						uni.navigateBack({
							delta: 1
						});
					}, 1000);
				}
			})
		}
	}
}
</script>

<style>
.base{
	position: fixed;
	bottom: 20upx;
}
</style>
