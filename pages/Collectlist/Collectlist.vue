<!-- 收车列表 -->
<template>
	<view class="payCar">
		<!-- 头部 -->
		<view class="navBox">
			<view class="texts" :class="{ navboxColor: carType == '1,2' }" @tap="collect('1,2')"><text>已收</text></view>
			<view class="texts" :class="{ navboxColor: carType == 0 }" @tap="collect(0)"><text>未收</text></view>
		</view>
		<!-- 内容列表 -->
		<view class="film-list-content">
			<view class="nowPlayingList">
				<scroll-view scroll-y>
					<view class="film-item" v-for="item in list" :key="item.buyCarId" @tap="details" :data-buyCarid="item.buyCarId" :data-cartype="item.carType">
					 <text  class="iconfont icons" v-if="item.buyStatus == 0"></text>
					 <text  class="iconfont icons" v-if="item.buyStatus == 1">&#xe603;</text>
					 <text  class="iconfont icons" style="color: #000000;" v-if="item.buyStatus == 2">&#xe605;</text>
						<view class="file-top">
							<text>发布人:</text>
							<text>{{ item.cusNike }}</text>
						</view>
						<view class="file-next flex ">
							<text class="file-next-text ">车辆信息:</text>
							<text class="file-next-suffix file-next-title contrue">{{ item.carType }}</text>
						</view>
						<view class="file-next flex">
							<text class="file-next-text">车主联系方式:</text>
							<text class="file-next-suffix">{{ item.phone }}</text>
						</view>
						<view class="file-next flex">
							<text class="file-next-text" v-if="item.buyStatus==1">成交价:</text>
							<text class="file-next-text" v-else>车主期望价格:</text>
              <text class="file-next-suffix" style="color: #FA2C22;" v-if="item.buyStatus==1">{{ item.clinchPrice }} 万</text>
							<text class="file-next-suffix" style="color: #FA2C22;" v-else>{{ item.hopePrice }} 万</text>
						</view>
						<view class="btns" v-if="item.buyStatus==0">
							<button class="freshen" catchtap="" data-target="Modal" @tap="showModal($event, item.buyCarId)">成交</button>
							<button class="spreads" catchtap="" @tap="failure(item.buyCarId)">失败</button>
						</view>
						<view class="file-data">{{ item.createTime }}</view>
					</view>
				</scroll-view>
				<UiLoading :loadingType="loadingType"></UiLoading>
			</view>
		</view>
		<view class="cu-modal" v-if="modalName == 'Modal'" :class="modalName == 'Modal' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="read"><input class="pay" maxlength="9" type="number" v-model="perice" placeholder="请输入成交价(万)" /></view>
				<view class="cu-bar bg-white">
					<view class="action text-blue center" @tap="hideModal">取消</view>
					<view class="action text-green center" @tap="update()">确定</view>
				</view>
			</view>
		</view>
		<view class="add-text" >
				<view class="add" @tap="jump"><text class="iconfont">&#xe81a;</text></view>
		</view>
	</view>
</template>

<script>
	import utils from '../../utils/utils.js';
	import {loadMoreList} from '../../mixins/index.js';
	import {collectList,update,sellUpdate} from '../../api/collectlist.js';
	import UiLoading from '../../colorui/components/ui-loading.vue'
	export default {
		mixins: [loadMoreList],
		components: {UiLoading},
		data() {
			return {
				on: 1,
				// 已收
				carType: '1,2',
				modalName: null,
				perice: '',
				id: '',
				buyCarId: '', //车辆ID
				loadingType: 2 
			};
		},
		onLoad(query) {
			if (query.type) {
				this.carType = query.type;
			}
		},
		onShow() {
			this.get(collectList, this.carType);
		},
		methods: {
			// 新增跳转
			jump(){
				uni.navigateTo({
					url: 'collectNew/collectNew'
				});
			},
			/* 详情跳转 */
			details(e) {
				this.buyCarId = e.currentTarget.dataset.buycarid || e.target.dataset.buycarid
				uni.navigateTo({
					url: 'collectInfo/collectInfo?id=' + this.buyCarId
				});

			},
			showModal(e, id) {
				this.modalName = e.currentTarget.dataset.target;
				this.id = id;
			},
			hideModal(e) {
				this.modalName = null;
			},
			get(req, status) {
				this.loadingType = 0;
				this.reqFn = req;
				this.reqValue = 'list';
				this.params.pageSizeKey = 5;
				this.params.buyStatus = status;
				this.getList();
			},
			collect(type) {
				this.carType = type;
				this.on = type;
				this.list = [];
				if (this.carType == '1,2') {
					this.get(collectList, '1,2');
				} else {
					this.get(collectList, '0');
				}
			},
			// 成交
			update() {
				if (this.perice != '') {
          if(!/^\d+(\.\d{1,2})?$/.test(this.perice)){
                  utils.showTextToast('成交价小数点后最多两位');
                  return;
                }
					update({
						buyCarId: this.id,
						buyStatus: 1,
						clinchPrice: Number(this.perice)
					}).then(res => {
						if (res.code == 200) {
							this.modalName = null;
							this.perice = '';
							this.collect(this.carType);
							utils.showTextToast(res.msg);
						} else {
							utils.showTextToast(res.msg);
						}
					});
				} else {
					utils.showTextToast('请输入成交价');
				}
			},
			// 失败
			failure(id) {
				this.id = id;
				update({
					buyCarId: this.id,
					buyStatus: 2
				}).then(res => {
					if (res.code == 200) {
						this.collect(this.carType);
						utils.showTextToast(res.msg);
					} else {
						utils.showTextToast(res.msg);
					}
				});
			}
		}
	};
</script>

<style lang="less">
page{
	background-color: #f1f1f1;
}
.film-list-content {
	padding: 0;
}
.file-next-text{
	width: auto;
}
.nowPlayingList {
	width: 100%;
	text-align: center;
}
.navboxColor {
	color: #a57bff;
	border-bottom: 4upx solid #a57bff;
}
</style>
