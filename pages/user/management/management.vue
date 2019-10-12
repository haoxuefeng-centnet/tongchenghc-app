<!-- 微店管理保存-->
<template>
	<view class="index">
		<!-- image 上传-->
		<view class="indexImage">
			<view class="indexImages">
				<view class="indexImages-a" @tap="upload('storeImg1')" v-if="formData.storeImg1 == ''">
					<text class="iconfont iconfontsize">&#xe81a;</text>
					<text>上传照片</text>
				</view>
				<image class="indexImages-image" @tap="upload('storeImg1')" v-if="formData.storeImg1 != ''" :src="formData.storeImg1"
				 mode=""></image>
				<text class="indexImages-title">店招照片<text class="hint">*</text></text>
			</view>
			<view class="indexImages">
				<view class="indexImages-a" @tap="upload('storeImg2')" v-if="formData.storeImg2 == ''">
					<text class="iconfont iconfontsize">&#xe81a;</text>
					<text>上传照片</text>
				</view>
				<image class="indexImages-image" @tap="upload('storeImg2')" v-if="formData.storeImg2 != ''" :src="formData.storeImg2"
				 mode=""></image>
				<text class="indexImages-title">店招照片<text class="hint">*</text></text>
			</view>
			<view class="indexImages">
				<view class="indexImages-a" @tap="upload('storeImg3')" v-if="formData.storeImg3 == ''">
					<text class="iconfont iconfontsize">&#xe81a;</text>
					<text>上传照片</text>
				</view>
				<image class="indexImages-image" @tap="upload('storeImg3')" v-if="formData.storeImg3 != ''" :src="formData.storeImg3"
				 mode=""></image>
				<text class="indexImages-title">店招照片<text class="hint">*</text></text>
			</view>
		</view>

		<view class="index-text">基本信息</view>
		<view class="boos-lise" style="height: 120upx;">
			<view class="boos-title">微店头像<text class="hint">*</text></view>
			<view class="storePhoto" @tap="upload('storePhoto')" v-if="formData.storePhoto == ''"><text class="iconfont iconfontsize">&#xe81a;</text></view>
			<image class="storePhoto" @tap="upload('storePhoto')" v-if="formData.storePhoto != ''" :src="formData.storePhoto"></image>
		</view>
		<view class="boos-lise">
			<view class="boos-title">微店名称<text class="hint">*</text></view>
			<input type="text" v-model="formData.storeName" placeholder="请输入(必填)" />
		</view>
		<view class="boos-lise">
			<view class="boos-title">联系电话<text class="hint">*</text></view>
			<input type="number" maxlength="11" v-model="formData.storePhone" placeholder="请输入(必填)" />
		</view>
		<view class="boos-lise">
			<view class="boos-title">地址<text class="hint">*</text></view>
			<navigator hover-class="none" class="boos-nvget" url="../../home/city">
				<view class="nvgetboos contrue" :class="formData.cityLocation == '' ? 'active' : ''">{{ formData.cityLocation != '' ? formData.cityLocation : '请选择' }}</view>
				<text class="iconfont boos-icons">&#xe627;</text>
			</navigator>
		</view>
		<view class="boos">
			<view class="boos-lise" style="border-bottom: solid #FFFFFF;">
				<view class="boos-title">门牌号</view>
				<text class="boos-icons"></text>
			</view>
			<view class="boos-text">
				<textarea v-model="formData.doorNumber" type="text" maxlength="500" placeholder="详细地址，例：16号楼5层501室"
				 placeholder-class="textPlaceholder" />
				</view>
		</view>
		<view class="boos">
			<view class="boos-lise" style="border-bottom: solid #FFFFFF;">
				<view class="boos-title" style="width: 50%;">公告内容({{formData.storeNotice.length}}/100)</view>
				<text class="boos-icons"></text>
			</view>
			<view class="boos-text" style="height: 100%;">
				<textarea v-model="formData.storeNotice" type="text" maxlength="100" placeholder="请输入公告内容" placeholder-class="textPlaceholder" />
			</view>
		</view>
		<view class="base" @tap="save" v-if="userinfo.cusType !== 1">
			<view><button class="base-bottow" type="primary">{{saves}}</button></view>
		</view>
	</view>
</template>
<script>
import { getUser } from '../../../api/login.js'
import utils from '../../../utils/utils.js';
import { storeSave , smallShop , storeUpdate} from '../../../api/smallShop.js';
export default {
	data() {
		return {
			formData: {
				storeName: '', //名称
				cityLocation: '', //市
				doorNumber: '', //门牌号
				storeNotice: '', //公告
				storePhone: '', //电话号码
				storePhoto: '', //头像
				storeImg1: '',
				storeImg2: '',
				storeImg3: '',
			},
			storeId :'', //微店ID
			isActive: true,
			prompt: '请选择(必选)',
			saves:'',
			userinfo:{} //用户信息
		};
	},
	onLoad(options) {
		if(options.storeId){
			this.storeId = options.storeId
		}		
		if(this.storeId!='' ){
			smallShop({storeId : this.storeId}).then(res =>{
				this.formData = res.data
			})
		}
	},
	onShow() {
		// 地区
		uni.getStorage({
			key: 'cityName',
			success: res => {
				this.formData.cityLocation = res.data;
				if (this.formData.cityLocation != '') {
					uni.removeStorage({
						key: 'cityName',
					});
				}
			}
		});
		if(this.storeId!='' ){
			this.saves = '修 改'
		}else{
			this.saves = '保 存'
		}
		uni.getStorage({
		    key: 'userInfo',
		    success:  (res)=> {
		       this.userinfo = res.data
		    }
		});
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
		announcement(e) {
			this.announcementext = e.detail.value;
		},
		MultiChange(e) {
			this.multiIndex = e.detail.value;
		},
		// 保存 / 修改
		save() {
			let data = this.formData;
			if (this.storeImg1 == '' || this.storeImg2 == '' || this.storeImg3 == '') {
				utils.showTextToast('请完善照片');
				return;
			} else if (data.storeName == '') {
				utils.showTextToast('请输入微店名称');
				return;
			} else if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(data.storePhone)) {
				utils.showTextToast('请输入正确手机号码');
				return;
			} else if (data.provinceLocation == '') {
				utils.showTextToast('请选择地址');
				return;
			}
			if(this.storeId !='' ){
				this.storeId = data.storeId
				storeUpdate(data).then(res => {
					if(res.code == 200 ){
						getUser().then(resdata => {
							if (resdata.code == 200) {
						   		uni.setStorage({
						   			key: 'userInfo',
						   			data: resdata.data,
						   		});
						   	}
						 })
						utils.showTextToast('修改成功');
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							});
						}, 1000);
						
					} else {
						utils.showTextToast('修改失败请重试');
					}
				})
			}else{
				storeSave(data).then(res => {
					let id = res.data.storeId
					if (res.code == 200) {
						getUser().then(resdata => {
							if (resdata.code == 200) {
						   		uni.setStorage({
						   			key: 'userInfo',
						   			data: resdata.data,
						   		});
						   	}
						 })
						utils.showTextToast('保存成功即将跳转');
						uni.redirectTo({
							url: '../../smallShop/smallShop?storeId='+id
						});
					} else {
						utils.showTextToast('保存失败请重试');
					}
				});
			}
		}
	}
};
</script>

<style>
.on{
	border:4upx solid #A57BFF;
}
.index {
	width: 100%;
	padding: 16upx 0;
	border-top: 1upx solid #f9f9f9;
}
.boos-lise input {
	width: 80%;
	padding-left: 0;
}
.boos-title {
	color: #000000;
	margin: auto 0;
	line-height: 90upx;
}
.base {
	margin-top: 30upx;
}
.boos-text {
	height: 140upx;
}
.active {
	color: #808080;
}
</style>
