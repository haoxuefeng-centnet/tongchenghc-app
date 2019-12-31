<script>
	import utils from "./utils/utils";
 // #ifdef APP-PLUS
    const jyJPush = uni.requireNativePlugin('JY-JPush');
 // #endif
	export default {
		methods: {
      // 生成极光推送所需要的别名
      getJiGuangAlias() {
        let alias = new Date().getFullYear() + Math.random().toString(36).substr(2);
        return alias;
      },
			// 获取当前客户端平台
			getSystemInfo(data) {
				const that = this;
				let key = null;
				try {
				    const res = uni.getSystemInfoSync();
						key = res.platform;
				} catch (e) {
				    // error
						console.log(JSON.stringify(err))
				}
				if (key) {
					switch(key) {
						case 'ios':
						that.goCarInfo(1, data);
						break;
						case 'android':
						that.goCarInfo(2, data);
						break;
						default:
						console.error('没有获取到手机系统信息')
					}
				}
			},
			// 根据推送通知消息进入不同的详情
			goCarInfo(type, data) {
				if (type === 1) {
					console.log('ios')
					if (!data.payload.id) { return false; }
					uni.navigateTo({
						url: '/pages/Wishlist/wishDetails/wishDetails?reserveId=' + data.payload.id
					})
				} else if(type === 2) {
					// const content = data.payload.replace(/[\\]/g, '');
					// const message = JSON.parse(content);
					// console.log(JSON.stringify(message));
          const res = JSON.parse(data);
          const res2 = JSON.parse(res.params);
					if ( typeof res2 !== 'object') { return false; }
					uni.navigateTo({
						url: '/pages/Wishlist/wishDetails/wishDetails?reserveId=' + res2.id
					})
				} else {
					console.error('获取数据失败')
				}
			}
		},
		onLaunch: function() {
      const that = this;
		// 消息推送
		// #ifdef APP-PLUS
    // 个推
		// const _self = this;
		// const _handlePush = function(message) {
		// 	plus.nativeUI.toast('接收到了消息～～～');
		// 	if(message) {
		// 		_self.getSystemInfo(message);
		// 		setTimeout(() => {
		// 			// 清空当前消息记录
		// 			plus.push.remove( message );
		// 		}, 500);
		// 		}
		// }
		// // 从系统消息中心点击消息启动应用事件
		// 	plus.push.addEventListener('click', function(message) {
		// 		// plus.nativeUI.toast('push click');
		// 		_handlePush(message);
		// 	});
		// 	// 用从推送服务器接收到推送消息事件
		// 		plus.push.addEventListener('receive', function(message) {
		// 			// plus.nativeUI.toast('push receive');
		// 			// _handlePush(message);
		// 			if (message) {
		// 				 plus.push.remove( message );
		// 			}
		// 	});
    
    // 极光推送
    // jyJPush.getRegistrationID(result=> {
    //  如果极光配置成功，则会返回正常数据，可以按照此项判断是否初始化成功
    //  返回的数据会有registrationID，errorCode
    //  若registrationID为0，则需要核对appkey和包名等
    // console.log('初始化' + JSON.stringify(result));
    // });
    // 处理进程杀死
    jyJPush.getLastPushInfo(result=> {
        console.log("lastPushInfo = " + JSON.stringify(result));
        if (result.errorCode == 0) {
            //  没有数据或者其他错误
            return;
        }
        //  这里处理点击事件，和addJYJPushReceiveOpenNotificationListener方法的事件一直就行
      });
      // jyJPush.deleteJYJPushAlias({
      // }, result=> {
      //   console.log('删除别名成功' + JSON.stringify(result) );
      // });
      // 点击消息
      jyJPush.addJYJPushReceiveNewOpenNotificationListener(result=> {
        console.log(JSON.stringify(result.notificationExtras));
        that.getSystemInfo(result.notificationExtras)
      });
      //  iOS
      jyJPush.ios_removeNotification(result=> {
         console.log('iOS 删除消息' + JSON.stringify(result))
      });
      //  Android
      jyJPush.android_clearAllNotifications(result=> {
          console.log('android 删除消息' + JSON.stringify(result))
      });
		// #endif
		},
		onShow: function() {
      console.log('App.vue Show')
        // let data = "{\"params\":\"{\\\"type\\\":\\\"reserve\\\",\\\"id\\\":71}\"}";
        // const res = JSON.parse(data);
        // const res2 = JSON.parse(res.params);
        // console.log('接收到的数据' + JSON.stringify(res2));
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>



<style>
	/* ui */

	/* 布局相关所有测试时参考main.css */
	@import "./colorui/main.css";
	/* 图标相关参考 */
	@import "./colorui/icon.css";

	/* 字体图标 */
	@import "./common/css/iconfont.css";

	/* 公共组件 css*/
	@import "./common/css/public.css";

	view,
	navigator {
		box-sizing: border-box;
		line-height: 100%;
	}

	/* 修改默认checkbox大小 */
	/*checkbox 选项框大小  */
	.public-checkbox checkbox .wx-checkbox-input {
		width: 40upx;
		height: 40upx;
		font-size: 0 !important;
		text-align: center;
		border: 0 !important;
		border-radius: 50%;
		background: url("./static/icon/check.png") no-repeat center center;
		background-size: 100% 100%;
	}

	/*checkbox选中后样式  */
	.public-checkbox checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		width: 40upx;
		height: 40upx;
		border-radius: 50%;
		font-size: 0;
		background-image: url("./static/icon/checked.png");
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: center center;
	}

	/*checkbox选中后图标样式  */
	.public-checkbox checkbox::before {
		display: none !important;
	}

	button::after {
		display: none;
	}
</style>
