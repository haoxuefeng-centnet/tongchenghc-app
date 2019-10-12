<!-- 车辆信息已售详情 -->
<template>
	<view class="index">
		<view class="indexImage">
			<view class="indexImages">
				<image class="indexImages-image" :src="carData.carImg1" mode=""></image>
				<text class="indexImages-title">车辆照片</text>
			</view>
			<view class="indexImages">
				<image class="indexImages-image" :src="carData.carImg2" mode=""></image>
				<text class="indexImages-title">车辆照片</text>
			</view>
			<view class="indexImages">
				<image class="indexImages-image" :src="carData.carImg3" mode=""></image>
				<text class="indexImages-title">车辆照片</text>
			</view>
		</view>
		<!-- 基本信息 -->
		<view class="index-text">基本信息</view>
		<form @submit="submitFrom">
				<view class="boos-lise">
					<view class="boos-title" style="margin: auto 0;">车身颜色</view>
					<input placeholder="暂无" :value="carData.carColor" disabled="disabled" />
				</view>
				<view class="boos-lise">
					<view class="boos-title" style="margin: auto 0;">车辆类型</view>
					<input placeholder="暂无" :value="carData.carType" disabled="disabled" />
				</view>
				<view class="boos-lise">
					<view class="boos-title" style="margin: auto 0;">品牌车型</view>
					<input class="contrue" placeholder="暂无" :value="carData.brandSeries" disabled="disabled" />
				</view>
				<view class="boos-lise">
					<view class="boos-title" style="margin: auto 0;">表显里程</view>
					<input placeholder="暂无" :value="carData.carMileage" disabled="disabled" />
				</view>
				<view class="boos-lise">
					<view class="boos-title" style="margin: auto 0;">初次上牌</view>
					<input placeholder="暂无" :value="carData.carOldBoadTime" disabled="disabled" />
				</view>
				<view class="boos-lise">
					<view class="boos-title" style="margin: auto 0;">车牌号</view>
					<input placeholder="暂无" disabled="disabled" :value="carData.carLicense" />
				</view>
				<view class="boos-lise">
					<view class="boos-title" style="margin: auto 0;">使用性质</view>
					<input placeholder="暂无" disabled="disabled" :value="carData.carNature" />
				</view>
				<view class="boos-lise">
					<view class="boos-title" style="margin: auto 0;">出厂日期</view>
					<input placeholder="暂无" disabled="disabled" :value="carData.carFactoryTime" />
				</view>
				<view class="boos-lise">
					<view class="boos-title" style="margin: auto 0;">年检到期日</view>
					<input placeholder="暂无" disabled="disabled" :value="carData.carMaturityTime" />
				</view>
				<view class="boos-lise">
					<view class="boos-title" style="margin: auto 0;">钥匙数量</view>
					<input placeholder="暂无" :value="carData.keySum" disabled="disabled" />
				</view>
				<view class="boos-lise">
					<view class="boos-title" style="margin: auto 0;">车辆所在地</view>
					<input placeholder="暂无" :value="carData.cityAttribution" disabled="disabled" />
				</view>
				<view class="boos-lise">
					<view class="boos-title" style="margin: auto 0;">车辆归属地</view>
					<input placeholder="暂无" :value="carData.cityLocation" disabled="disabled" />
				</view>
				<view class="boos-lise" v-if="carData.isHandle">
					<view class="boos-title" style="margin: auto 0;" >姓名</view>
					<input placeholder="暂无" :value="carData.name" disabled="disabled" />
				</view>
				<view class="boos-lise" v-if="carData.isHandle">
					<view class="boos-title" style="margin: auto 0;" >联系电话</view>
					<input placeholder="暂无" :value="carData.phone" disabled="disabled" />
				</view>
				<view class="boos-lise">
					<view class="boos-title" style="margin: auto 0;">变速箱</view>
					<input placeholder="暂无" :value="carData.carGearbox" disabled="disabled" />
				</view>
				<view class="boos-lise">
					<view class="boos-title" style="margin: auto 0;">排放标准</view>
					<input placeholder="暂无" :value="carData.carDischarge" disabled="disabled" />
				</view>
				<view class="boos-lise">
					<view class="boos-title" style="margin: auto 0;">燃油类型</view>
					<input placeholder="暂无" :value="carData.fuelType" disabled="disabled" />
				</view>
				<view class="boos-lise justify-between">
					<view class="boos-title">评估师</view>
          <input placeholder="暂无" :value="carData.cusNick" disabled="disabled" />
				</view>
				<!--  -->
				<view class="boos-lise" style="border-bottom: solid #FFFFFF;">
					<view class="boos-title">描述</view>
				</view>
				<view class="boos-text">
					<textarea
						type="text"
						:value="carData.carDescribe"
					     disabled="disabled"
						
					/>
				</view>
				<view class="index-text">价格信息</view>
				<!--  -->
				<view class="boos-lise" v-if="carData.isHandle">
					<view class="boos-title">成本价</view>
					<input placeholder="暂无" :value="carData.costPrice" disabled="disabled"  name="costPrice" />
					<text class=" boos-iconst-text">万元</text>
				</view>
				<view class="boos-lise">
					<view class="boos-title">网络标价</view>
					<input placeholder="暂无" disabled="disabled" :value="carData.interPrice" name="wholesalePrice" />
					<text class=" boos-iconst-text">万元</text>
				</view>
				<view class="boos-lise" v-if="carData.isHandle">
					<view class="boos-title">成交价({{carData.sellType == 1 ? '零售' : '批发'}})</view>
					<input placeholder="暂无" disabled="disabled" :value="carData.transactionPrice" name="interPrice" />
					<text class="boos-iconst-text">万元</text>
				</view>
					<view class="formalities "><text>手续信息</text></view>
				<view class="tabList">
					<text class="tabtitle">购置税证</text>
					<view class="tabList-content">
						<text class="iconfont radio" v-if="carData.purchaseTax != 1"></text>
						<text class="iconfont" v-if="carData.purchaseTax == 1" style="color: #A57BFF;font-size: 38upx;">&#xe659;</text>
						<text style="margin-left: 17upx ;">有</text>
						<text class="iconfont" v-if="carData.purchaseTax == 2" style="color: #A57BFF;font-size: 38upx;margin-left: 17upx;">&#xe659;</text>
						<text class="iconfont radio" v-if="carData.purchaseTax != 2"></text>
						<text style="margin-left: 17upx ;">无</text>
					</view>
				</view>
				<view class="tabList">
					<text class="tabtitle">行驶证</text>
					<view class="tabList-content">
						<text class="iconfont radio" v-if="carData.carDrlicense != 1"></text>
						<text class="iconfont" v-if="carData.carDrlicense == 1" style="color: #A57BFF;font-size: 38upx;">&#xe659;</text>
						<text style="margin-left: 17upx ;">有</text>
						<text class="iconfont" v-if="carData.carDrlicense == 2" style="color: #A57BFF;font-size: 38upx;margin-left: 17upx;">&#xe659;</text>
						<text class="iconfont radio" v-if="carData.carDrlicense != 2"></text>
						<text style="margin-left: 17upx ;">无</text>
					</view>
				</view>
				<view class="tabList">
					<text class="tabtitle">登记证</text>
					<view class="tabList-content">
						<text class="iconfont radio" v-if="carData.regCertificate != 1"></text>
						<text class="iconfont" v-if="carData.regCertificate == 1" style="color: #A57BFF;font-size: 38upx;">&#xe659;</text>
						<text style="margin-left: 17upx ;">有</text>
						<text class="iconfont" v-if="carData.regCertificate == 2" style="color: #A57BFF;font-size: 38upx;margin-left: 17upx;">&#xe659;</text>
						<text class="iconfont radio" v-if="carData.regCertificate != 2"></text>
						<text style="margin-left: 17upx ;">无</text>
					</view>
				</view>
				<view class="tabList">
					<text class="tabtitle">原车主身份证</text>
					<view class="tabList-content">
						<text class="iconfont radio" v-if="carData.oldIdcard != 1"></text>
						<text class="iconfont" v-if="carData.oldIdcard == 1" style="color: #A57BFF;font-size: 38upx;">&#xe659;</text>
						<text style="margin-left: 17upx ;">有</text>
						<text class="iconfont" v-if="carData.oldIdcard == 2" style="color: #A57BFF;font-size: 38upx;margin-left: 17upx;">&#xe659;</text>
						<text class="iconfont radio" v-if="carData.oldIdcard != 2"></text>
						<text style="margin-left: 17upx ;">无</text>
					</view>
				</view>
				<view class="tabList">
					<text class="tabtitle">新车发票</text>
					<view class="tabList-content">
						<text class="iconfont radio" v-if="carData.ncInvoice != 1"></text>
						<text class="iconfont" v-if="carData.ncInvoice == 1" style="color: #A57BFF;font-size: 38upx;">&#xe659;</text>
						<text style="margin-left: 17upx ;">有</text>
						<text class="iconfont" v-if="carData.ncInvoice == 2" style="color: #A57BFF;font-size: 38upx;margin-left: 17upx;">&#xe659;</text>
						<text class="iconfont radio" v-if="carData.ncInvoice != 2"></text>
						<text style="margin-left: 17upx ;">无</text>
					</view>
				</view>
				<view class="tabList">
					<text class="tabtitle">交强险单</text>
					<view class="tabList-content">
						<text class="iconfont radio" v-if="carData.nciManual != 1"></text>
						<text class="iconfont" v-if="carData.nciManual == 1" style="color: #A57BFF;font-size: 38upx;">&#xe659;</text>
						<text style="margin-left: 17upx ;">有</text>
						<text class="iconfont" v-if="carData.nciManual == 2" style="color: #A57BFF;font-size: 38upx;margin-left: 17upx;">&#xe659;</text>
						<text class="iconfont radio" v-if="carData.nciManual != 2"></text>
						<text style="margin-left: 17upx ;">无</text>
					</view>
				</view>
				<view class="tabList">
					<text class="tabtitle">商业险单</text>
					<view class="tabList-content">
						<text class="iconfont radio" v-if="carData.calInsurance != 1"></text>
						<text class="iconfont" v-if="carData.calInsurance == 1" style="color: #A57BFF;font-size: 38upx;">&#xe659;</text>
						<text style="margin-left: 17upx ;">有</text>
						<text class="iconfont" v-if="carData.calInsurance == 2" style="color: #A57BFF;font-size: 38upx;margin-left: 17upx;">&#xe659;</text>
						<text class="iconfont radio" v-if="carData.calInsurance != 2"></text>
						<text style="margin-left: 17upx ;">无</text>
					</view>
				</view>
				<view class="tabList">
					<text class="tabtitle">车船税证</text>
					<view class="tabList-content">
						<text class="iconfont radio" v-if="carData.cbTax != 1"></text>
						<text class="iconfont" v-if="carData.cbTax == 1" style="color: #A57BFF;font-size: 38upx;">&#xe659;</text>
						<text style="margin-left: 17upx ;">有</text>
						<text class="iconfont" v-if="carData.cbTax == 2" style="color: #A57BFF;font-size: 38upx;margin-left: 17upx;">&#xe659;</text>
						<text class="iconfont radio" v-if="carData.cbTax != 2"></text>
						<text style="margin-left: 17upx ;">无</text>
					</view>
				</view>
		</form>
	</view>
</template>
<script>
import { carInfo } from '../../api/home.js';
export default {
	data() {
		return {
			carId: '',
			carData: ''
		};
	},
	onLoad(query) {
		this.carId = query.carId;
	},
	onShow() {
		carInfo({ carId: this.carId }).then(res => {
			this.carData = res.data;
			for(var i in this.carData){
				if(this.carData[i] == '' || this.carData[i] == null){
					this.carData[i] = ''
				}
			}
		});
	},
	
};
</script>
<style scoped lang="less">
.radio {
	width: 32upx;
	height: 32upx;
	border-radius: 50%;
	border: 2upx solid rgba(208, 208, 208, 1);
	margin-left: 17upx;
}
.index {
	width: 100%;
	padding: 16upx 0;
	border-top: 1upx solid #f9f9f9;
	height: 100%;
}
.boos-title {
	width: 37%;
}
.boos-lise {
	justify-content: space-between;
}
.boos-text {
	margin-bottom: 20upx;
}
.formalities {
	width: 100%;
	background: #ffffff;
}
.formalities text {
	width: 93.3%;
	height: 80upx;
	line-height: 80upx;
	text-align: center;
	margin: 0 auto;
	border: 1px solid rgba(183, 183, 183, 1);
	border-radius: 2px;
	display: block;
	font-size: 28upx;
}
input{
	width: 100%;
	padding-left: 0
}
</style>
