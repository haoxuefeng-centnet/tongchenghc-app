<!-- 求购信息 -->
<template>
	<view>
		<view class="boos">
			<form @submit="submitForm">
				<view class="boos-lise">
					<view class="boos-title">品牌车型<text class="hint">*</text></view>
					<navigator hover-class="none" class="boos-nvget" url="../../modelsChoose/brand">
						<view class="nvgetboos contrue" name="" :class="[carType == '' ? 'active' : '']">{{ carType != '' ? carType : '请选择' }}</view>
						<text class="iconfont boos-icons">&#xe627;</text>
					</navigator>
				</view>
				<view class="boos-lise">
					<view class="boos-title">姓名</view>
					<input class="boos-picker-width" name="name" maxlength="11" type="text" placeholder="请输入姓名" />
				</view>
				<view class="boos-lise">
					<view class="boos-title">联系方式<text class="hint">*</text></view>
					<input class="boos-picker-width" name="phone" maxlength="11" type="number" placeholder="请输入电话号码" />
				</view>
				<view class="boos-lise" style="border-bottom: solid #FFFFFF;">
					<view class="boos-title">描述</view>
					<text class="boos-icons" style="font-size: 22upx;">{{ text.length }}/500</text>
				</view>
				<view class="boos-text">
					<textarea
						type="text"
						value=""
						maxlength="500"
						@onkeyup="keyUp"
						name="text"
						v-model="text"
						placeholder="请输入车况具体描述"
						placeholder-class="textPlaceholder"
					/>
				</view>
				<view class="base">
					<button class="base-bottow" form-type="submit"><text class="base-bottow-text">提 交</text></button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
import { wantPay  } from '../../../api/smallShop.js';
import utils from '../../../utils/utils.js';
export default {
	name: 'Duetocollect',
	data() {
		return {
			remnant: 0,
			text: '',
			storeId:'' ,//微店ID
			carType:'' ,//车型,
			id:'' //推送人ID
		};
	},
	onLoad(option) {
		this.storeId = option.storeId
		this.id = option.cusids
	},
	onShow() {
		// 车型
		uni.getStorage({
			key: 'brandName',
			success: res => {
				this.carType = res.data;
				if (this.carType != '') {
					uni.removeStorage({
						key: 'brandName'
					});
				}
			}
		});
	},
	methods: {
		submitForm(e) {
			if( this.carType === ''  ){
				utils.showTextToast('请选择车型');
				return
			}
			if(!/^1(3|4|5|6|7|8|9)\d{9}$/.test(e.detail.value.phone)){
				utils.showTextToast('手机号码填写有误');
				return
			}
			wantPay({phone:e.detail.value.phone, cusNick:e.detail.value.name, carType: this.carType, description: e.detail.value.text, storeId: this.storeId , pushCusId: this.id }).then(res => {
				if(res.code==200){
					uni.showModal({
					    title: '提示',
					    content: '信息已提交,相关人员会尽快与你联系',
					    showCancel: false,
					    success: function (res) {
					        if (res.confirm) {
					            uni.navigateBack({
					            	delta: 1
					            });
					        }
					    }
					});
				}else{
          utils.showTextToast('提交失败');
        }
			});
		}
	}
};
</script>

<style scoped lang="less">
html {
	border-top: 2upx solid #f1f1f1;
	background: #ffffff;
}
.textPlaceholder {
	font-size: 24upx;
	color: #989898;
}
.boos-lise {
	justify-content: space-between;
}
.base {
	position: fixed;
	bottom: 20upx;
	text {
		color: #fff;
	}
}
.on{
	border:4upx solid #A57BFF;
	background: #fff;
}
.active {
	color: #7f7f7f;
}
.boos-picker-width{
	margin-left: 10upx;
}
</style>
