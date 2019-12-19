<!-- 发布页 -->
<template>
	<view class="index">
		<!-- image 上传-->
		<view class="indexImage">
      <template v-if="carPicture.length">
        <view class="indexImages" v-for="(item, index) in carPicture" :key="item">
          <image class="indexImages-image" :src="item" mode="aspectFill"></image>
          <view class="del-btn" @click="removeUploadImg(index)">
            <image src="../../static/icon/delete.png" mode="aspectFill"></image>
          </view>
        	<text class="indexImages-title">
        		车辆照片
        		<!-- <text class="hint">*</text> -->
        	</text>
        </view>
      </template>
			<view class="indexImages" v-if="carPicture.length < 3">
				<view class="indexImages-a" @tap="uploadImg">
					<text class="iconfont iconfontsize">&#xe81a;</text>
					<text>上传照片</text>
				</view>
				<text class="indexImages-title">
					车辆照片
					<text class="hint">*</text>
				</text>
			</view>
<!-- 			<view class="indexImages">
				<view class="indexImages-a" @tap="upload('carImg2')" v-if="carImg2 == ''">
					<text class="iconfont iconfontsize">&#xe81a;</text>
					<text>上传照片</text>
				</view>
				<image class="indexImages-image" @tap="upload('carImg2')" v-if="carImg2 != ''" :src="carImg2" mode=""></image>
				<text class="indexImages-title">
					车辆照片
					<text class="hint">*</text>
				</text>
			</view>
			<view class="indexImages">
				<view class="indexImages-a" @tap="upload('carImg3')" v-if="carImg3 == ''">
					<text class="iconfont iconfontsize">&#xe81a;</text>
					<text>上传照片</text>
				</view>
				<image class="indexImages-image" @tap="upload('carImg3')" v-if="carImg3 != ''" :src="carImg3" mode=""></image>
				<text class="indexImages-title">
					车辆照片
					<text class="hint">*</text>
				</text>
			</view> -->
		</view>
		<!-- 基本信息 -->
		<view class="index-text">基本信息</view>
			<view class="boos">
				<view class="flex align-center boos-lise">
					<view class="boos-title">车身颜色<text class="hint">*</text></view>
					<view class="boos-picker-width" style=" font-size: 30upx;">{{backgrounds[TabCur].text}}</view>
				</view>
				<view class="boox-title">
					<scroll-view class="boox-title-background" scroll-with-animation="true" scroll-x="true">
						<view class="boox-title-background-view" :class="{ on: TabCur == index, borderred: index == 0 && TabCur != index }" v-for="(item, index) in backgrounds"
						 :style="'background:' + item.color + ';'" :key="index" @tap="tabSelect(item.text, index)" :data-id="index"></view>
					</scroll-view>
				</view>
				<view class="vehicle">
					<text class="vehicleContent">车辆类型<text class="hint">*</text></text>
					<scroll-view class="vehicleList-a" scroll-with-animation="true" scroll-x="true">
						<view class="vehicleContentName" :class="{ on: index == changeType }" @tap="chooseType(index)" v-for="(item, index) in carTypes"
						 :key="index">
							{{ item }}
						</view>
					</scroll-view>
				</view>
				<view class="boos-lise">
					<view class="boos-title">品牌车型<text class="hint">*</text></view>
					<navigator hover-class="none" class="boos-nvget contrue" url="../modelsChoose/brand">
						<view class="nvgetboos contrue" :class="[brandSeries == '' ? 'active' : '']">{{ brandSeries != '' ? brandSeries : '请选择' }}</view>
						<text class="iconfont boos-icons">&#xe627;</text>
					</navigator>
				</view>
				<view class="boos-lise">
					<view class="boos-title">表显里程<text class="hint">*</text></view>
					<input class="boos-picker-width" v-model="carMileage" maxlength="9" type="digit" style="width: 71%; line-height: 100upx;" placeholder="最多两位小数"  />
					<text class="iconfont boos-icons" style="font-size: 24upx; width: 14%;">万公里</text>
				</view>
				<view class="boos-lise">
					<view class="boos-title">初次上牌<text class="hint">*</text></view>
					<picker class="boos-picker" mode="date" :value="startDate" start="1995-0-0" end="endDate"
					 @change="DateChange">
						<view class="pickerboos" :class="carOldBoadTime == '' ? 'active' : ''">{{ carOldBoadTime != '' ? carOldBoadTime : '请选择' }}</view>
						<view class="iconfont boos-icons"> &#xe627;</view>
					</picker>
				</view>
				<!-- <view class="boos-lise">
					<view class="boos-title">车牌号</view>
					<input class="boos-picker-width" v-model="carLicense" type="text" maxlength="8" placeholder="请输入" />				
				</view> -->
				<view class="boos-lise">
					<view class="boos-title">使用性质<text class="hint">*</text></view>
					<picker class="boos-picker boos-picker-width" @change="natureChange" :value="index" :range="usingNature">
						<view class="pickerboos" :class="carNature == '' ? 'active' : ''">{{ carNature != '' ? carNature : '请选择' }}</view>
						<view class="iconfont boos-icons">&#xe627;</view>
					</picker>
				</view>
				<!-- <view class="boos-lise">
					<view class="boos-title">出厂日期</view>
					<picker class="boos-picker boos-picker-width" mode="date" :value="startDate" start="1995-0-0" end="endDate"
					 @change="DateChanges">
						<view class="pickerboos" :class="carFactoryTime == '' ? 'active' : ''">{{ carFactoryTime != '' ? carFactoryTime : '请选择' }}</view>
						<view class="iconfont boos-icons">&#xe627;</view>
					</picker>
				</view> -->
				<!-- <view class="boos-lise">
					<view class="boos-title">年检到期日</view>
					<picker class="boos-picker boos-picker-width" mode="date" :value="startDate" start="1995-0-0" end="endDate"
					 @change="DateChangeinspection">
						<view class="pickerboos" :class="carMaturityTime == '' ? 'active' : ''">{{ carMaturityTime != '' ? carMaturityTime : '请选择' }}</view>
						<view class="iconfont boos-icons">&#xe627;</view>
					</picker>
				</view> -->
			<!-- 	<view class="boos-lise">
					<view class="boos-title">钥匙数量</view>
					<input class="boos-picker-width" v-model="keySum"  type="number" placeholder="请输入钥匙数量" />
				</view> -->
				<!-- <view class="boos-lise">
					<view class="boos-title">车架号<text class="hint">*</text></view>
					<input class="boos-picker-width"    placeholder="请输入车架号" :value="carVin" name="carVin" />
				</view>
				<view class="boos-lise">
					<view class="boos-title">引擎号<text class="hint">*</text></view>
					<input class="boos-picker-width" placeholder="请输入引擎号" :value="engineNumber" name="engineNumber" />
				</view> -->
				<view class="boos-lise">
					<view class="boos-title">车辆所在地<text class="hint">*</text></view>
					<navigator hover-class="none" class="boos-nvget" url="../home/city">
						<view class="nvgetboos" :class="select == '' ? 'active' : ''">{{ select != '' ? select : '请选择' }}</view>
						<text class="iconfont boos-icons">&#xe627;</text>
					</navigator>
				</view>
				<view class="boos-lise">
					<view class="boos-title">车辆归属地<text class="hint">*</text></view>
					<navigator hover-class="none" class="boos-nvget" url="../home/city?type=1">
						<view class="nvgetboos" :class="belonging == '' ? 'active' : ''">{{ belonging != '' ? belonging : '请选择' }}</view>
						<text class="iconfont boos-icons">&#xe627;</text>
					</navigator>
				</view>
				<view class="boos-lise">
					<view class="boos-title">评估师</view>
					<text class="boos-iconst-text" style="width: 42%;">系统默认为发布者</text>
				</view>
				<view class="boos-lise">
					<view class="boos-title">变速箱<text class="hint">*</text></view>
					<picker class="boos-picker boos-picker-width" @change="gearboxChange" :value="index" :range="gearbox">
						<view class="pickerboos" :class="carGearbox == '' ? 'active' : ''">{{ carGearbox != '' ? carGearbox : '请选择' }}</view>
						<text class="iconfont boos-icons">&#xe627;</text>
					</picker>
				</view>
				<view class="vehicle">
					<text class="vehicleContent">排放标准<text class="hint">*</text></text>
					<scroll-view class="vehicleList-a" scroll-with-animation="true" scroll-x="true">
						<view class="vehicleContentName" :class="{ on: index == emissionsType }" @tap="chooseEmissionsType(index)" v-for="(item, index) in emissions"
						 :key="index">
							{{ item }}
						</view>
					</scroll-view>
				</view>
				<view class="vehicle">
					<text class="vehicleContent">燃油类型<text class="hint">*</text></text>
					<scroll-view class="vehicleList-a" scroll-with-animation="true" scroll-x="true">
						<view class="vehicleContentName" :class="{ on: index == fuelType }" @tap="chooseFuel(index)" v-for="(item, index) in fuel"
						 :key="index">{{ item }}</view>
					</scroll-view>
				</view>
				<!--  -->
				<view class="boos-lise" style="border-bottom: solid #FFFFFF;">
					<view class="boos-title">描述</view>
					<text class="boos-icons" style="font-size: 22upx;">{{ carDescribe.length }}/500</text>
				</view>
				<view class="boos-text">
					<textarea type="text" v-model="carDescribe" maxlength="500" placeholder="请输入车况具体描述"
					 placeholder-class="textPlaceholder" />
					</view>
				<view class="index-text">价格信息</view>
				<view class="boos-lise">
					<view class="boos-title-buttom">成本价<text class="hint">*</text></view>
					<input class="boos-picker-width" v-model="costPrice" maxlength="8" type="digit" placeholder="请输入"  />
					<text class=" boos-iconst-text">万元</text>
				</view>
				<view class="boos-lise">
					<view class="boos-title-buttom">批发价<text class="hint">*</text></view>
					<input class="boos-picker-width" v-model="wholesalePrice" maxlength="8" type="digit" placeholder="请输入" />
					<text class=" boos-iconst-text">万元</text>
				</view>
				<view class="boos-lise">
					<view class="boos-title-buttom">网络标价</view>
					<input class="boos-picker-width" v-model="interPrice" maxlength="8" type="digit" placeholder="请输入" />
					<text class="boos-iconst-text">万元</text>
				</view>
			<!-- 	<navigator hover-class="none" url="procedures/procedures">
					<view class="formalities "><text>手续信息</text></view>
				</navigator> -->
				<view class="index-bottom">
					<view class="index-bottom-content" @tap="selectShop(1)">
						<text class="iconfont"  style=" width: 50upx;color: #989898;font-size: 35upx;" v-if="smallShop">&#xe75b;</text>
						<text class="iconfont"  style="width: 50upx;color: #A57BFF;font-size: 35upx;" v-if="!smallShop">&#xe659;</text>
						<text style="margin-left: 17upx ;">微店</text>
					</view>
					<view class="index-bottom-content" @tap="selectShop(2)">
						<text class="iconfont"  style="width: 50upx; color: #989898;font-size: 35upx;" v-if="platform">&#xe75b;</text>
						<text class="iconfont"  style="width: 50upx;color: #A57BFF;font-size: 35upx;" v-if="!platform">&#xe659;</text>
						<text style="margin-left: 17upx;">平台</text>
					</view>
				</view>
				<view class="index-bottom">
					<button class="index-footer-content"  @tap="selet(1)">保 存</button>
					<button class="index-footer-content releasekes" @tap="selet(2)">发 布</button>
				</view>
			</view>
	</view>
</template>
<script>
import utils from '../../utils/utils.js';
import cityData from '../../components/cityData.js';
import { carPublish } from '../../api/release.js';
import Upload from '../../utils/upload.js';
import CoverImage from '../../components/yq-avatar/yq-avatar.vue';
export default {
  components: { CoverImage },
	data() {
		return {
      carPicture: [],
			startDate: '',
			carOldBoadTime: '',
			carFactoryTime: '',
			carMaturityTime: '',
			remnant: 0,
			cityData: cityData,
			TabCur: 0,
			scrollLeft: 0,
			select: '',
			belonging: '',
			carTypes: ['轿车', 'SUV', 'MPV', '面包车', '工程车', '客车', '皮卡', '跑车'],
			changeType: 0,
			carType: '轿车',
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
			carColor: '白色',
			emissions: ['零排放', '国六', '国五', '国四', '国三', '国二等'],
			emissionsType: 0,
			carDischarge: '零排放',
			fuel: ['汽油', '柴油', '纯电', '混动', '燃气'],
			fuelType: 0,
			fuelOil: '汽油',
			usingNature: ['营运', '非营运', '租赁营运', '租赁非营运'],
			gearbox: ['手动', '自动'],
			carGearbox: '',
			smallShop: true,
			platform: true,
			carImg1: '',
			carImg2: '',
			carImg3: '',
			carNature: '',
			carInfo: '',
			platforms: 2,
			microShop: 2,
			brandSeries: '', //品牌车型
			operation: '',
      wholesalePrice:'',
      carDescribe:'',
      costPrice:'',
      carLicense:'',
      carMileage:'',
      interPrice:'',
      keySum:''
		};
	},
	onShow() {
    this.operation = ''
		uni.getStorage({
			key: 'carInformation',
			success: res => {
				this.carInfo = res.data;
			}
		});
		// 品牌车型数据
		uni.getStorage({
			key: 'brandName',
			success: res => {
				this.brandSeries = res.data;
				if (this.brandSeries != '') {
					uni.removeStorage({
						key: 'brandName'
					});
				}
			}
		});
		// 所在地
		uni.getStorage({
			key: 'cityName',
			success: (res) => {
				this.select = res.data;
				if (this.select != '请选择') {
					uni.removeStorage({
						key: 'cityName'
					});
				}
			}
		});
		// 归属地
		uni.getStorage({
			key: 'affiliation',
			success: (res) => {
				this.belonging = res.data;
				if (this.belonging != '请选择') {
					uni.removeStorage({
						key: 'affiliation'
					});
				}
			}
		});
	},
	methods: {
		// 选择颜色
		tabSelect(item, index) {
			this.TabCur = index;
			this.carColor = item;
		},
		// 图片上传
		uploadImg() {
			const that = this;
      Upload.uploadMetod({
        MaxNumber: 3,
       headers: {
          'cusToken': uni.getStorageSync('cusToken'),
        },
        successBack(res) {
          if (that.carPicture.length < 3) {
            that.carPicture.push(res.data);
          }
        },
        failBack(err) {
          console.log(err);
          utils.showTextToast(err.msg);
        },
      });
		},
		DateChange(e) {
			this.carOldBoadTime = e.detail.value;
		},
		DateChanges(e) {
			this.carFactoryTime = e.detail.value;
		},
		DateChangeinspection(e) {
			this.carMaturityTime = e.detail.value;
		},
		// 选择车型
		chooseType(index) {
			this.changeType = index;
			this.carType = this.carTypes[index];
		},
		// 选择排放
		chooseEmissionsType(index) {
			this.emissionsType = index;
			this.carDischarge = this.emissions[index];
		},
		// 选择燃油
		chooseFuel(index) {
			this.fuelType = index;
			this.fuelOil = this.fuel[index];
		},
		// 使用性质
		natureChange(e) {
			this.carNature = this.usingNature[e.detail.value];
		},
		// 选择变速箱
		gearboxChange(e) {
			this.carGearbox = this.gearbox[e.detail.value];
		},
		// 选择平台微店
		selectShop(item) {
      // 1 微店 2 平台
			if (item == 1) {
				if (this.smallShop) {
					this.smallShop = false;
					this.microShop = 1;
          console.log('微店 发布')
				} else {
					this.microShop = 2;
					this.smallShop = true;
          console.log('微店 不发布')
				}
			} else if(item == 2) {
				if (this.platform) {
					this.platforms = 1;
					this.platform = false;
          console.log('平台 发布')
				} else {
					this.platforms = 2;
					this.platform = true;
          console.log('平台 不发布')
				}
			}
		},
		// 提交
    selet(item) {
    	this.operation = item;
      if (this.carOldBoadTime =='' || this.wholesalePrice == '' || this.brandSeries == ''|| this.carGearbox == '' || this.carMileage == ''||this.boardDate == ''||this.carNature == ''||this.cityLocation == '' ||this.cityAttribution == '' ||this.costPrice == '') {
      	utils.showTextToast('请完善信息');
      	return;
      }
      if(!/^\d+(\.\d{1,2})?$/.test(this.carMileage)){
        utils.showTextToast('表显里程小数点后最多两位');
        return;
      }
      	let data = {
          carImgs: this.carPicture,
      		carColor: this.carColor,
      		carType: this.carType,
      		carOldBoadTime: this.carOldBoadTime,
      		carNature: this.carNature,
      		carFactoryTime: this.carFactoryTime,
      		carMaturityTime: this.carMaturityTime,
      		cityAttribution: this.select,
      		cityLocation: this.belonging,
      		fuelType: this.fuelOil,
      		carDischarge: this.carDischarge,
      		microShop: this.microShop,
      		platform: this.platforms,
      		operation: this.operation,
      		carGearbox: this.carGearbox,
      		brandSeries: this.brandSeries,
          wholesalePrice:this.wholesalePrice,
          carLicense:this.carLicense,
          carDescribe:this.carDescribe,
          costPrice:this.costPrice,
          interPrice:this.interPrice,
          carMileage:this.carMileage,
          keySum:this.keySum
      	};
        
      	carPublish(data).then(res => {
      		if (res.code == 200) {
            if(this.operation == 1){
              utils.showTextToast('保存成功');
            }else if(this.operation == 2){
              utils.showTextToast('发布成功');
            }
      			this.carColor = '白色'
      			this.carType = '轿车'
      			this.carOldBoadTime = ''
      			this.carNature = ''
      			this.carFactoryTime = ''
      			this.carMaturityTime = ''
      			this.select = ''
      			this.belonging = ''
      			this.fuelOil = ''
      			this.carDischarge = ''
      			this.smallShop = true
      			this.platform = true
            this.microShop = 2
            this.platforms = 2
      			this.operation = ''
      			this.carGearbox = ''
      			this.brandSeries = ''
            this.wholesalePrice = ''
            this.carLicense = ''
            this.carDescribe = ''
            this.costPrice = ''
            this.interPrice = ''
            this.carMileage = ''
            this.keySum = ''
            this.changeType = 0
            this.emissionsType = 0
            this.fuelType = 0;
            this.carPicture = [];
      			uni.setStorage({
      				key: 'carInformation',
      				success: function() {
      					setTimeout( function() {
                  uni.navigateTo({
                  	url: '../sale/sale?carId='+res.data.carId
                  });	
                }, 500);							
      				}
      			});
      		} else {
      			utils.showTextToast(res.msg);
      		}
      	});
    },
		endDate() {
			return this.getDate('end');
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
		},
    // 删除已上传得瑟图片
    removeUploadImg(index){
      this.carPicture.splice(index, 1);
    }
	}
};
</script>
<style scoped lang="less">
.index {
	width: 100%;
	padding: 16upx 0;
	border-top: 1upx solid #f9f9f9;
}
.boos-title {
	width: 30%;
}
.boos-nvget{
	width: 85%;
}
.boos-picker{
	width: 85%;
}
.on {
	
	border: 4upx solid #a57bff;
	background-color: #FFFFFF;
}
.boos-title-buttom {
	width: 20%;
	height: 100upx;
	line-height: 100upx;
	text-align: left;
	font-size: 28upx;
	color: #000000;
	font-family: PingFang-SC-Regular;
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
.index-footer-content {
	padding: 0;
	height: 100upx;
}
.active {
	color: #7f7f7f;
}
.releasekes{
	color: #FFFFFF;
	background:linear-gradient(0deg,rgba(165,123,255,1),rgba(107,115,255,1));
}
.indexImage {
  justify-content: flex-start;
}
.indexImages {
  position: relative;
  margin: 0 24rpx;
  .del-btn {
    width: 42rpx;
    height: 42rpx;
    position: absolute;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    image {
      width: 32rpx;
      height: 32rpx;
    }
  }
}
</style>
