<!--找车 -->
<template>
  <view class="index">
    <view class="search flex justify-between">
      <navigator hover-class="none" class="district flex" url="city?city=1">
        <view class="contrue" style="width: 70%;">
          <text class="text-ellipsis">{{ cityLocation != '' ? cityLocation : '全国' }}</text>
        </view>
        <text class="iconfont">&#xe62f;</text>
      </navigator>
      <view class="right-box flex align-center">
        <text class="iconfont seachImg" @tap="search">&#xe612;</text>
        <view class="inputs">
          <input type="text" value="" confirm-type="search" @confirm="search()" v-model="carName" placeholder="输入想查找的车" />
        </view>
      </view>
    </view>
    <view class="nav">
      <view class="item">
        <navigator hover-class="none" url="../modelsChoose/brand">
          <view class="picker">
            <text class=" text-ellipsis-1 title">{{ type || '品牌' }}</text>
            <text class="iconfont">&#xe607;</text>
          </view>
        </navigator>
      </view>
      <view class="item" @change="priceChange">
        <picker @change="priceChange" range-key="name" :value="index" :range="priceData">
          <view class="picker">
            <text class=" text-ellipsis-1 title">{{ price }}</text>
            <text class="iconfont">&#xe607;</text>
          </view>
        </picker>
      </view>
      <view class="item" @change="ageChange">
        <picker @change="ageChange" range-key="name" :value="index" :range="ageData">
          <view class="picker">
            <text class=" text-ellipsis-1 title">{{ age }}</text>
            <text class="iconfont">&#xe607;</text>
          </view>
        </picker>
      </view>
      <view class="item" @change="sortChange">
        <picker @change="sortChange" range-key="name" :value="index" :range="sortData">
          <view class="picker">
            <text class=" text-ellipsis-1 title">{{ sorts }}</text>
            <text class="iconfont">&#xe607;</text>
          </view>
        </picker>
      </view>
    </view>
    <view class="navTop contents flex justify-end">
      <view class="public-share-btn" @tap="choiceShare()">{{ shareBtnTxt }}</view>
    </view>
    <view class="vehicleList-content">
      <scroll-view scroll-y style="height: 100%;">
        <checkbox-group class="public-checkbox-list" @change="checkboxChange">
          <view class="vehicleList-contents" v-for="item in list" :key="item.carId">
            <label class="public-checkbox" v-if="isShare">
              <checkbox :value="item.carId" :checked="item.checked" />
            </label>
            <view class="layout" @tap="lesJump(item.carId)">
              <image :src="item.carImg1"></image>
              <view class="layoutList">
                <text class="layoutList-a layoutList-width">{{ item.brandSeries || '——' }}</text>
                <view class="layoutList-b layoutList-width">
                  <text>{{ item.carOldBoadTime}}年</text>
                  <text class="layoutList-e">|</text>
                  <text>{{ item.carMieage }}万公里</text>
                  <text class="layoutList-e">|</text>
                  <text>{{ item.cityLocation }}</text>
                </view>
                <view class="layoutList-c layoutList-width">
                  <view>
                    <text class="layoutList-c-price" v-if="item.interPrice">￥{{ item.interPrice }}万</text>
                    <text class="layoutList-c-price" v-else>未定价</text>
                    <!-- 											<text class="layoutList-c-prices" style=" text-decoration: line-through;">{{ item.costPrice }}万</text>
 -->
                  </view>
                  <text class="layoutList-c-right layoutList-c-prices">{{item.createTime}}</text>
                </view>
              </view>
            </view>
          </view>
        </checkbox-group>
      </scroll-view>
      <UiLoading :loadingType="loadingType"></UiLoading>
    </view>
    <view class="flex justify-between public-share-fixed" v-show="isShare">
      <view class="item flex align-center">
        <label class="public-checkbox" @click="checkboxAll()">
          <checkbox value="" :checked="checkedAll" />
        </label>
        <text class="lefts">全选</text>
      </view>
      <view class="item flex align-center">
        <view class="text">已选择 {{ shareCarIds.length }} 辆车</view>
        <!-- #ifdef MP-WEIXIN -->
        <button type="primary" open-type="share" :data-sharecarIds="shareCarIds" :disabled="isShareDisable" class="public-share-btn">分享</button>
        <!-- #endif -->
        <!-- #ifdef APP-PLUS -->
        <button type="primary" :disabled="isShareDisable" class="public-share-btn" @tap="shareCars()">分享</button>
        <!-- #endif -->
      </view>
    </view>
  </view>
</template>

<script>
  import {
    findCar
  } from '../../api/home.js';
  import utils from '../../utils/utils.js';
  import {
    loadMoreList,
    shareMixins
  } from '../../mixins/index.js';
  import UiLoading from '../../colorui/components/ui-loading.vue';
  import {
    saveShareList
  } from '../../api/share.js';
  export default {
    mixins: [loadMoreList, shareMixins],
    components: {
      UiLoading
    },
    data() {
      return {
        cityLocation: '',
        countyLocation: '',
        carName: '',
        type: '',
        price: '价格',
        priceData: [{
            name: '不限',
            key: ''
          },
          {
            name: '4万以内',
            key: '4-below'
          },
          {
            name: '4-8万',
            key: '4-8'
          },
          {
            name: '8-15万',
            key: '8-15'
          },
          {
            name: '15-25万',
            key: '15-25'
          },
          {
            name: '25-40万',
            key: '25-40'
          },
          {
            name: '40万以上',
            key: '40-up'
          }
        ],
        ageData: [{
            name: '不限',
            key: ''
          },
          {
            name: '1年以内',
            key: '1-below'
          },
          {
            name: '1-3年',
            key: '1-3'
          },
          {
            name: '3-5年',
            key: '3-5'
          },
          {
            name: '5-8年',
            key: '5-8'
          },
          {
            name: '8-10年',
            key: '8-10'
          },
          {
            name: '10年以上',
            key: '10-up'
          }
        ],
        age: '车龄',
        sortData: [{
            name: '不限',
            key: '',
            sortType: ''
          },
          {
            name: '价格从低到高',
            key: 'price',
            sortType: '0'
          },
          {
            name: '价格从高到低',
            key: 'price',
            sortType: '1'
          },
          {
            name: '车龄从低到高',
            key: 'age',
            sortType: '0'
          },
          {
            name: '车龄从高到低',
            key: 'age',
            sortType: '1'
          },
        ],
        sorts: '排序',
        sortNum: '',
        sortType: '',
        priceNum: '',
        ageNum: '',
        cartype: '',
        items: ''
      };
    },
    // #ifdef MP-WEIXIN
    onShareAppMessage(res) {
      let sharecarids = [];
      if (res.from === 'button') { // 来自页面内分享按钮
        sharecarids = res.target.dataset.sharecarids.join(',');
        saveShareList({
          shareUrl: '',
          shareType: 3,
          shareIds: sharecarids
        }).then(res => {})
      }
      const userInfo = uni.getStorageSync('userInfo');
      return {
        title: '车辆列表',
        path: '/pages/share/share?type=3' + '&shareIds=' + sharecarids + '&cusId=' + userInfo.cusId
      }
    },
    // #endif
    onLoad() {
      this.reqFn = findCar;
      this.reqValue = 'list';
      this.params.pageSizeKey = 20;
      this.callback = data => {
        data.forEach(item => {
          item.carOldBoadTime = item.carOldBoadTime.substring(0, 4);
          item.checked = false;
        });
        this.list = data
      }
    },
    onShow() {
      this.resetShare();
      // 获取选择的城市
      this.cityLocation = uni.getStorageSync('cityName') || '全国'
      // 品牌车型数据
      this.type = uni.getStorageSync('brandName') || ''
      if (this.cityLocation) {
        this.getCar();
      }
    },
    onUnload() {
      uni.removeStorageSync('brandName');
      uni.removeStorageSync('cityName');
    },
    methods: {
      lesJump(item) {
        uni.navigateTo({
          url: '../vehicleDetails/vehicleDetail?carId=' + item
        });
      },
      // 选择
      getCar() {
        this.list = [];
        this.params.keyword = this.carName;
        this.params.brandSeries = this.type;
        this.params.age = this.ageNum;
        this.params.price = this.priceNum;
        this.params.sort = this.sortNum;
        this.params.sortType = this.sortType;
        this.params.cityLocation = this.cityLocation;
        this.getList()
      },
      // 车价
      priceChange(e) {
        this.price = this.priceData[e.detail.value].name;
        this.priceNum = this.priceData[e.detail.value].key;
        this.getCar();
      },
      // 车龄
      ageChange(e) {
        this.age = this.ageData[e.detail.value].name;
        this.ageNum = this.ageData[e.detail.value].key;
        this.getCar();
      },
      // 排序
      sortChange(e) {
        this.sortType = this.sortData[e.detail.value].key;
        this.sorts = this.sortData[e.detail.value].name;
        this.sortNum = this.sortData[e.detail.value].sortType;
        this.getCar();
      },
      // 搜索
      search() {
        this.getCar();
      },
    }
  };
</script>

<style scoped lang="less">
  .index {
    width: 100%;
    min-height: 100vh;
    background: rgba(242, 242, 242, 1);
    padding-bottom: 20upx;

    .search {
      width: 100%;
      padding: 16upx 25upx;
      font-size: 32upx;
      color: rgba(37, 37, 37, 1);
      background: #fff;

      .district {
        width: 20%;
        height: 100%;
        margin: auto 0;
        flex-direction: row;
      }

      .right-box {
        width: 80%;
        position: relative;
        background: rgba(242, 242, 242, 1);
        border-radius: 33upx;
        height: 66upx;

        text {
          position: absolute;
          left: 2;
        }
      }

      .seachImg {
        line-height: 70upx;
        position: relative;
        left: 28upx;
        display: block;
        position: absolute;
      }


    }

    .nav {
      width: 100%;
      height: 80upx;
      display: flex;
      background: #fff;
      padding-top: 30upx;
      line-height: 80upx;

      .item {
        flex: 1;
        height: 80upx;
        text-align: center;
        font-size: 30upx;
        color: rgba(37, 37, 37, 1);
        line-height: 80upx;

        .picker {
          .title {
            max-width: 120upx;
            font-size: 28upx;
            color: #666;
          }
        }

        text {
          color: rgba(152, 152, 152, 1);
          margin-left: 6upx;
          font-size: 20upx;
          max-width: 200rpx;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }

  .navTop {
    margin-top: 15upx;
    padding: 0 24upx;

    .public-share-btn {
      display: block;
      border-radius: 10rpx;
      font-size: 32rpx;
      padding: 0 40rpx;
    }
  }

  .layout {
    margin: 15upx auto;
  }

  .inputs {
    width: 100%;
    padding-left: 91upx;

  }

  input {
    font-size: 24upx;
    line-height: 24upx;
  }
</style>
