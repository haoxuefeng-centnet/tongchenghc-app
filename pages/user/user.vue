<!-- 我的 -->
<template>
  <view class="user">
    <view class="header flex justify-between align-center">
      <view class="flex align-center photo">
        <view class="photo-image">
          <image :src="userInfo.cusAvatar" mode="mode"></image>
        </view>
        <view class="names">
          <text class="text-ellipsis-1">{{userInfo.cusNick}}</text>
        </view>
      </view>
      <navigator hover-class="none" class="iconadd flex align-center" url="VIPcenter/VIPcenter">
        <text class="iconfont" :class="userInfo.isVip? 'on' : ''">&#xe68e;</text>
        <text class="iconfont" style="font-size: 45upx;">&#xe617;</text>
      </navigator>
    </view>
    <view class="count">
      <view class="title">我的分享</view>
      <view class="num">
        <view class="item" @tap="goMhare">
          <text class="number">{{shareLog.counts || 0}}</text>
          <text class="s-tit">本周分享次数</text>
        </view>
        <view class="item" @tap="jumprecords">
          <image class="connection" :src="shareLog.newestHead" mode=""></image>
          <text class="s-tit">客户浏览纪录</text>
        </view>
      </view>
    </view>
    <view class="operate" @tap="jumpbalance">
      <view class="viso">
        <text>我的账户</text>
        <text class=" rightImg" style="font-size:28upx;color:rgba(250,44,34,1); right: 55upx;">余额:￥{{userInfo.surplusMoney}}</text>
        <text class="iconfont rightImg">&#xe627;</text>
      </view>
    </view>
    <navigator hover-class="none" url="myorder/myorder">
      <view class="operate" style="margin-bottom: 10upx;">
        <view class="viso">
          <text>我的订单</text>
          <text class="iconfont rightImg">&#xe627;</text>
        </view>
      </view>
    </navigator>
    <view class="operate" @tap="Message">
      <view class="viso">
        <text>消息</text>
        <text class="iconfont rightImg">&#xe627;</text>
      </view>
    </view>
    <navigator hover-class="none" url="modify">
      <view class="operate">
        <view class="viso">
          <text>个人信息</text>
          <text class="iconfont rightImg">&#xe627;</text>
        </view>
      </view>
    </navigator>
    <view class="operate" @tap="jump">
      <view class="viso">
        <text>微店管理</text>
        <text class="iconfont rightImg">&#xe627;</text>
      </view>
    </view>
    <!-- <view class="operate" @tap="staff">
      <view class="viso">
        <text>员工账号管理</text>
        <text class="iconfont rightImg">&#xe627;</text>
      </view>
    </view> -->
    <navigator hover-class="none" url="bid/bid">
      <view class="operate">
        <view class="viso">
          <text>查看出价</text>
          <text class="iconfont rightImg">&#xe627;</text>
        </view>
      </view>
    </navigator>
    <view class="operate" @tap="tell">
      <view class="viso">
        <text>联系客服</text>
        <text class="iconfont rightImg">&#xe627;</text>
      </view>
    </view>
    <navigator hover-class="none" url="feedback">
      <view class="operate">
        <view class="viso">
          <text>意见反馈</text>
          <text class="iconfont rightImg">&#xe627;</text>
        </view>
      </view>
    </navigator>
    <navigator hover-class="none" url="aboutUs">
      <view class="operate">
        <view class="viso">
          <text>关于我们</text>
          <text class="iconfont rightImg">&#xe627;</text>
        </view>
      </view>
    </navigator>
    <view class="operate" @tap="loggedOut">
      <view class="viso">
        <text>退出登录</text>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    shareWeekLog
  } from '../../api/share.js';
  import {
    getUser,
    cusloginout
  } from '../../api/login.js';
  import utils from '../../utils/utils.js';
  // #ifdef APP-PLUS
  const jyJPush = uni.requireNativePlugin('JY-JPush');
  // #endif
  export default {
    data() {
      return {
        userInfo: {},
        storeId: '',
        url: '',
        shareLog: {} // 分享统计
      };
    },
    onShow() {
      const cusToken = uni.getStorageSync('cusToken');
      if (!cusToken) {
        wx.reLaunch({
          url: '/pages/login/login',
        })
        return;
      }
      // 用户信息
      getUser().then(res => {
        if (res.code === 200) {
          this.userInfo = res.data;
          if (!res.data.storeId) {
            this.storeId = '';
          } else {
            this.storeId = res.data.storeId;
          }
          if (!res.data.cityName) {
            uni.showModal({
              title: '提示',
              content: '个人信息不完整请去设置',
              confirmText: '前往设置',
              success: function(res) {
                if (res.confirm) {
                  uni.navigateTo({
                    url: 'modify',
                  });
                }
              }
            });
          }
          shareWeekLog().then(res => {
            if (res.code === 200) {
              this.shareLog = res.data;
            }
          })
          uni.setStorage({
            key: 'userInfo',
            data: res.data,
          });
        }
      });
    },
    methods: {
      jumpbalance() {
        uni.navigateTo({
          url: 'balance?money=' + this.userInfo.surplusMoney
        });
      },
      jumprecords() {
        uni.navigateTo({
          url: 'records/records?cusType=' + this.userInfo.cusType
        });
      },
      // 退出登陆
      loggedOut() {
        const that = this;
        uni.showModal({
          title: '提示',
          content: '您确认退出登录吗?',
          success: function(res) {
            if (res.confirm) {
              cusloginout().then(res => {
                if (res.code == 200) {
                  uni.clearStorage();
                  // #ifdef APP-PLUS
                    that.deleteJgAlias();
                  // #endif
                  uni.reLaunch({
                    url: '../home/index',
                  });
                } else {
                  utils.showTextToast('退出失败');
                }
              })
            }
          }
        });
      },
      // 删除极光推送的别名
      deleteJgAlias() {
        // 删除别名
        jyJPush.deleteJYJPushAlias({
        //  可以不用传值进去，但是需要配置这项数据
        }, result=> {
         console.log('delete_alias-> ' +  JSON.stringify(result));
        });
      },
      jump() {
        if (this.storeId) {
          uni.navigateTo({
            url: 'management/management?storeId=' + this.storeId
          });
        } else {
          uni.navigateTo({
            url: 'management/management'
          });
        }
      },
      getWeidian(url, item) {
        if (item == 1) {
          if (this.storeId) {
            if (this.userInfo.isVip) {
              uni.navigateTo({
                url: url
              });
            } else {
              uni.showModal({
                title: '提示',
                content: '您还未开通VIP，将前往开通',
                success: function(res) {
                  if (res.confirm) {
                    uni.navigateTo({
                      url: 'VIPcenter/VIPcenter'
                    })
                  }
                }
              });
            }
          } else {
            uni.showModal({
              title: '提示',
              content: '您还没有微店，将前往设置微店信息',
              success: function(res) {
                if (res.confirm) {
                  uni.navigateTo({
                    url: 'management/management'
                  })
                }
              }
            });
          }
        } else {
          if (!this.storeId) {
            uni.showModal({
              title: '提示',
              content: '您还没有微店，将前往设置微店信息',
              success: function(res) {
                if (res.confirm) {
                  uni.navigateTo({
                    url: 'management/management'
                  })
                }
              }
            });
          } else {
            uni.navigateTo({
              url: url
            })
          }
        }

      },
      Message() {
        this.getWeidian('Message', 1)
      },
      staff() {
        this.getWeidian('Employee/Employee', 2)
      },
      // 拨打电话
      tell() {
        uni.makePhoneCall({
          phoneNumber: '18080692828' //仅为示例
        });
      },
      // 进入详情页
      goMhare() {
        if (this.userInfo.cusType != 2) {
          uni.navigateTo({
            url: "myShare/myShare"
          })
        }
      },
      // 进入浏览记录
    }
  };
</script>

<style scoped lang="less">
  .user {
    background: rgba(242, 242, 242, 1);
    padding-bottom: 8upx;
    .header {
      height: 220upx;
      background: #fff;
      padding-left: 5%;

      .iconadd {
        font-size: 71upx;
        line-height: 100upx;
        margin: auto 0;
        color: #989898;
      }

      .names {
        font-size: 36upx;
        color: rgba(37, 37, 37, 1);
        padding-left: 5%;

        text {
          max-width: 340upx;
          display: inline-block;
        }

      }

      .photo {
        width: 500upx;
        margin: 40upx 0;

        .photo-image {
          width: 140upx;
          height: 140upx;
          border-radius: 50%;
        }

        image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }

    .count {
      width: 100%;
      margin-top: 6upx;
      height: 264upx;
      background: #fff;
      padding-top: 31upx;

      .title {
        margin-left: 24upx;
        font-size: 28upx;
        color: rgba(63, 63, 63, 1);
      }

      .num {
        display: flex;
        margin-top: 60upx;

        .item {
          flex: 1;
          font-size: 34upx;
          color: rgba(37, 37, 37, 1);
          text-align: center;

          text {
            display: block;
            text-align: center;
            line-height: 55upx;
          }

          .number {
            font-size: 26upx;
            color: rgba(115, 115, 115, 1);
          }

          .connection {
            width: 52upx;
            height: 52upx;
            border-radius: 50%;
            display: block;
            margin: auto;
            background: #F9F9F9;
          }
        }

        .s-tit {
          color: #737373;
          font-size: 26upx;
        }
      }
    }

    .operate {
      margin-top: 6upx;
      position: relative;
      font-size: 28upx;
      padding: 0 24upx;
      background: #fff;
      height: 80upx;
      color: #252525;

      .viso {
        line-height: 80upx;
      }

      .rightImg {
        position: absolute;
        right: 24upx;
      }
    }
  }

  .on {
    color: #6b73ff;
  }
</style>
