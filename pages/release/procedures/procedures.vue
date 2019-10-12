<!-- 手续信息  -->
<template>
	<view class="index">
		<view class="tabList">
			<text class="tabtitle">购置税证</text>
			<view class="tabList-content">
				<text class="iconfont radio" @tap="carTax(3)" v-if="purchaseTax != 1">&#xe75b;</text>
				<text class="iconfont" @tap="carTax(1)" v-if="purchaseTax == 1" style="width: 50upx; color: #A57BFF;font-size: 38upx;">&#xe659;</text>
				<text >有</text>
				<text class="iconfont" @tap="carTax(2)" v-if="purchaseTax == 2" style=" width: 50upx; color: #A57BFF;font-size: 38upx;margin-left: 17upx;">&#xe659;</text>
				<text class="iconfont radio" @tap="carTax(4)" v-if="purchaseTax != 2">&#xe75b;</text>
				<text >无</text>
			</view>
		</view>
		<view class="tabList">
			<text class="tabtitle">行驶证</text>
			<view class="tabList-content">
				<text class="iconfont radio" @tap="carpurchase(3)" v-if="carDrlicense != 1">&#xe75b;</text>
				<text class="iconfont" @tap="carpurchase(1)" v-if="carDrlicense == 1" style="width: 50upx; color: #A57BFF;font-size: 38upx;">&#xe659;</text>
				<text >有</text>
				<text class="iconfont" @tap="carpurchase(2)" v-if="carDrlicense == 2" style="width: 50upx; color: #A57BFF;font-size: 38upx;margin-left: 17upx;">&#xe659;</text>
				<text class="iconfont radio" @tap="carpurchase(4)" v-if="carDrlicense != 2">&#xe75b;</text>
				<text >无</text>
			</view>
		</view>
		<view class="tabList">
			<text class="tabtitle">登记证</text>
			<view class="tabList-content">
				<text class="iconfont radio" @tap="regist(3)" v-if="regCertificate != 1">&#xe75b;</text>
				<text class="iconfont" @tap="regist(1)" v-if="regCertificate == 1" style="width: 50upx; color: #A57BFF;font-size: 38upx;">&#xe659;</text>
				<text >有</text>
				<text class="iconfont" @tap="regist(2)" v-if="regCertificate == 2" style="width: 50upx; color: #A57BFF;font-size: 38upx;margin-left: 17upx;">&#xe659;</text>
				<text class="iconfont radio" @tap="regist(4)" v-if="regCertificate != 2">&#xe75b;</text>
				<text >无</text>
			</view>
		</view>
		<view class="tabList">
			<text class="tabtitle">原车主身份证</text>
			<view class="tabList-content">
				<text class="iconfont radio" @tap="identitycard(3)" v-if="oldIdcard != 1">&#xe75b;</text>
				<text class="iconfont" @tap="identitycard(1)" v-if="oldIdcard == 1" style="width: 50upx; color: #A57BFF;font-size: 38upx;">&#xe659;</text>
				<text >有</text>
				<text class="iconfont" @tap="identitycard(2)" v-if="oldIdcard == 2" style="width: 50upx; color: #A57BFF;font-size: 38upx;margin-left: 17upx;">&#xe659;</text>
				<text class="iconfont radio" @tap="identitycard(4)" v-if="oldIdcard != 2">&#xe75b;</text>
				<text >无</text>
			</view>
		</view>
		<view class="tabList">
			<text class="tabtitle">新车发票</text>
			<view class="tabList-content">
				<text class="iconfont radio" @tap="carreceipt(3)" v-if="ncInvoice != 1">&#xe75b;</text>
				<text class="iconfont" @tap="carreceipt(1)" v-if="ncInvoice == 1" style="width: 50upx; color: #A57BFF;font-size: 38upx;">&#xe659;</text>
				<text >有</text>
				<text class="iconfont" @tap="carreceipt(2)" v-if="ncInvoice == 2" style="width: 50upx; color: #A57BFF;font-size: 38upx;margin-left: 17upx;">&#xe659;</text>
				<text class="iconfont radio" @tap="carreceipt(4)" v-if="ncInvoice != 2">&#xe75b;</text>
				<text >无</text>
			</view>
		</view>
		<view class="tabList">
			<text class="tabtitle">交强险单</text>
			<view class="tabList-content">
				<text class="iconfont radio" @tap="carinsurance(3)" v-if="nciManual != 1">&#xe75b;</text>
				<text class="iconfont" @tap="carinsurance(1)" v-if="nciManual == 1" style="width: 50upx; color: #A57BFF;font-size: 38upx;">&#xe659;</text>
				<text >有</text>
				<text class="iconfont" @tap="carinsurance(2)" v-if="nciManual == 2" style="width: 50upx; color: #A57BFF;font-size: 38upx;margin-left: 17upx;">&#xe659;</text>
				<text class="iconfont radio" @tap="carinsurance(4)" v-if="nciManual != 2">&#xe75b;</text>
				<text >无</text>
			</view>
		</view>
		<view class="tabList">
			<text class="tabtitle">商业险单</text>
			<view class="tabList-content">
				<text class="iconfont radio" @tap="carbusiness(3)" v-if="calInsurance != 1">&#xe75b;</text>
				<text class="iconfont" @tap="carbusiness(1)" v-if="calInsurance == 1" style="width: 50upx; color: #A57BFF;font-size: 38upx;">&#xe659;</text>
				<text >有</text>
				<text class="iconfont" @tap="carbusiness(2)" v-if="calInsurance == 2" style="width: 50upx; color: #A57BFF;font-size: 38upx;margin-left: 17upx;">&#xe659;</text>
				<text class="iconfont radio" @tap="carbusiness(4)" v-if="calInsurance != 2">&#xe75b;</text>
				<text >无</text>
			</view>
		</view>
		<view class="tabList">
			<text class="tabtitle">车船税证</text>
			<view class="tabList-content">
				<text class="iconfont radio" @tap="carvehiclelicense(3)" v-if="cbTax != 1">&#xe75b;</text>
				<text class="iconfont" @tap="carvehiclelicense(1)" v-if="cbTax == 1" style="width: 50upx; color: #A57BFF;font-size: 38upx;">&#xe659;</text>
				<text >有</text>
				<text class="iconfont" @tap="carvehiclelicense(2)" v-if="cbTax == 2" style="width: 50upx; color: #A57BFF;font-size: 38upx;margin-left: 17upx;">&#xe659;</text>
				<text class="iconfont radio" @tap="carvehiclelicense(4)" v-if="cbTax != 2">&#xe75b;</text>
				<text >无</text>
			</view>
		</view>
		<view class="base">
			<button class="base-bottow" type="primary" @tap="save">
				<text class="base-bottow-text">保</text>
				<text class="base-bottow-text">存</text>
			</button>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			purchaseTax: 1,
			carDrlicense: 1,
			regCertificate: 1,
			oldIdcard: 1,
			ncInvoice: 1,
			nciManual: 1,
			calInsurance: 1,
			cbTax: 1
		};
	},
	onShow() {
		uni.getStorage({
			key: 'carInformation',
			success: res => {
				if (res.data) {
					this.purchaseTax = res.data.purchaseTax;
					this.carDrlicense = res.data.carDrlicense;
					this.regCertificate = res.data.regCertificate;
					this.oldIdcard = res.data.oldIdcard;
					this.ncInvoice = res.data.ncInvoice;
					this.nciManual = res.data.nciManual;
					this.calInsurance = res.data.calInsurance;
					this.cbTax = res.data.cbTax;
				}
			}
		});
	},
	methods: {
		// 手续信息
		carTax(index) {
			
			if (index == 3) {
				this.purchaseTax = 1;
			} else {
				this.purchaseTax = 2;
			}
		},
		// 行驶证
		carpurchase(index) {
			if (index == 3) {
				this.carDrlicense = 1;
			} else {
				this.carDrlicense = 2;
			}
		},
		// 登记证
		regist(index) {
			if (index == 3) {
				this.regCertificate = 1;
			} else {
				this.regCertificate = 2;
			}
		},
		// 原车主身份证
		identitycard(index) {
			if (index == 3) {
				this.oldIdcard = 1;
			} else {
				this.oldIdcard = 2;
			}
		},
		// 发票
		carreceipt(index) {
			if (index == 3) {
				this.ncInvoice = 1;
			} else {
				this.ncInvoice = 2;
			}
		},
		// 交强险
		carinsurance(index) {
			if (index == 3) {
				this.nciManual = 1;
			} else {
				this.nciManual = 2;
			}
		},
		// 商业险
		carbusiness(index) {
			if (index == 3) {
				this.calInsurance = 1;
			} else {
				this.calInsurance = 2;
			}
		},
		// 车船
		carvehiclelicense(index) {
			if (index == 3) {
				this.cbTax = 1;
			} else {
				this.cbTax = 2;
			}
		},
		save() {
			let data = {
				purchaseTax: this.purchaseTax,
				carDrlicense: this.carDrlicense,
				regCertificate: this.regCertificate,
				oldIdcard: this.oldIdcard,
				ncInvoice: this.ncInvoice,
				nciManual: this.nciManual,
				calInsurance: this.calInsurance,
				cbTax: this.cbTax
			};
			uni.setStorage({
				key: 'carInformation',
				data: data,
				success: function() {
					uni.navigateBack({
						delta: 1
					});
				}
			});
		}
	}
};
</script>
<style>
.base {
	position: fixed;
	bottom: 20upx;
}
.radio {
	width: 50upx;
	color: #989898;
	font-size: 38upx;
	margin-left: 17upx;
}
</style>
