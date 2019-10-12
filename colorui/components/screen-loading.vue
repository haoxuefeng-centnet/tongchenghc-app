<template>
  <!-- 全屏加载组件 -->
  <view class="fixed-screen" v-show="isShow" :style="{background: bgColor}">
    <view class="container flex align-center justify-center">
      <view class="flex-sub radius shadow-lg">
        <image src="http://img.schyxgl.com/loading-white.gif" mode="aspectFit" class="gif-white response" style="height:240upx"></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    // 是否显示加载背景
    isShow: {
      type: Boolean,
      default: false
    },
    // 加载背景色
    bgColor: {
      type: String,
      default: '#fff'
    }
  },
  data() {
    return {
      animation: '',
      list: [
        {
          name: 'fade',
          color: 'red'
        },
        {
          name: 'scale-up',
          color: 'orange'
        },
        {
          name: 'scale-down',
          color: 'olive'
        },
        {
          name: 'slide-top',
          color: 'green'
        },
        {
          name: 'slide-bottom',
          color: 'cyan'
        },
        {
          name: 'slide-left',
          color: 'blue'
        },
        {
          name: 'slide-right',
          color: 'purple'
        },
        {
          name: 'shake',
          color: 'mauve'
        }
      ],
      toggleDelay: false
    };
  },
  methods: {
    Toggle(e) {
      var anmiaton = e.currentTarget.dataset.class;
      this.animation = anmiaton;
      setTimeout(() => {
        this.animation = '';
      }, 1000);
    },
    ToggleDelay() {
      this.toggleDelay = true;
      setTimeout(() => {
        this.toggleDelay = false;
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../colorui/animation.css';

image{
  border-radius: 6upx;
  display: block;
}
.fixed-screen {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  .container {
    width: 100%;
    height: 100vh;
  }
}
</style>
