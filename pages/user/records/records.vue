<!-- 浏览纪录 -->
<template>
	<view>
		<scroll-view scroll-y style="height: 100%;" v-if="cusType === 0">
			<uni-collapse :accordion="true" @change="collapseChange">
				<view class="more-container" v-for="item in list" :key="item.cusId">
					<uni-collapse-item :title="item.cusNick" :show-animation="true" :image="item.cusAvatar" :open="item.open" @loadMore="loadMore" :isShowMoreBtn="isLoadingmore">
						<view class="more-item">
							<scroll-view scroll-y style="height:100%;">
               <!-- <view class="">
                  <text>{{childList.length}}</text>
                </view> -->
								<navigator :url="'recordsdetails/recordsdetails?shareId='+ grid.shareId" v-for="grid in childList" :key="grid.cusId">
									<view class="records-list flex flex-direction">
										<view class="recordsList flex">
											<image :src="grid.sharePhoto" mode=""></image>
											<view class="text-ellipsis-1 recordsList-right">
												<text class="">{{grid.shareName}}</text>
											</view>
										</view>
										<view class="recordsList-bottom flex justify-between">
											<view class="flex justify-between">
												<text class="">{{grid.createTime}}</text>
												<text class="" style="margin-left: 50upx;" v-show="grid.shareType === 1">微店分享</text>
												<text class="" style="margin-left: 50upx;" v-show="grid.shareType === 2">微店车辆分享</text>
												<text class="" style="margin-left: 50upx;" v-show="grid.shareType === 3">平台车辆分享</text>
											</view>
											<view class="flex justify-between">
												<image :src="grid.browserUrl" style="width: 36upx;height: 36upx;" mode=""></image>
												<text class="" style="margin: 0 10upx;">{{grid.browserCount || 0}}个客户看过</text>
												<text class="iconfont">&#xe617;</text>
											</view>
										</view>
									</view>
								</navigator>
							</scroll-view>
						</view>
					</uni-collapse-item>
				</view>
				
			</uni-collapse>
		</scroll-view>
		<scroll-view scroll-y style="height: 100%;" v-if="cusType !== 0">
			<view class="list-item" v-for="item in list" :key="item.cusId">
				<view class="recordsss">
					<navigator :url="'recordsdetails/recordsdetails?shareId=' + item.shareId">
						<view class="records-list flex flex-direction">
							<view class="recordsList flex">
								<image :src="item.sharePhoto"></image>
								<view class="text-ellipsis-1 title-name"><text class="">{{item.shareName}}</text></view>
							</view>
							<view class="recordsList-bottom flex justify-between">
								<view class="flex justify-between">
									<text class="">{{item.createTime}}</text>
									<text class="" style="margin-left: 50upx;" v-show="item.shareType === 1">微店分享</text>
									<text class="" style="margin-left: 50upx;" v-show="item.shareType === 2">微店车辆分享</text>
									<text class="" style="margin-left: 50upx;" v-show="item.shareType === 3">平台车辆分享</text>
								</view>
								<view class="flex justify-between">
									<image :src="item.browserUrl" style="width: 36upx;height: 36upx;" mode=""></image>
									<text class="" style="margin: 0 10upx;">{{item.browserCount || 0}}个客户看过</text>
									<text class="iconfont">&#xe617;</text>
								</view>
							</view>
						</view>
					</navigator>
				</view>
			</view>
		</scroll-view>
		<UiLoading :loadingType="loadingType"></UiLoading>
	</view>
</template>
<script>
	import uniCollapse from '../../../components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '../../../components/uni-collapse-item/uni-collapse-item.vue'
	import {
		shareStaff,
		shareItemList
	} from '../../../api/share.js'
	import utils from '../../../utils/utils.js';
	import {
		loadMoreList
	} from '../../../mixins/index.js';
	import UiLoading from '../../../colorui/components/ui-loading.vue';
	export default {
		mixins: [loadMoreList],
		components: {
			UiLoading,
			uniCollapse,
			uniCollapseItem
		},
		data() {
			return {
        staffList: [],
				childList: [],
				pages: 0,
				noMore: false,
				currentPage: 1,
				activeItem: {},
				currentIndex: 0,
				isLoadingmore: false,
				cusType: null
			};
		},
		onLoad(route) {
			this.cusType = Number(route.cusType);
			if (Number(route.cusType) === 0) {
				shareStaff().then(res => {
          if(res.code === 200) {
            this.list = res.data;
            this.loadingType = 2;
          }
        });
        this.reqFn = shareItemList;
			} else {
				this.reqFn = shareItemList;
			}
			this.reqValue = 'list';
			this.params.pageSizeKey = 30;
		},
		onShow() {
		if(this.cusType !== 0) {
      this.getList(1, () => {
      	this.list.forEach(item => {
      		item.open = false;
      	})
      })
    }
		},
		methods: {
			collapseChange(activeItem) {
				this.currentPage = 1
				if (!activeItem.length) {
					return false;
				}
				const index = activeItem[0];
				this.currentIndex = index;
				this.activeItem = this.list[index];
				this.noMore = false;
				this.isLoadingmore = false;
				this.getItemData(() => {
					this.list[this.currentIndex].open = true;
				});
			},
			loadMore() {
				if (this.currentPage >= this.pages) {
					utils.showTextToast('没有更多内容了');
					return;
				}
				this.currentPage++;
				this.getItemData();
			},
			// 加载浏览数据
			getItemData(callback) {
				this.childList = [];
				utils.showRequestLoading();
				shareItemList({
          cusId: this.activeItem.cusId,
					pageNumKey: this.currentPage,
					pageSizeKey: 100
				}).then(res => {
					if (res.code === 200) {
						this.pages = res.data.pages;
						this.currentPage = res.data.pageNum;
						if (this.pages > 0) {
							if (res.data.pageNum > this.pages) {
								this.isLoadingmore = false;
							} else {
								this.isLoadingmore = !(res.data.pageNum === this.pages);
								this.childList = [...this.childList, ...res.data.list];
							}
						} else {
							this.isLoadingmore = false;
							utils.showTextToast('暂无内容');
						}
						callback && callback();
					}
				}).finally(() => {
					utils.hideLoading();
				})
			}
		}
	};
</script>
<style lang="less">
	page {
		background-color: #F1F1F1;
	}

	.records {
		width: 93%;
		overflow: hidden;
		margin: 10upx auto;
		// background: rgba(255, 255, 255, 1);
		border-radius: 10upx;
		transition: 0.3s;

	}
	.recordsss{
		width: 93%;
		overflow: hidden;
		margin: 10upx auto;
		background: rgba(255, 255, 255, 1);
		border-radius: 10upx;
		transition: 0.3s;
	}
	.recordss {
		width: 100%;
		background: rgba(255, 255, 255, 1);
		margin-top:20upx ;
	}

	.tiells {
		margin-left: 20upx;
	}

	.records-title {
		margin: 0 auto;
		width: 100%;
		height: 110upx;
		line-height: 100upx;
		padding: 0 5%;
		box-shadow: 3upx 2upx 8upx 0upx rgba(66, 71, 157, 0.22);
		border-radius: 10upx 10upx 0upx 0upx;
	}

	.iconfont {
		font-size: 33upx;

	}

	.on {
		transition: 0.3s;
	}

	.records-left {
		height: 100%;
		flex-direction: row;

		image {
			width: 70upx;
			height: 70upx;
			border-radius: 50%;
			background-color: black;
			margin: auto 0;
		}

		text {
			margin: auto 0;
			margin-left: 20upx;
		}
	}

	.records-list {
		width: 100%;
		border-bottom: 2upx solid #f2f2f2;

		.recordsList {
			width: 93%;
			height: 100upx;
			line-height: 100upx;
			margin: 31upx auto 0;
			padding: 0 5%;
			background: rgba(242, 242, 242, 1);
			border-radius: 10upx;
			flex-direction: row;

			image {
				width: 80upx;
				height: 80upx;
				border-radius: 10upx;
				margin: auto 0;
				background-color: #fff;
			}

			view {
				line-height: 100upx;
				margin-left: 20upx;
			}
		}
	}

	.recordsList-bottom {
		padding: 0 2%;
		line-height: 100upx;
		color: #989898;
		font-size: 26upx;
		image {
			width: 36upx;
			height: 36upx;
			border-radius: 50%;
			margin: auto 0;
		}
		text {
			line-height: 100upx;
			}
	}

	.load-more {
		padding: 20upx;
		text-align: center;
		font-size: 28upx;
		color: #999;
		position: relative;
		z-index: 9999;
	}

	.more-item {
		// max-height: 300px;
		overflow-y: auto;
		position: relative;
	}

	.title-name {
		width: 460upx;

		text {
			display: inline-block;
			max-width: 100%;
		}
	}
	.more-container {
		background: #fff;
	}
	.recordsList-right{
		max-width: 500upx;
	}
</style>
