/**
 * 分享相关模块
 *
 * **/
 import utils from '../../utils/utils.js';
 import { saveShareList } from '../../api/share.js';
 export default {
 	data() {
 		return {
			shareCarIds: [], // 需要分享的车辆id
			shareBtnTxt: '分享多辆车辆',
			checkedAll: false,
			isShare: false, // 分享按钮开关
			listStr: 'list',
      isShareDisable: true
			
		}
 	},
	onLoad(){
		// #ifdef MP-WEIXIN
		 uni.hideShareMenu();
		// #endif
	},
	watch: {
		shareCarIds(val) {
			if (val.length) {
        this.isShareDisable = false;
				this.checkedAll = (val.length === this[this.listStr].length);
			} else {
         this.isShareDisable = true;
      }
		}
	},
 	methods: {
		// 重置分享数据(防止数据残留)
		resetShare() {
			this.shareCarIds = []; // 防止出现残留数据
			this.isShare = false;
			this.shareBtnTxt = '分享多辆车辆'
			this.checkedAll = false;
		},
		// 获取选中需要分享的列表车辆
		checkboxChange(e) {
			const list = this[this.listStr];
			const values = e.detail.value;
			this.shareCarIds = values;
			if (values.length) {
				for (let i = 0; i < values.length; i++) {
					const item = list[i];
					if (values.includes(String(item.carId))) {
						this.$set(item, 'checked', true);
					} else {
						this.$set(item, 'checked', false);
					}
				}
			} else {
				list.forEach(item => {
					this.$set(item, 'checked', false);
				});
			}
			this[this.listStr] = list;
		},
		// 全选
		checkboxAll() {
			this.checkedAll = !this.checkedAll;
			const list = this[this.listStr];
			if (this.checkedAll) {
				this.shareCarIds = [];
				list.forEach(item => {
					this.$set(item,'checked',true)
					this.shareCarIds.push(item.carId);
				})
			} else {
				list.forEach(item => {
					this.$set(item,'checked',false)
				})
				this.shareCarIds = [];
			}
			this[this.listStr] = list;
		},
		// 调用分享
		shareCars(sharePage) {
		this.appShareFriend(sharePage = 'pages/share/share')
		},
		// app分享给好友
		appShareFriend(sharePage,shareMode = 3) {
			const that = this;
			const userInfo = uni.getStorageSync('userInfo');
			let sharePath = sharePage + '?' + 'type=' + shareMode  + '&shareIds=' + that.shareCarIds.join(',') + '&cusId='+ userInfo.cusId;
			// 保存分享记录
			saveShareList({shareUrl: '', shareType: 3, shareIds: that.shareCarIds.join(',') });
			uni.share({
			    provider: 'weixin',
          scene: "WXSceneSession",
			    type: 5,
			    imageUrl: 'http://img.schyxgl.com/logo2.jpg',
			    title: '车辆列表',
			    miniProgram: {
			        id: 'gh_c02989c31ca7',
			        path: sharePath,
			        type: 0,
			        webUrl: 'http://uniapp.dcloud.io'
			    },
			    success: ret => {
			    },
					fail(err) {
            console.log(JSON.stringify(err));
						utils.showTextToast('调起分享失败');
					}
			});
		},
		// 打开分享
		choiceShare() {
			this.isShare = !this.isShare;
			this.shareBtnTxt = this.isShare ? '取消' : '分享多辆车辆';
			!this.isShare && this.cancelShare();
		},
		// 取消分享
		cancelShare() {
			if (!this[this.listStr].length) return;
			const list = this[this.listStr];
			list.forEach(item => {
				this.$set(item,'checked',false)
			})
			this[this.listStr] = list;
			this.shareCarIds = [];
		}
 	}
 }