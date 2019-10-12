<template>
  <!-- 通用加载组件 -->
  <view class="ui-loading">
    <!-- 准备加载 -->
    <view v-show="loadingType === 0">
       <view class="padding-sm flex justify-center">
       	<view class="loading-start">
       	  <text></text>
       	  <text></text>
       	  <text></text>
       	  <text></text>
       	</view>
       </view>
			<view class="text" style="color: #999; width: 100%; margin-top: 15upx; text-align: center;">加载中...</view>
    </view>
    <!-- 加载中 -->
    <view class="padding-sm flex justify-center loading-proceed" v-show="loadingType === 1">
      <text class="text" :style="{ color: textColor}">准备加载更多内容</text>
    </view>
    <!-- 已加载完成 -->
    <view class="padding-sm flex justify-center loading-end" v-show="loadingType === 2">
      <text class="text" :style="{ color: textColor}">没有更多内容了</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    // 是否显示加载背景
    loadingType: {
      type: Number,
      default: 0 //  0 正在加载 1 准备加载数据 2 加载完毕
    },
    // 提示字体颜色
    textColor: {
      type: String,
      default: '#999'
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>  
.text {
  font-size: 24upx;
  // margin-right: 30upx;
}
.loading-start {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 1.4em;
  text {
    width: 0.2em;
    height: 0.6em;
    background-color: #a57bff;
  }
  text:nth-of-type(1) {
    animation: grow 1s -0.45s ease-in-out infinite;
  }

  text:nth-of-type(2) {
    animation: grow 1s -0.3s ease-in-out infinite;
  }

  text:nth-of-type(3) {
    animation: grow 1s -0.15s ease-in-out infinite;
  }

  text:nth-of-type(4) {
    animation: grow 1s ease-in-out infinite;
  }

  @keyframes grow {
    0%,
    100% {
      transform: scaleY(1);
    }

    50% {
      transform: scaleY(2);
    }
  }
}
</style>
