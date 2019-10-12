<!--预定收车 心愿单 -->
<template>
	<view class="wishlist ">
		<view class="cu-list menu-avatar ">
			<view class="cu-item" style="height: 170upx;" :class="modalName == 'move-box-' + index ? 'move-cur' : ''" v-for="(item, index) in students"
			 :key="index" @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
				<view class="indentList" :data-id="item.reserveId" @tap="jump">
					<view class="listings flex justify-between">
						<text class="listingstitle">{{ item.brandSeries }}</text>
						<text>{{ item.createTime }}</text>
					</view>
					<view class="listings-bottom flex flex-direction">
						<view class="">
							<text class="modelskes contrue" v-if="item.brandSeries">{{ item.brandSeries }} </text>
							<text class="modelskes contrue" v-if="item.carMileage"> | {{ item.carMileage }}万公里 </text>
							<text class="modelskes contrue" v-if="item.carType"> | {{ item.carType }}</text>
						</view>
						<view class="">
							<text class="modelskes contrue" v-if="item.carColor">{{ item.carColor }} </text>
							<text class="modelskes contrue" v-if="item.regionProvince"> | {{ item.regionProvince }} </text>
							<text class="modelskes contrue" v-if="item.regionCity"> | {{ item.regionCity }}</text>
						</view>
					</view>
				</view>
				<view :data-reserveId="item.reserveId" class="move" style="width: 130upx;" @tap="showModal">
					<view class="bg-red">删除</view>
				</view>
			</view>
			<view>
				<UiLoading :loadingType="loadingType"></UiLoading>
			</view>
		</view>
		<view class="buttons">
			<view class="" @tap="jumps">
				<text class="iconfont add">&#xe81a;</text>
			</view>
		</view>
	</view>
</template>
<script>
import utils from '../../utils/utils.js';
import {reserveList,reserveUpdate,reserveDel} from '../../api/wishlist.js';
import UiLoading from '../../colorui/components/ui-loading.vue';
	export default {
		components:{
			UiLoading
		},
		data() {
			return {
				listTouchStart: 0,
				listTouchDirection: null,
        modalName:null,
				students: '' ,//列表数据
				noData:'',
				loadingType: 2,
				modalReserve: null,
			};
		},
		onShow() {
			this.getData();
			this.listTouchDirection = null,
			this.modalName = null
		},
		methods: {
			//获取列表
			getData() {
				this.loadingType = 0;
				reserveList().then(res => {
					if (res.code == 200) {
					 this.students = res.data;
					}
				}).finally(() => {
				  this.loadingType= 2;
				});
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX;
			},
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left';
			},
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target;
				}else{
					this.modalName = null;
				}
			},
			// 详情页跳转
			jump(e) {
				let id = e.currentTarget.dataset.id || e.target.dataset.id;
				uni.navigateTo({
					url: `wishDetails/wishDetails?reserveId=${id}`
				});
			},
			// 删除操作
			showModal(e) {
				let reserveId = e.currentTarget.dataset.reserveid || e.target.dataset.reserveid
				uni.showModal({
					content: '是否删除',
					success: (res) => {
						this.modalName = null;
						this.listTouchDirection = null;
						if (res.confirm) {
							reserveDel(reserveId).then(res => {
								if (res.code == 200) {
									this.getData();
								}
							});
						}
					}
				});
			},
			
			jumps() {
				uni.navigateTo({
					url: 'Duetocollect/Duetocollect'
				})
			}
		}
	};
</script>
<style scoped lang="less">
	page {
		background: #f1f1f1;
	}

	.wishlist {
		width: 100%;
		padding-top: 8upx;
	}

	.wishlist-content {
		width: 100%;
		height: 166upx;
		line-height: 166upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 3upx 2upx 8upx 0upx rgba(66, 71, 157, 0.22);
		align-items: center;
	}

	.indentList {
		width: 90%;
		height: 120upx;
		margin: auto;
		font-size: 22upx;
		color: rgba(152, 152, 152, 1);
	}

	.listingstitle {
		width: 75%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 30upx;
		color: #000000;
		font-weight: 500;
	}

	.listings {
		height: 50upx;
		line-height: 50upx;
	}

	.listings-bottom view {
		margin: 10upx 0;
	}

	.move-cur {
		transform: translateX(-70px) !important;
	}

	.buttons {
		width: 100%;
		position: fixed;
		bottom: 20upx;
	}
	.cu-dialog {
		padding-top: 30upx;
	
		.container {
			padding: 0 30upx;
	
			.input {
				border-bottom: 1rpx solid #ececec;
			}
	
			.hint-text {
				padding-top: 20upx;
			}
		}
	}
	.modelskes{
		max-width: 200upx;
		display: inline-block;
	}
</style>
