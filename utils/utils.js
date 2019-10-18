// 工具类
import configs from './reqConfig'
export default class utils {
  // 小程序appid
  static appid = "wx1bb42905629b4c25"
  // 小程序密匙
  static secret = "df105563d5559918d6820720a5cd72de";

  // 图片上传地址
  static uploadImgUrl = configs.BASEURL + '/upload/img'
  // 图片查看地址
  static viewImgUrl = ''
  /**
   * 获取屏幕像素比（页面高度比例）
   * **/
  static getBoxHeight(id) {
    return new Promise((resolve, reject) => {
      if (!id || typeof id !== 'string' || id === '') {
        reject('Check the parameters that are passed in !')
      }
      uni.getSystemInfo({
        success(res) {
          let windowHeight = res.windowHeight;
          let boxHeight = 0
          //获取头部盒子高度
          let dom = uni.createSelectorQuery().select(id);
          dom
            .fields({
              size: true
            }, res2 => {
              if (!res2) {
                return;
              }
              //计算得出滚动区域的高度
              boxHeight = windowHeight - res2.height;
              resolve({
                height: boxHeight,
                msg: '0k'
              })
            })
            .exec();
        },
        fail(err) {
          reject(err);
        }
      });
    })
  }

  /**
   * 图片上传
	 * @param { string } uploadType  ‘one’ 指上传单张图片，不传默认单图上传 'more' 多图上传
	 * @param { object } params  请求参数
	 * @param { function } callback  回调参数（必须）
   * **/
  static uploadImg(paramData) {
    let params = paramData.params || {}
    let callback = paramData.callback || null
		let uploadType = paramData.callback.uploadType || 'one'
		if (!callback) {
			utils.showTextToast("缺少回调参数")
			return false
		}
    uni.chooseImage({
      success: (chooseImageRes) => {
        // 图片临时路径
        const tempFilePaths = chooseImageRes.tempFilePaths;
        if (uploadType === 'more') {
					utils.upLoadMoreFile(tempFilePaths, 0, params, callback)
				} else {
					utils.upLoadOneFile(tempFilePaths, params, callback)
				}
      }
    });
  }
	// 单图上传
	static upLoadOneFile(tempFilePaths, params, callback) {
	  const that = this
	  // 图片大小
	  // const imgSize = tempFilePaths[0].size
		// console.log('图片大小', imgSize)
		// console.log('图片', tempFilePaths)
	 //  if (imgSize > 524288) {
	 //    utils.showTextToast("图片超出大小限制，图片不得大于5M")
	 //    return false;
	 //  }
	  uni.uploadFile({
	    url: utils.uploadImgUrl,
	    filePath: tempFilePaths[0],
	    name: 'file',
	    formData: {
	      ...params,
	    },
	    header: {
	      'cusToken': uni.getStorageSync('cusToken'),
	      ...configs.HEADER
	    },
	    success: (res) => {
	      const data = JSON.parse(res.data)
	      if (data && data.code === 200) {
					callback && callback(data)
	      } else {
					utils.showTextToast(data.msg)
				}
	    },
	    fail(err) {
				console.error(err)
	      utils.showTextToast('上传图片失败')
	    }
	  });
	}
	
  // 多张图片上传
  static upLoadMoreFile(tempFilePaths, index, params, callback) {
    const that = this
    let upLoadIndex = index
    // 图片大小
    const imgSize = tempFilePaths[upLoadIndex].size
    if (imgSize > 1048576) {
      utils.showTextToast("图片超出大小限制，图片不得大于10M")
      return false;
    }
    uni.uploadFile({
      url: utils.uploadImgUrl,
      filePath: tempFilePaths[upLoadIndex],
      name: 'file',
      formData: {
        ...params,
      },
      header: {
        'X-Access-Token': uni.getStorageSync('cusToken'),
        ...configs.HEADER
      },
      success: (res) => {
        const data = JSON.parse(res.data)
        if (data && data.code === 200) {
          Index += 1
          upLoadIndex < tempFilePaths.length && utils.upLoadFile(tempFilePaths, upLoadIndex, params, callback)
        }
        callback(data)
      },
      fail(err) {
        utils.showTextToast(err)
      }
    });
  }
  /*
  页面内跳转
  url 跳转地址
  animateType 过渡动画
  time 过渡时间
  */
  static goPage(url, animateType = 'pop-in', time = 500) {
    uni.navigateTo({
      url,
      animationType: animateType,
      animationDuration: time
    });
  }

  static _cookie = "_cookie";

  static getCookie() {
    return uni.getStorageSync(this._cookie);
  }

  static setCookie(value) {
    return uni.setStorage({
      key: this._cookie,
      data: value
    });
  }

  static getUrl(url) {
    if (url.indexOf("http") > -1) {
      return url;
    }
    return this.viewImgUrl + url;
  }

  /**
   * 显示提示框 参数查看 https://uniapp.dcloud.io/api/ui/prompt?id=showtoast
   * @param obj
   */
  static showToast(obj) {
    uni.showToast(obj);
  }

  /**
   * 显示成功的提示
   * @param title
   */
  static showSuccessToast(title) {
    uni.showToast({
      title: title,
      icon: "success"
    });
  }

  /**
   * 显示文字的提示
   * @param title
   */
  static showTextToast(title) {
    uni.showToast({
      title: title,
      icon: "none",
      duration: 3000
    });
  }

  /**
   * 显示加载中
   * @param OBJECT
   */
  static showLoading(OBJECT) {
    uni.showLoading(OBJECT)
  }

  /**
   * 网络请求的加载中
   * @param title
   */
  static showRequestLoading(title) {
    if (title === undefined) {
      this.showLoading({
        title: "加载中...",
        mask: true
      });
    } else {
      this.showLoading({
        title: title,
        mask: true
      });
    }
  }

  /**
   * 隐藏加载提示
   */
  static hideLoading() {
    uni.hideLoading();
  }

  /**
   * 获取用户资料
   * @returns {any}
   */
  static getUserInfo() {
    return new Promise((reslove, reject) => {
      uni.getStorage({
        key: 'userInfo',
        success: function(res) {
          reslove({
            user: res.data,
            success: true
          })
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }

  /**
   * 设置用户资料
   * @param value 用户信息
   * @param callback 回调函数 
   * @returns {*}
   */
  static setUser(value, callback) {
    if (!value) {
      console.error('存入的用户信息不能为空')
      return
    }
    uni.setStorage({
      key: 'userInfo',
      data: value,
      success() {
        callback && callback()
      }
    })
  }
  /**
   ** 清除用户信息
   **/

  static clearUser() {
    try {
      uni.removeStorageSync('userInfo')
      uni.removeStorageSync('cusToken')
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * 获取微信的OPENID
   */
  static getOpenId() {
    return new Promise((reslove, reject) => {
      uni.getStorage({
        key: 'openId',
        success: function(res) {
          if (res.data) {
            reslove({ openId: res.data, success: true})
          } else {
            reslove({success: false})
          }
        },
        fail(err) {
          console.error(err)
          reslove({ err, success: false})
        }
      });
    })
  }

}
