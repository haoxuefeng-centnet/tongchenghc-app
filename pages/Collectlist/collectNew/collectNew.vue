<!-- 收车新增 -->
<template>
	<view class="index">
		<!-- image 上传-->
		<view class="indexImage">
			<view class="indexImages">
				<view class="indexImages-a" @tap="upload('carImg1')" v-if="carImg1 == ''">
					<text class="iconfont iconfontsize">&#xe81a;</text>
					<text>上传照片</text>
				</view>
				<image class="indexImages-image" @tap="upload('carImg1')" v-if="carImg1 != ''" :src="carImg1" mode=""></image>
				<text class="indexImages-title">车辆照片</text>
			</view>
			<view class="indexImages">
				<view class="indexImages-a" @tap="upload('carImg2')" v-if="carImg2 == ''">
					<text class="iconfont iconfontsize">&#xe81a;</text>
					<text>上传照片</text>
				</view>
				<image class="indexImages-image" @tap="upload('carImg2')" v-if="carImg2 != ''" :src="carImg2" mode=""></image>
				<text class="indexImages-title">车辆照片</text>
			</view>
			<view class="indexImages">
				<view class="indexImages-a" @tap="upload('carImg3')" v-if="carImg3 == ''">
					<text class="iconfont iconfontsize">&#xe81a;</text>
					<text>上传照片</text>
				</view>
				<image class="indexImages-image" @tap="upload('carImg3')" v-if="carImg3 != ''" :src="carImg3" mode=""></image>
				<text class="indexImages-title">车辆照片</text>
			</view>
		</view>
		<view class="index-text">基本信息</view>
		<form @submit="submitFrom">
			<view class="boos">
				<view class="flex align-center boos-lise">
					<view class="boos-title">车身颜色<text class="hint">*</text></view>
					<view class="boos-picker-width" style=" font-size: 30upx;">{{backgrounds[TabCur].text}}</view>
				</view>
				<view class="boox-title">
					<scroll-view class="boox-title-background" scroll-with-animation="true" scroll-x="true">
						<view
							class="boox-title-background-view"
							:class="{ on: TabCur == index, borderred: index == 0 && TabCur != index }"
							v-for="(item, index) in backgrounds"
							:style="'background:' + item.color + ';'"
							:key="index"
							@tap="tabSelect(item.text, index)"
							:data-id="index"
						></view>
					</scroll-view>
				</view>
				<view class="boos-lise" style="border-top: 1upx solid  #f3f3f3; margin-top: 20upx;">
					<view class="boos-title"><text>品牌车型</text><text class="hint">*</text></view>
					<navigator hover-class="none" class="boos-nvget" url="../../modelsChoose/brand">
						<view class="nvgetboos contrue" :class="[carType == '' ? 'active' : '']">{{ carType != '' ? carType : '请选择' }}</view>
						<text class="iconfont boos-icons">&#xe627;</text>
					</navigator>
				</view>
				<view class="boos-lise">
					<view class="boos-title"><text>出厂日期</text></view>
					<picker class="boos-picker" mode="date" :value="factoryDate" start="1995-0-0" end="endDate"
					 @change="DateChange">
						<view class="pickerboos" :class="factoryDate == '' ? 'active' : ''">{{ factoryDate != '' ? factoryDate : '请选择' }}</view>
						<view class="iconfont boos-icons"> &#xe627;</view>
					</picker>
				</view>
				<view class="boos-lise">
					<view class="boos-title"><text>上牌时间</text><text class="hint">*</text></view>
					<picker class="boos-picker" mode="date" :value="boardDate" start="1995-0-0" end="endDate"
					 @change="DateChanges">
						<view class="pickerboos" :class="boardDate == '' ? 'active' : ''">{{ boardDate != '' ? boardDate : '请选择' }}</view>
						<view class="iconfont boos-icons"> &#xe627;</view>
					</picker>
				</view>
				<view class="boos-lise flex justify-between" style="border-bottom: solid #FFFFFF; ">
					<view class="boos-title">描述</view>
					<text class="boos-icons" style="font-size: 22upx;">{{ textareaMaxLen }}/500</text>
				</view>
				<view class="boos-text">
					<textarea type="text"  v-model="formData.description" @input="textareaChange" maxlength="500" placeholder="请输入车况具体描述" placeholder-class="textPlaceholder" />
				</view>
				<view class="boos-lise">
					<view class="boos-title" style="width:34%;" ><text>车主联系方式</text><text class="hint">*</text></view>
					<input style="width: 81%;" v-model="formData.phone" name="phone"
           type="number" maxlength="11" placeholder="请输入手机号"  />
				</view>
				<view class="boos-lise">
					<view class="boos-title" style="width: 34%;" ><text>车主期望价格</text><text class="hint">*</text></view>
					<input class="boos-picker-width" type="digit" maxlength="9" placeholder="请输入预期价格" name="price" :value="formData.hopePrice" />
					<text class="iconfont boos-icons" style="font-size: 24upx; width: 10%;">万元</text>
				</view>
			</view>
			<view class="base"><button class="base-bottow" form-type="submit">保 存</button></view>
		</form>
	</view>
</template>
<script>
import utils from '../../../utils/utils.js';
import { sellAdd, Info, carBrand,updateCar } from '../../../api/collectlist.js';
export default {
	data() {
		return {
			factoryDate: '',
			boardDate: '',
			prompt: '请选择',
			isActive: true,
			carData: [[], []],
			multiIndex: [1, 1],
			carTypeData: [],
			carType: '',
			text: '',
			remnant: 0,
			formData: {},
      textareaMaxLen: 0,
			carImg1: '',
			carImg2: '',
			carImg3: '',
			color: '白色', //颜色
			TabCur: 0, //颜色控制
			backgrounds: [
				{ color: '#FFFFFF', text: '白色' },
				{ color: '#F54746', text: '红色' },
				{ color: '#3788FF', text: '蓝色' },
				{ color: '#FCBF48', text: '金色' },
				{ color: '#BABABA', text: '灰色' },
				{ color: '#724623', text: '棕色' },
				{ color: '#79386A', text: '紫色' },
				{ color: '#98CB68', text: '绿色' },
				{ color: '#EEAE00', text: '黄色' },
				{ color: '#252525', text: '黑色' }
			],
			save:'',
			buyStatus:''
		};
	},
	onLoad(query) {
		this.id = query.id;
    
	},
	onShow() {
    // 品牌车型
    carBrand().then(res => {
    	this.carData[0] = res.data;
    });
    if (this.id) {
    	Info({ buyCarId: this.id }).then(res => {
    		this.formData = res.data;
        console.log(this.data)
    		for(var i in res.data){
    			if(!res.data[i] && res.data[i] !== 0){
    				res.data[i] = ''
    			}
    		}
    		this.factoryDate = res.data.factoryTime;
    		this.boardDate = res.data.boadTime;
    		this.carType = res.data.carType;
    		this.carImg1 = res.data.carImg1;
    		this.carImg2 = res.data.carImg2;
    		this.carImg3 = res.data.carImg3;
    		this.buyStatus=res.data.buyStatus;
    		for (var i = 0; i < this.backgrounds.length; i++) {
    			if (this.backgrounds[i].text === res.data.carColour) {
    				this.TabCur = i;
            console.log(this.TabCur)
    			}
    		}
    	});
    }
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
    textareaChange(e) {
      this.textareaMaxLen = e.detail.value.length;
    },
		// 图片上传
		upload(imgKey) {
			const that = this;
			utils.uploadImg({
				callback(res) {
					that[imgKey] = res.data;
				}
			});
		},
		//颜色选择
		tabSelect(item, index) {
			this.TabCur = index;
			this.color = item;
		},
		bindMultiPickerColumnChange(e) {
			this.isActive = false;
			this.multiIndex[e.detail.column] = e.detail.value;
			if (e.detail.column == 0) {
				this.carData[1] = this.carData[0][e.detail.value].children;
			} else {
				this.multiIndex[1] = 0;
			}
			this.$forceUpdate();
		},
		DateChange(e) {
			this.factoryDate = e.detail.value;
		},
		DateChanges(e) {
			this.boardDate = e.detail.value;
		},
		endDate() {
			return this.getDate('end');
		},
		submitFrom(e) {
			if (
				this.boardDate == '' ||
				this.carType == '' ||
				e.detail.value.phone == '' ||
				e.detail.value.price == '' 
			) {
				utils.showTextToast('请完善您的信息');
			} else {
        if(!/^\d+(\.\d{1,2})?$/.test(e.detail.value.price)){
          utils.showTextToast('期望价格小数点后最多两位');
          return;
        }
				if (/^1(3|4|5|6|7|8|9)\d{9}$/.test(e.detail.value.phone)) {
					if(this.id){
						this.save=updateCar;
					}else{
						this.save=sellAdd;
					}
					this.save({
						carType: this.carType,
						factoryTime: this.factoryDate,
						boadTime: this.boardDate,
						description: this.formData.description,
						phone: this.formData.phone,
						hopePrice: this.formData.hopePrice,
						carImg1: this.carImg1,
						carImg2: this.carImg2,
						carImg3: this.carImg3,
						carColour: this.color,
						buyCarId:this.id,
						buyStatus:this.buyStatus
					}).then(res => {
						if (res.code == 200) {
							utils.showTextToast('保存成功');
							uni.setStorage({
								key: 'carType',
								data: '0',
								success: function() {
									uni.navigateBack({
										delta: 1
									});
								}
							});
						} else {
							utils.showTextToast(res.msg);
						}
					});
				} else {
					utils.showTextToast('电话号码格式有误');
				}
			}
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		}
	}
};
</script>

<style scoped lang="less">
.active {
	color: #808080;
}
.index {
	width: 100%;
	padding: 16upx 0;
	border-top: 1upx solid #f9f9f9;
}
.base {
	margin-top: 20upx;
	color: #fff;
	.base-bottow {
		color: #fff;
	}
}
.on {
	border: 4upx solid #a57bff;
}
.boos-picker-width{
	width: 70%;
}
</style>
