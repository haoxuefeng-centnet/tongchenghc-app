<template>
  <view :class="['swiper', customClass]">
    <swiper :indicator-dots="swiperSetting.indicatorDots" :autoplay="swiperSetting.autoplay" :interval="swiperSetting.interval" :duration="swiperSetting.duration" @change="swiperChange">
      <swiper-item v-for="item in bannerList" :key="item.id">
        <view class="swiper-item"><image :src="item[dataName]"></image></view>
      </swiper-item>
    </swiper>
    <view :class="['swiper-dots', dotPosition]" v-if="!swiperSetting.indicatorDots">
      <view :class="['dot', {'active': currentIndex === index}]" v-for="(item, index) in bannerList" :key="index"></view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    // 根节点class，用于修改默认样式
    customClass: {
      type: String,
      default: ''
    },
    // 轮播地址字段名
    dataName: {
      type: String,
      default: 'url'
    },
    // 指示器位置
    dotPosition: {
      type: String,
      default: 'right'
    },
    // 轮播设置
    swiperSetting: {
      type: Object,
      default() {
        return {
          indicatorDots: false,
          autoplay: true,
          interval: 3000,
          duration: 500
        };
      }
    },
    // 轮播图列表
    bannerList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    swiperChange(e) {
     this.currentIndex = parseInt(e.detail.current)
    }
  }
};
</script>
<style scoped lang="less">
.swiper {
  position: relative;
  swiper {
    height: 292upx;
    width: 100%;
    overflow: hidden;
    background: #f5f5f5;
    swiper-item {
      line-height: 100%;
      image {
        width: 100%;
        height: 292upx;
      }
    }
  }
}
.swiper-dots {
  position: absolute;
  z-index: 99;
  bottom: 30upx;
  font-size: 0;
  text-align: right;
  width: 100%;
  .dot{
    width: 14upx;
    height: 14upx;
    border-radius: 50%;
    border: 1upx solid #ccc;
   display: inline-block;
   vertical-align: middle;
   margin: 0 5upx;
   transition: all ease-in .3s;
   &.active {
    background: #fff;
   }
  }
  &.right {
    text-align: right;
      right: 46upx;
  }
  &.center {
    text-align: center;
  }
  &.left {
    text-align: left;
     left: 46upx;
  }
}
</style>
