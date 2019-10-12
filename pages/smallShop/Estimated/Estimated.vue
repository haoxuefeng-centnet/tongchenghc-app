<!-- 估价 -->
<template>
	<view class="">
		<form>
				<view class="boos-lise">
					<view class="boos-title">品牌车型<text class="hint">*</text></view>
					<navigator hover-class="none" class="boos-nvget contrue" url="../../modelsChoose/brand">
						<view class="nvgetboos contrue" :class="[formData.carType == '' ? 'active' : '']">{{ formData.carType != '' ? formData.carType : '请选择' }}</view>
						<text class="iconfont boos-icons">&#xe627;</text>
					</navigator>
				</view>
			<view class="boos-lise">
					<view class="boos-title">初次上牌<text class="hint">*</text></view>
					<picker class="boos-picker boos-picker-width" mode="date" :value="startDate" start="1995-0-0" end="endDate"
					 @change="DateChange">
						<view class="pickerboos" :class="formData.boardTime == '' ? 'active' : ''">{{ formData.boardTime != '' ? formData.boardTime : '请选择' }}</view>
						<view class="iconfont boos-icons"> &#xe627;</view>
					</picker>
				</view>
			<view class="boos-lise">
				<view class="boos-title">行驶里程<text class="hint">*</text></view>
				<input style="width: 68%;" maxlength="8" v-model="formData.mileage" type="digit" placeholder="最多两位小数"></input>
				<text class="iconfont boos-icons" style="font-size: 24upx; width: 14%; margin-right: 10upx;">万公里</text>
			</view>
			<view class="boos-lise">
				<view class="boos-title">联系方式<text class="hint">*</text></view>
				<input class="boos-picker-width" v-model="formData.contactPhone" maxlength="11" type="number" placeholder="请输入手机号"></input>
			</view>
			<view class="boos">
				<view class="boos-lise" style="border-bottom: solid #FFFFFF;">
				    <view class="boos-title">描述</view>
					<text class="boos-icons" style="font-size: 22upx;" ></text>
				</view>	
				<view class="boos-text">
					<textarea v-model="formData.appraisalDescribe" type="text"   maxlength="500" placeholder="请输入车况具体描述" placeholder-class="textPlaceholder" />
				</view>
			</view>
			<button type="primary" class="query" @tap="check">立即查询</button>
		</form>
	</view>
</template>

<script>
import { carValuation } from '../../../api/smallShop.js'
import utils from '../../../utils/utils.js';
import cityData from '../../../components/cityData.js';
export default{
	data(){
		return{
			cityData:cityData, //城市联动
			formData:{
				boardTime:'', // 上牌时间
				carType:'' , //品牌车型
				mileage:'' ,  //车辆里程
				contactPhone:'' , //联系方式
				storeId:'' , //微店ID
				pushCusId:'' ,//推送人
				appraisalDescribe:''
			}
		}
	},
	onLoad(option) {
		this.formData.storeId = option.storeId
		this.formData.pushCusId = option.cusids
	},
	onShow() {
		// 品牌车型数据
		uni.getStorage({
			key: 'brandName',
			success: res => {
				this.formData.carType = res.data;
				if (this.brandSeries != '') {
					uni.removeStorage({
						key: 'brandName'
					});
				}
			}
		});
	},
	methods:{
		//上牌时间
		DateChange(e) {
			this.formData.boardTime = e.detail.value
		},
		//查询
		check(){
			const data = this.formData
			if(data.boardTime == '' || data.carType == ''|| data.mileage == '' || data.contactPhone == ''  ){
				utils.showTextToast('请完善信息');
				return
			}
			if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.formData.contactPhone)) {
				utils.showTextToast('请输入正确手机号码');
				return;
			}
			const shareParams = uni.getStorageSync('shareParams') || {};
			carValuation(this.formData).then(res=>{
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
			})
		}
	}
}
</script>

<style scoped lang="less">
.query {
	width: 500upx;
	height: 100upx;
	background: linear-gradient(0deg, rgba(165, 123, 255, 1), rgba(107, 115, 255, 1));
	border-radius: 20upx;
	position: absolute;
	bottom: 16upx;
	left: 125upx;
	line-height: 100upx;
	letter-spacing:8px;
}
&.on{
	border:4upx solid #A57BFF;
}
.borderred{
	border:2upx solid #BABABA;
}
.active{
	color: #808080;
}
.boos-contents{
	width: 87%;
	height: 100%;
	font-size: 24upx;
	align-items: center;
	overflow: hidden;
}
.boos-title{
	width: 24%;
}
.boos-icons{
	width: 0;
	margin-right: 30upx;
}
.title-bottom{
	font-size:24upx;
	color:rgba(152,152,152,1);
	width: 15%;
	line-height: 105upx;
	text-align: right;
}
.boos-nvget{
	width: 85%;
}
</style>
