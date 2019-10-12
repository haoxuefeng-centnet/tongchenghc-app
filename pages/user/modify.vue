<!-- 个人信息修改 -->
<template>
	<view class="">
		<view class="boos-lise" style="height: 120upx;">
			<view class="boos-title">头像<text class="hint">*</text>
			</view>
			<view class="storePhoto" @tap="upload('cusAvatar')" v-if="formData.cusAvatar == ''"><text class="iconfont iconfontsize">&#xe81a;</text></view>
			<image class="storePhoto" @tap="upload('cusAvatar')" v-if="formData.cusAvatar != ''" :src="formData.cusAvatar"></image>
		</view>
		<view class="boos-lise">
			<view class="boos-title">昵称<text class="hint">*</text></view>
			<input type="text" v-model="formData.cusNick" maxlength="6" placeholder="请输入不超过6个字符" />
		</view>
		<view class="boos-lise" v-if="isAser">
			<view class="boos-title">地址<text class="hint">*</text></view>
			<navigator hover-class="none" class="boos-nvget" url="../home/city">
				<view class="nvgetboos contrue" :class="!formData.cityName ? 'active' : ''">{{ formData.cityName ? formData.cityName : '请选择' }}</view>
				<text class="iconfont boos-icons">&#xe627;</text>
			</navigator>
		</view>
		<view class="boos-lise" v-else>
			<view class="boos-title">地址<text class="hint">*</text></view>
			<view class="flex align-center boos-nvget">{{ formData.cityName }}</view>
		</view>
		<view class="base">
			<view><button class="base-bottow" type="primary" @tap="save">保存</button></view>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
import { cusUpdate } from '../../api/account.js';

export default {
	data() {
		return {
			formData: {
				cusAvatar: '', //头像
				cusNick: '' ,//微店名称
				cityName :'' //地址
			},
			isAser:true 
		};
	},
	onLoad() {
		uni.getStorage({
		    key: 'userInfo',
		    success: (res)=> {
				this.formData = res.data
				if(res.data.cityName){
					this.isAser = false
				}else{
					this.isAser = true
				}
		    }
		});
	},
	onShow() {
		// 所在地
		uni.getStorage({
			key: 'cityName',
			success: (res) => {
				this.formData.cityName = res.data;
			}
		});
	},
	onUnload() {
		uni.removeStorageSync('cityName');
	},
	methods: {
		//图片上传
		upload(imgKey) {
			const that = this;
			utils.uploadImg({
				callback(res) {
					that.formData[imgKey] = res.data;
				}
			});
		},
		save() {
			if(this.formData.cusAvatar == '' || this.formData.cusNick == ''){
				utils.showTextToast('请完善信息');
			}else{
				cusUpdate(this.formData).then(res =>{
					if(res.code == 200){
						utils.showTextToast('保存成功')
							uni.navigateBack({
								delta: 1
							});
						
					}else{
						utils.showTextToast('保存失败请重试');
					}
				})
			}
		}
	}
};
</script>

<style>
.base {
	position: fixed;
	bottom: 20upx;
}
.active {
	color: #7f7f7f;
}
</style>
