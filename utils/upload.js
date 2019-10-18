import utils from './utils.js';
class Upload {
  constructor(arg) {
    this.uploadUrl = arg.api;
    this.uploadList = 0;
    this.uploadCurrentIndex = 0;
    this.uploadParams = {};
    this.uploadLoading = true;
  }
  // 选择图片
  choiceImg() {
    const that = this;
    that.upLoading('正在读取图片, 请稍等');
    uni.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        that.uploadList = tempFilePaths;
        if (that.uploadParams.MaxNumber && (that.uploadParams.MaxNumber < tempFilePaths.length)) {
          utils.showTextToast('超出文件上传最大数量' + that.uploadParams.MaxNumber);
          that.ressetUpload();
        } else {
          that.uploadData();
        }   
      },
      fail(err) {
        if (err.errMsg.indexOf('cancel') === -1) {
          utils.showTextToast('打开相册失败');
          console.error(err); 
        }
      },
      complete() {
        that.hideLoading();
      }
    });
  }
  upLoading(msg) {
    utils.showLoading({
      title: msg || '上传中...',
      icon: 'none',
      mask: true,
    })
  }
  hideLoading() {
    utils.hideLoading();
  }
  // 上传文件
  uploadData() {
    const that = this;
    that.uploadLoading && that.upLoading();
    uni.uploadFile({
      url: that.uploadUrl ,
      filePath: that.uploadList[that.uploadCurrentIndex],
      name: 'file',
      formData: { ...that.uploadParams.params },
      header: that.uploadParams.headers,
      success: (res) => {
        const { successBack, failBack, complateBack, callback } = that.uploadParams;
        let data = JSON.parse(res.data) || {};
        if (data.code === 200) {
          successBack(data);
          // 根据 that.uploadCurrentIndex 判断是否需要继续上传图片
          if(that.uploadCurrentIndex < that.uploadList.length - 1) {
            that.uploadCurrentIndex += 1;
            that.uploadData();
          } else {
            that.ressetUpload();
            callback && callback();
          }
        } else {
          that.ressetUpload();
          failBack(data);
        }
        complateBack && complateBack(res);
      },
      fail(err) {
        BaseConfig.showTextToast('上传图片失败');
        console.log(err);
        that.ressetUpload();
      }
    });
  }
  // 上传完成后重置数据
  ressetUpload() {
    this.uploadCurrentIndex = 0;
    this.uploadList = [];
    this.uploadLoading && this.hideLoading();
  }
  /**
   * 上传方法（供外部调用）
   * @param { object } paramsData  upload相关的参数
   * @param { object } paramsData.params 上传时附带的额外参数
   * @param { object } paramsData.headers 上传时请求头附带的额外参数
   * @param { number } paramsData.MaxNumber 上传最大文件数(不传则不限制)
   * @param { function } paramsData.uploadLoading 是否显示上传动画， 默认为true
   * @param { function } paramsData.successBack 上传成功的回调函数
   * @param { function } paramsData.failBack 上传失败的回调函数
   * @param { function } paramsData.complateBack 上传成功、失败都执行的回调函数
   * @param { function } paramsData.callback uploadList中所有文件上传完成的回调函数
   * **/ 
  uploadMetod(paramsData) {
    if (typeof paramsData !== 'object') {
      throw Error('upload params is must a object');
    }
    this.uploadParams = paramsData;
    this.uploadLoading = paramsData.uploadLoading !== undefined ? paramsData.uploadLoading : true;
    this.choiceImg();
  }
}
export default new Upload({
  api: utils.uploadImgUrl
})
