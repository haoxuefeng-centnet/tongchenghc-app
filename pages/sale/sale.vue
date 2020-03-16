<!-- 车辆信息修改 -->
<template>
  <view class="index">
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
    <!-- 基本信息 -->
    <view class="index-text">基本信息</view>
    <form @submit="submitFrom">
      <view class="boos">
        <!--<view class="flex align-center boos-lise">
          <view class="boos-title">车身颜色<text class="hint">*</text></view>
          <view class="boos-picker-width" style=" font-size: 30upx;">{{backgrounds[TabCur].text}}</view>
        </view>-->
       <!-- <view class="boox-title">
          <scroll-view class="boox-title-background" scroll-with-animation="true" scroll-x="true">
            <view class="boox-title-background-view" :class="{ on: TabCur == index, borderred: index == 0 && TabCur != index }"
              v-for="(item, index) in backgrounds" :style="'background:' + item.color + ';'" :key="index" @tap="tabSelect(item.text, index)"
              :data-id="index"></view>
          </scroll-view>
        </view>-->
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
          <view class="boos-title">品牌车型</view>
          <navigator hover-class="none" class="boos-nvget" url="../modelsChoose/brand">
            <view class="nvgetboos contrue" :class="[brandSeries == '' ? 'active' : '']">{{ brandSeries != '' ? brandSeries : '请选择' }}</view>
            <text class="iconfont boos-icons">&#xe627;</text>
          </navigator>
        </view>
        <view class="boos-lise">
          <view class="boos-title">表显里程<text class="hint">*</text></view>
          <input style="width: 71%;" type="digit" maxlength="9" :value="carData.carMileage" placeholder="最多两位小数" name="carMileage" />
          <text class="iconfont boos-icons" style="font-size: 24upx; width: 14%;">万公里</text>
        </view>
        <view class="boos-lise">
          <view class="boos-title">初次上牌<text class="hint">*</text></view>
          <picker class="boos-picker boos-picker-width" fields="month" mode="date" :value="carOldBoadTime" start="1995-0" end="endDate"
            @change="DateChange">
            <view class="pickerboos" style="text-align: left;">{{ carOldBoadTime }}</view>
            <text class="iconfont boos-icons">&#xe627;</text>
          </picker>
        </view>
       <!-- <view class="boos-lise">
          <view class="boos-title">车牌号</view>
          <input placeholder="请输入" name="carLicense" :value="carData.carLicense" />
          <text class="iconfont boos-icons">&#xe627;</text>
        </view> -->
		<navigator hover-class="none" url="../home/city?type=1">
		  <view class="boos-lise">
		    <view class="boos-title">车辆归属地<text class="hint">*</text></view>
		    <view class="boos-picker boos-picker-width">
		      <view class="pickerboos">{{ select }}</view>
		      <text class="iconfont boos-icons">&#xe627;</text>
		    </view>
		  </view>
		</navigator>
		<view class="vehicle">
		    <text class="vehicleContent">使用性质<text class="hint">*</text></text>
		    <scroll-view class="vehicleList-a" scroll-with-animation="true" scroll-x="true">
		        <view class="vehicleContentName" :class="{ on: index == carNatureType }" @tap="natureChange(index)" v-for="(item, index) in usingNature" :key="index">
		            {{ item }}
		        </view>
		    </scroll-view>
		</view>
        <!-- <view class="boos-lise">
          <view class="boos-title">使用性质<text class="hint">*</text></view>
          <picker class="boos-picker boos-picker-width" @change="natureChange" :value="index" :range="usingNature">
            <view class="pickerboos" :class="carNature == '' ? 'active' : ''">{{ carNature != '' ? carNature : '请选择' }}</view>
            <text class="iconfont boos-icons">&#xe627;</text>
          </picker>
        </view> -->
      <!--  <view class="boos-lise">
          <view class="boos-title">出厂日期</view>
          <picker class="boos-picker boos-picker-width" mode="date" :value="carFactoryTime" start="1995-0-0" end="endDate"
            @change="DateChanges">
            <view class="pickerboos" :class="carFactoryTime == '' ? 'active' : ''">{{ carFactoryTime != '' ? carFactoryTime : '请选择' }}</view>
            <text class="iconfont boos-icons">&#xe627;</text>
          </picker>
        </view> -->
       <!-- <view class="boos-lise">
          <view class="boos-title">年检到期日</view>
          <picker class="boos-picker boos-picker-width" mode="date" :value="carMaturityTime" start="1995-0-0" end="endDate"
            @change="DateChangeinspection">
            <view class="pickerboos" :class="carMaturityTime == '' ? 'active' : ''">{{ carMaturityTime != '' ? carMaturityTime : '请选择' }}</view>
            <text class="iconfont boos-icons">&#xe627;</text>
          </picker>
        </view> -->
       <!-- <view class="boos-lise">
          <view class="boos-title" style="margin: auto 0;">钥匙数量</view>
          <input placeholder="请输入钥匙数量" type="number" name="keySum" :value="carData.keySum" />
          <text class="iconfont boos-icons">&#xe627;</text>
        </view> -->
        <!-- <view class="boos-lise">
					<view class="boos-title">车架号</view>
					<input placeholder="请输入车架号"  :value="carData.carVin" name="carVin" />
					<text class="iconfont boos-icons">&#xe627;</text>
				</view>
				<view class="boos-lise">
					<view class="boos-title">引擎号</view>
					<input placeholder="请输入引擎号" :value="carData.engineNumber" name="engineNumber" />
					<text class="iconfont boos-icons">&#xe627;</text>
				</view> -->
 <!--       <navigator hover-class="none" url="../home/city">
          <view class="boos-lise">
            <view class="boos-title">车辆所在地<text class="hint">*</text></view>
            <view class="boos-picker boos-picker-width">
              <view class="pickerboos">{{ belonging }}</view>
              <text class="iconfont boos-icons">&#xe627;</text>
            </view>
          </view>
        </navigator> -->

      <!--  <view class="boos-lise justify-between">
          <view class="boos-title">评估师</view>
          <input style="width: 85%;" disabled="false" :value="carData.cusNick" v-if="carData.cusNick" />
          <text class="boos-iconst-text" style="width: 42%;" v-else>系统默认为发布者</text>
        </view> -->
        <!-- <view class="boos-lise">
          <view class="boos-title" style="margin: auto 0;">变速箱</view>
          <picker class="boos-picker boos-picker-width" @change="gearboxChange" :value="index" :range="gearbox">
            <view class="pickerboos">{{ carGearbox }}</view>
            <text class="iconfont boos-icons">&#xe627;</text>
          </picker>
        </view> -->
		<view class="vehicle">
		    <text class="vehicleContent">变速箱<text class="hint">*</text></text>
		    <scroll-view class="vehicleList-a" scroll-with-animation="true" scroll-x="true">
		        <view class="vehicleContentName" :class="{ on: index == carGearboxType }" @tap="gearboxChange(index)" v-for="(item, index) in gearbox"
		              :key="index">
		            {{ item }}
		        </view>
		    </scroll-view>
		</view>
        <view class="vehicle">
          <text class="vehicleContent">排放标准</text>
          <scroll-view class="vehicleList-a" scroll-with-animation="true" scroll-x="true">
            <view class="vehicleContentName" :class="{ on: index == emissionsType }" @tap="chooseEmissionsType(index)"
              v-for="(item, index) in emissions" :key="index">
              {{ item }}
            </view>
          </scroll-view>
        </view>
        <view class="vehicle">
          <text class="vehicleContent">燃油类型</text>
          <scroll-view class="vehicleList-a" scroll-with-animation="true" scroll-x="true">
            <view class="vehicleContentName" :class="{ on: index == fuelOil }" @tap="chooseFuel(index)" v-for="(item, index) in fuel"
              :key="index">{{ item }}</view>
          </scroll-view>
        </view>
        <!--  -->
        <view class="boos-lise flex justify-between" style="border-bottom: solid #FFFFFF;">
          <view class="boos-title">描述</view>
          <text class="boos-icons" style="font-size: 22upx;">{{ text.length }}/500</text>
        </view>
        <view class="boos-text">
         <textarea type="text" :value="carData.carDescribe" name="carDescribe" maxlength="500"
            placeholder="请输入车况具体描述" placeholder-class="textPlaceholder" />
          </view>
				<view class="index-text">价格信息</view>
				<!--  -->
				<view class="boos-lise" v-if="carData.isHandle">
					<view class="boos-title">成本价<text class="hint">*</text></view>
					<input placeholder="请输入" maxlength="8" type="digit" style="width: 75%;" :value="carData.costPrice" name="costPrice" />
					<text class="boos-iconst-text">万元</text>
				</view>
				<view class="boos-lise" v-if="carData.isHandle">
					<view class="boos-title">批发价<text class="hint">*</text></view>
					<input placeholder="请输入" maxlength="8" type="digit"  style="width: 75%;" :value="carData.wholesalePrice" name="wholesalePrice" />
					<text class=" boos-iconst-text">万元</text>
				</view>
				<view class="boos-lise">
					<view class="boos-title">网络标价</view>
					<input placeholder="请输入" maxlength="8" type="digit"  style="width: 75%;" v-model="carData.interPrice" name="interPrice" />
					<text class="boos-iconst-text">万元</text>
				</view>
				<view class="formalities" v-if="false"><text>手续信息</text></view>
<!-- 				<view class="tabList" style="margin-top: 20upx;">
					<text class="tabtitle">购置税证</text>
					<view class="tabList-content ">
							<text class="iconfont radio" @tap="carTax(3)" v-if="purchaseTax != 1" style=" width: 50upx;color: #989898;font-size: 38upx;">&#xe75b;</text>
							<text class="iconfont" @tap="carTax(1)" v-if="purchaseTax == 1" style="width: 50upx;color: #A57BFF;font-size: 38upx;">&#xe659;</text>
							<text style="margin-left: 17upx ;">有</text>
				
							<text class="iconfont" @tap="carTax(2)" v-if="purchaseTax == 2" style="width: 50upx;color: #A57BFF;font-size: 38upx;margin-left: 17upx;">&#xe659;</text>
							<text class="iconfont radio" @tap="carTax(4)" v-if="purchaseTax != 2" style=" width: 50upx;color: #989898;font-size: 38upx;">&#xe75b;</text>
							<text style="margin-left: 17upx ;">无</text>
					</view>
				</view>
				<view class="tabList">
					<text class="tabtitle">行驶证</text>
					<view class="tabList-content">
						<text class="iconfont radio" @tap="carpurchase(3)" v-if="carDrlicense != 1" style=" width: 50upx;color: #989898;font-size: 38upx;">&#xe75b;</text>
						<text class="iconfont" @tap="carpurchase(1)" v-if="carDrlicense == 1" style="width: 50upx;color: #A57BFF;font-size: 38upx;">&#xe659;</text>
						<text style="margin-left: 17upx ;">有</text>
						<text class="iconfont" @tap="carpurchase(2)" v-if="carDrlicense == 2" style="width: 50upx;color: #A57BFF;font-size: 38upx;margin-left: 17upx;">
							&#xe659;
						</text>
						<text class="iconfont radio" @tap="carpurchase(4)" v-if="carDrlicense != 2" style=" width: 50upx;color: #989898;font-size: 38upx;">&#xe75b;</text>
						<text style="margin-left: 17upx ;">无</text>
					</view>
				</view>
				<view class="tabList">
					<text class="tabtitle">登记证</text>
					<view class="tabList-content">
						<text class="iconfont radio" @tap="regist(3)" v-if="regCertificate != 1" style=" width: 50upx;color: #989898;font-size: 38upx;">&#xe75b;</text>
						<text class="iconfont" @tap="regist(1)" v-if="regCertificate == 1" style="width: 50upx;color: #A57BFF;font-size: 38upx;">&#xe659;</text>
						<text style="margin-left: 17upx ;">有</text>
						<text class="iconfont" @tap="regist(2)" v-if="regCertificate == 2" style="width: 50upx;color: #A57BFF;font-size: 38upx;margin-left: 17upx;">&#xe659;</text>
						<text class="iconfont radio" @tap="regist(4)" v-if="regCertificate != 2" style=" width: 50upx;color: #989898;font-size: 38upx;">&#xe75b;</text>
						<text style="margin-left: 17upx ;">无</text>
					</view>
				</view>
				<view class="tabList">
					<text class="tabtitle">原车主身份证</text>
					<view class="tabList-content">
						<text class="iconfont radio" @tap="identitycard(3)" v-if="oldIdcard != 1" style=" width: 50upx;color: #989898;font-size: 38upx;">&#xe75b;</text>
						<text class="iconfont" @tap="identitycard(1)" v-if="oldIdcard == 1" style="width: 50upx;color: #A57BFF;font-size: 38upx;">&#xe659;</text>
						<text style="margin-left: 17upx ;">有</text>
						<text class="iconfont" @tap="identitycard(2)" v-if="oldIdcard == 2" style="width: 50upx;color: #A57BFF;font-size: 38upx;margin-left: 17upx;">&#xe659;</text>
						<text class="iconfont radio" @tap="identitycard(4)" v-if="oldIdcard != 2" style=" width: 50upx;color: #989898;font-size: 38upx;">&#xe75b;</text>
						<text style="margin-left: 17upx ;">无</text>
					</view>
				</view>
				<view class="tabList">
					<text class="tabtitle">新车发票</text>
					<view class="tabList-content">
						<text class="iconfont radio" @tap="carreceipt(3)" v-if="ncInvoice != 1" style=" width: 50upx;color: #989898;font-size: 38upx;">&#xe75b;</text>
						<text class="iconfont" @tap="carreceipt(1)" v-if="ncInvoice == 1" style="width: 50upx;color: #A57BFF;font-size: 38upx;">&#xe659;</text>
						<text style="margin-left: 17upx ;">有</text>
						<text class="iconfont" @tap="carreceipt(2)" v-if="ncInvoice == 2" style="width: 50upx;color: #A57BFF;font-size: 38upx;margin-left: 17upx;">&#xe659;</text>
						<text class="iconfont radio" @tap="carreceipt(4)" v-if="ncInvoice != 2" style=" width: 50upx;color: #989898;font-size: 38upx;">&#xe75b;</text>
						<text style="margin-left: 17upx ;">无</text>
					</view>
				</view>
				<view class="tabList">
					<text class="tabtitle">交强险单</text>
					<view class="tabList-content">
						<text class="iconfont radio" @tap="carinsurance(3)" v-if="nciManual != 1" style=" width: 50upx;color: #989898;font-size: 38upx;">&#xe75b;</text>
						<text class="iconfont" @tap="carinsurance(1)" v-if="nciManual == 1" style="width: 50upx;color: #A57BFF;font-size: 38upx;">&#xe659;</text>
						<text style="margin-left: 17upx ;">有</text>
						<text class="iconfont" @tap="carinsurance(2)" v-if="nciManual == 2" style="width: 50upx;color: #A57BFF;font-size: 38upx;margin-left: 17upx;">&#xe659;</text>
						<text class="iconfont radio" @tap="carinsurance(4)" v-if="nciManual != 2" style=" width: 50upx;color: #989898;font-size: 38upx;">&#xe75b;</text>
						<text style="margin-left: 17upx ;">无</text>
					</view>
				</view>
				<view class="tabList">
					<text class="tabtitle">商业险单</text>
					<view class="tabList-content">
						<text class="iconfont radio" @tap="carbusiness(3)" v-if="calInsurance != 1" style=" width: 50upx;color: #989898;font-size: 38upx;">&#xe75b;</text>
						<text class="iconfont" @tap="carbusiness(1)" v-if="calInsurance == 1" style="width: 50upx;color: #A57BFF;font-size: 38upx;">&#xe659;</text>
						<text style="margin-left: 17upx ;">有</text>
						<text class="iconfont" @tap="carbusiness(2)" v-if="calInsurance == 2" style="width: 50upx;color: #A57BFF;font-size: 38upx;margin-left: 17upx;">
							&#xe659;
						</text>
						<text class="iconfont radio" @tap="carbusiness(4)" v-if="calInsurance != 2" style=" width: 50upx;color: #989898;font-size: 38upx;">&#xe75b;</text>
						<text style="margin-left: 17upx ;">无</text>
					</view>
				</view>
				<view class="tabList">
					<text class="tabtitle">车船税证</text>
					<view class="tabList-content">
						<text class="iconfont radio" @tap="carvehiclelicense(3)" v-if="cbTax != 1" style=" width: 50upx;color: #989898;font-size: 38upx;">&#xe75b;</text>
						<text class="iconfont" @tap="carvehiclelicense(1)" v-if="cbTax == 1" style="width: 50upx;color: #A57BFF;font-size: 38upx;">&#xe659;</text>
						<text style="margin-left: 17upx ;">有</text>
						<text class="iconfont" @tap="carvehiclelicense(2)" v-if="cbTax == 2" style="width: 50upx;color: #A57BFF;font-size: 38upx;margin-left: 17upx;">
							&#xe659;
						</text>
						<text class="iconfont radio" @tap="carvehiclelicense(4)" v-if="cbTax != 2" style=" width: 50upx;color: #989898;font-size: 38upx;">&#xe75b;</text>
						<text style="margin-left: 17upx ;">无</text>
					</view>
				</view> -->
				<view class="index-bottom">
					<view class="index-bottom-content" @tap="selectShop(1)">
						<text class="iconfont " style=" width: 50upx;color: #989898;font-size: 38upx;" v-if="smallShop">&#xe75b;</text>
						<text class="iconfont"  v-if="!smallShop" style="width: 50upx;color: #A57BFF;font-size: 38upx;">&#xe659;</text>
						<text style="margin-left: 17upx ;">微店</text>
					</view>
					<view class="index-bottom-content " @tap="selectShop(2)">
						<text class="iconfont " style=" width: 50upx;color: #989898;font-size: 38upx;" v-if="platform">&#xe75b;</text>
						<text class="iconfont"  v-if="!platform" style="width: 50upx;color: #A57BFF;font-size: 38upx;">&#xe659;</text>
						<text style="margin-left: 17upx ;">平台</text>
					</view>
				</view>
				<view class="base" v-if="!carData.isOrder && carData.isHandle">
					<button class="base-bottow" v-if="carData.carStatus == 1" form-type="submit">修改</button>
					<button class="base-bottow" v-if="carData.carStatus == 0" form-type="submit">发布</button>
				</view>
			</view>
		</form>
	</view>
</template>
<script>
import utils from '../../utils/utils.js';
import cityData from '../../components/cityData.js';
import { carUpdate } from '../../api/release.js';
import { carInfo } from '../../api/home.js';
export default {
	data() {
		return {
			startDate: '',
			carOldBoadTime: '请输入',
			carFactoryTime: '请输入',
			carMaturityTime: '请输入',
			text: '',
			cityData: cityData,
			TabCur: 0,
			scrollLeft: 0,
			select: '请选择',
			belonging: '请选择',
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
			fuelType: '汽油',
			fuelOil:0 ,
			usingNature: ['非营运','营运'],
			carNature: '非营运',
			carNatureType:0,
			gearbox: ['手动', '自动'],
			carGearbox: '手动',
			carGearboxType:0,
			smallShop: true,
			platform: true,
			carImg1: '',
			carImg2: '',
			carImg3: '',
			platforms: '',
			microShop: '',
			brandSeries: '', //品牌车型
			carId: '',
			carData: {},
			purchaseTax: '',
			carDrlicense: '',
			regCertificate: '',
			oldIdcard: '',
			ncInvoice: '',
			nciManual: '',
			calInsurance: '',
			cbTax: '',
			carStatus: '',
            carPicture: [],
		};
	},
	onLoad(query) {
		this.carId = query.carId;
		// this.carId = 251;
	  	carInfo({ carId: this.carId }).then(res => {
            this.carPicture = res.data.carImgList;
			for(var i in res.data){
				if(!res.data[i] && res.data[i] !== 0){
					res.data[i] = ''
				}
			}
			this.carData = res.data;
			this.carImg1 = res.data.carImg1;
			this.carImg2 = res.data.carImg2;
			this.carImg3 = res.data.carImg3;
			this.carOldBoadTime = res.data.carOldBoadTime;
			this.carFactoryTime = res.data.carFactoryTime;
			this.carMaturityTime = res.data.carMaturityTime;
			this.carNature = res.data.carNature;
			this.brandSeries = res.data.brandSeries;
			this.carDischarge = res.data.carDischarge;
			this.fuelType = res.data.fuelType;
      this.carType = res.data.carType;
			if(this.select=='请选择'){
				this.select=res.data.cityAttribution;
			    this.belonging=res.data.cityAttribution;
			}
			this.carGearbox = res.data.carGearbox;
			this.purchaseTax = res.data.purchaseTax;
			this.carDrlicense = res.data.carDrlicense;
			this.regCertificate = res.data.regCertificate;
			this.oldIdcard = res.data.oldIdcard;
			this.ncInvoice = res.data.ncInvoice;
			this.nciManual = res.data.nciManual;
			this.calInsurance = res.data.calInsurance;
			this.cbTax = res.data.cbTax;
			this.text = res.data.carDescribe;
			this.carStatus = res.data.carStatus;
			for (var i = 0; i < this.backgrounds.length; i++) {
				if (this.backgrounds[i].text == res.data.carColor) {
					this.TabCur = i;
				}
			}
			for (var j = 0; j < this.carTypes.length; j++) {
				if (this.carTypes[j] == res.data.carType) {
					this.changeType = j;
				}
			}
			for (var h = 0; h < this.emissions.length; h++) {
				if (this.emissions[h] == res.data.carDischarge) {
					this.emissionsType = h;
				}
			}
			for (var k = 0; k < this.fuel.length; k++) {
				if (this.fuel[k] == res.data.fuelType) {
					this.fuelOil = k;
				}
			}
			for(var j = 0;j < this.usingNature.length;j++){
				if(this.usingNature[j]==res.data.carNature){
					this.carNatureType = j;
				}
			}
			for(var l = 0;l < this.gearbox.length;l++){
				if(this.gearbox[l]==res.data.carGearbox){
					this.carGearboxType = l;
				}
			}
			
			if (res.data.microShop == 1) {
				this.smallShop = false;
				this.microShop = 1;
			} else {
				this.smallShop = true;
				this.microShop = 2;
			}
			if (res.data.platform == 1) {
				this.platforms = 1;
				this.platform = false;
			} else {
				this.platforms = 2;
				this.platform = true;
			}
		});
	},
	onShow() {
		// 所在地
		uni.getStorage({
			key: 'cityName',
			success: (res) => {
				this.belonging = res.data;
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
				this.select = res.data;
				if (this.belonging != '请选择') {
					uni.removeStorage({
						key: 'affiliation'
					});
				}
			}
		});
		// 品牌车型数据
		uni.getStorage({
			key: 'brandName',
			success: (res) => {
				this.brandSeries = res.data;
				if (this.brandSeries != '') {
					uni.removeStorage({
						key: 'brandName'
					});
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
		// 选择颜色
		tabSelect(item, index) {
			this.TabCur = index;
			this.carColor = item;
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
			this.fuelOil = index;
			this.fuelType= this.fuel[index];
		},
		// 使用性质
		natureChange(index) {
			this.carNatureType = index;
		    this.carNature = this.usingNature[index];
		},
		// 选择变速箱
		gearboxChange(index) {
		    this.carGearboxType = index;
			this.carGearbox = this.gearbox[index];
		},
		// 选择平台微店
		selectShop(item) {
			if (item == 1) {
				if (this.smallShop) {
					this.smallShop = false;
					this.microShop = 1;
				} else {
					this.microShop = 2;
					this.smallShop = true;
				}
			} else {
				if (this.platform == true) {
					this.platforms = 1;
					this.platform = false;
				} else {
					this.platforms = 2;
					this.platform = true;
				}
			}
		},
		// 提交
		submitFrom(e) {
			if (this.carImg1 == '' && this.carImg2 == '' && this.carImg3 == '') {
				utils.showTextToast('请上传车辆照片');
				return;
			}
			if (e.detail.value.carMileage == '') {
				utils.showTextToast('请输入表显示里程');
				return;
			}
      if(!/^\d+(\.\d{1,2})?$/.test(e.detail.value.carMileage)){
        utils.showTextToast('表显里程小数点后最多两位');
        return;
      }
			// if (this.boardDate == '') {
			// 	utils.showTextToast('请选择初次上牌时间');
			// 	return;
			// }
			if (this.carNature == '') {
				utils.showTextToast('请选择使用性质');
				return;
			}
			if (this.belonging == '') {
				utils.showTextToast('请选择车辆归属地');
				return;
			}
			if (e.detail.value.costPrice == '') {
				utils.showTextToast('请输入成本价');
				return;
			}
			if (e.detail.value.wholesalePrice == '') {
				utils.showTextToast('请输入批发价');
				return;
			}
			let data = {
				carImg1: this.carImg1,
				carImg2: this.carImg2,
				carImg3: this.carImg3,
        // carImgs: this.carPicture,
				carColor: this.carColor,
				carType: this.carType,
				carOldBoadTime: this.carOldBoadTime,
				carNature: this.carNature,
				carFactoryTime: this.carFactoryTime,
				carMaturityTime: this.carMaturityTime,
				cityLocation: this.belonging,
				cityAttribution: this.belonging,
				fuelType: this.fuelType,
				carDischarge: this.carDischarge,
				microShop: this.microShop,
				platform: this.platforms,
				operation: 2 ,
				carGearbox: this.carGearbox,
				purchaseTax: this.purchaseTax,
				carDrlicense: this.carDrlicense,
				regCertificate: this.regCertificate,
				oldIdcard: this.oldIdcard,
				ncInvoice: this.ncInvoice,
				nciManual: this.nciManual,
				calInsurance: this.calInsurance,
				cbTax: this.cbTax,
				brandSeries: this.brandSeries,
				carStatus: this.carStatus,
				carId: this.carId
			};
      console.log(this.carData);
			let parameters = {...this.carData, ...data };
			carUpdate(parameters).then(res => {
				if (res.code == 200) {
					uni.setStorage({
						key: 'carInformation',
						data: '',
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
		},
		endDate() {
			return this.getDate('end');
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			//let day = date.getDate();
			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year;
			}
			month = month > 9 ? month : '0' + month;
			//day = day > 9 ? day : '0' + day;
			return `${year}-${month}`;
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
	display: flex;
	flex-direction: row;
}
.on {
	border: 4upx solid #a57bff;
	background-color: #FFFFFF;
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
.active {
	color: #7f7f7f;
}
input{
	width: 80%;
	padding-left: 0;
}
.boos-nvget{
	width: 84%;
}

</style>
