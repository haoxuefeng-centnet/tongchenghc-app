<!-- 卖车新增 -->
<template>
	<view class="index">
		<!-- image 上传-->
		<view class="indexImage">
			<view class="indexImages">
				<view class="indexImages-a" @tap="upload('carImg1')" v-if="formData.carImg1 == ''">
					<text class="iconfont iconfontsize">&#xe81a;</text>
					<text>上传照片</text>
				</view>
				<image class="indexImages-image" @tap="upload('carImg1')" v-if="formData.carImg1 != ''" :src="formData.carImg1" ></image>
				<text class="indexImages-title">车辆照片</text>
			</view>
			<view class="indexImages">
				<view class="indexImages-a" @tap="upload('carImg2')" v-if="formData.carImg2 == ''">
					<text class="iconfont iconfontsize">&#xe81a;</text>
					<text>上传照片</text>
				</view>
				<image class="indexImages-image" @tap="upload('carImg2')" v-if="formData.carImg2 != ''" :src="formData.carImg2" ></image>
				<text class="indexImages-title">车辆照片</text>
			</view>
			<view class="indexImages">
				<view class="indexImages-a" @tap="upload('carImg3')" v-if="formData.carImg3 == ''">
					<text class="iconfont iconfontsize">&#xe81a;</text>
					<text>上传照片</text>
				</view>
				<image class="indexImages-image" @tap="upload('carImg3')" v-if="formData.carImg3 != ''" :src="formData.carImg3" ></image>
				<text class="indexImages-title">车辆照片</text>
			</view>
		</view>
		<view class="index-text">基本信息</view>
		<form>
			<view class="boos">
				<view class="boos-lise" style="border-bottom: solid #FFFFFF;">
					<view class="boos-title">买主要求<text class="hint">*</text></view>
					<text class="boos-icons" style="font-size: 22upx;">{{ formData.claim.length }}/500</text>
				</view>
				<view class="boos-text">
					<textarea
						type="text"
						v-model="formData.claim"
						maxlength="500"
						placeholder="请输入车况具体描述"
						placeholder-class="textPlaceholder"
					/>
				</view>
				<view class="boos-lise">
					<view class="boos-title"><text>车主联系方式</text><text class="hint">*</text></view>
					<input class="boos-picker-width" style="width: 81%;" placeholder="请输入手机号" v-model="formData.phone" maxlength="11" type="number" />
				</view>
				<view class="boos-lise">
					<view class="boos-title"><text>车主期望价格</text><text class="hint">*</text></view>
					<input class="boos-picker-width" maxlength="9" placeholder="请输入您的期望价格" v-model="formData.hopePrice" type="digit" />
					<text class="iconfont boos-icons" style="font-size: 24upx; width: 10%;">万元</text>
				</view>
			</view>
			<view class="base"><button class="base-bottow" @tap="submitFrom">保 存</button></view>
		</form>
	</view>
</template>
<script>
import utils from '../../../utils/utils.js';
import {updateSell, payAdd, Info ,sellInfo} from '../../../api/collectlist.js';
export default {
	data() {
		return {
			formData:{
				carImg1:'',
				carImg2:'',
				carImg3:'',
				claim:'',
				phone:'',
				hopePrice:''
			}
		};
	},
	onLoad(query) {
		this.id = query.carId;
	},
	onShow() {
		if(this.id){
			sellInfo({ sellCarId: this.id }).then(res => {
				if(res.code == 200){
					this.formData = res.data;
					for (var i in res.data) {
						if (!res.data[i] && res.data[i] !== 0) {
							res.data[i] = ''
						}
					}
				}
			});	
		}
	},
	methods: {
		// 图片上传
		upload(imgKey) {
			const that = this;
			utils.uploadImg({
				callback(res) {
					that.formData[imgKey] = res.data;
				}
			});
		},
		submitFrom() {
			if ( this.formData.claim =='' || this.formData.phone == '' || this.formData.hopePrice == ''  ) {
				utils.showTextToast('请完善您的信息');
				return
			}else{
        if(!/^\d+(\.\d{1,2})?$/.test(this.formData.hopePrice)){
                utils.showTextToast('期望价格小数点后最多两位');
                return;
              }
				if(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.formData.phone)){
					if(this.formData.sellStatus == 0){
						updateSell(this.formData).then(res=>{
							if(res.code == 200){
								utils.showTextToast('修改成功');
								uni.navigateBack({
									delta: 1
								});
							} else {
								utils.showTextToast('修改失败');
							}
						})
					}else {
						payAdd( this.formData ).then(res => {
							if (res.code == 200) {
								utils.showTextToast('保存成功');
								uni.navigateBack({
									delta: 1
								});
							} else {
								utils.showTextToast('保存失败');
							}
						});
					}
				}else{
					utils.showTextToast('手机号有误请重新输入');
				}
			}
		}
	}
};
</script>

<style scoped lang="less">
.index {
	width: 100%;
	padding: 16upx 0;
	background: #ffffff;
	border-top: 1upx solid #f9f9f9;
}
.boos-lise {
	display: flex;
	justify-content: space-between;
}
.boos-title {
	width: 35%;
	color: #000000;
}
.base {
	position: fixed;
	bottom: 20upx;
	.base-bottow {
		color: #fff;
	}
}
.boos-picker-width{
	width: 70%;
}
</style>
