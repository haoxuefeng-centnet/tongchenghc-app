<script>
	import utils from "./utils/utils";
  // #ifdef APP-PLUS
  const jyJPush = uni.requireNativePlugin('JY-JPush');
  // #endif
	export default {
		methods: {
			// 获取当前客户端平台
			getSystemInfo() {
				const that = this;
				let key = null;
				try {
				    const res = uni.getSystemInfoSync();
						key = res.platform;
				} catch (e) {
				    // error
						console.log(JSON.stringify(err))
				}
        return key || '';
			},
      // 处理极光数据
      resetJsPushData(data) {
        const re = /[\\]/g;
        const platform = this.getSystemInfo();
        console.log('platform', platform);
        if (platform === 'android') {
         const notificationExtras = JSON.parse(data);
         const params = JSON.parse(notificationExtras.params);
         console.log('params-> ' + params.id);
         uni.navigateTo({
         	url: '/pages/Wishlist/wishDetails/wishDetails?reserveId=' + params.id
         }) 
        }
      },
			// 根据推送通知消息进入不同的详情
			goCarInfo(type, data) {
				if (type === 1) {
					console.log('ios');
					if (!data.payload.id) { return false; }
					uni.navigateTo({
						url: '/pages/Wishlist/wishDetails/wishDetails?reserveId=' + data.payload.id
					})
				} else if(type === 2) {
					const content = data.payload.replace(/[\\]/g, '');
					const message = JSON.parse(content);
					// console.log(JSON.stringify(message));
					if ( typeof data !== 'object') { return false; }
					uni.navigateTo({
						url: '/pages/Wishlist/wishDetails/wishDetails?reserveId=' + message.id
					})
				} else {
					console.error('获取数据失败')
				}
			}
		},
		onLaunch: function() {
		// 消息推送
		// #ifdef APP-PLUS
		const _self = this;
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
		
    // 极光
    // 获取别名
    jyJPush.getJYJPushAlias({
    }, res=> {
      console.log('get_alias', JSON.stringify(res));
      if (!res.alias) {
          const radomStr = Math.random().toString(36).slice(-8);
          console.log('初始别名' + radomStr);
          uni.setStorageSync('pushAlias', radomStr);
        // 设置别名初始
        	jyJPush.setJYJPushAlias({
        	//  按照自己的业务需求来设置
        	userAlias: radomStr,
        	}, result=> {
        	//  设置成功或者失败，都会通过这个result回调返回数据；数据格式保持极光返回的安卓/iOS数据一致
        	//  注：若没有返回任何数据，考虑是否初始化完成
           console.log('set_alias-> ' +  JSON.stringify(result));
        	});
      } else {
        uni.setStorageSync('pushAlias', res.alias);
        console.log('有别名' + res.alias);
      }
    });
      
			jyJPush.addJYJPushReceiveOpenNotificationListener(result=> {
			//  监听成功后，若点击推送消息，会触发result；数据格式保持极光返回的安卓/iOS数据一致
			 console.log('res' + JSON.stringify(result));
       _self.resetJsPushData(result.notificationExtras);
			});
		// #endif
		},
		onShow: function() {
			console.log('App Show');
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
