<!-- 卖车列表-->
<template>
	<view class="sellCar">
		<!-- 头部 -->
		<view class="navBox">
			<view class="texts" :class="{ navboxColor: on == 1 }" @tap="collect(1)"><text>已卖</text></view>
			<view class="texts" :class="{ navboxColor: on == 2 }" @tap="collect(2)"><text>未卖</text></view>
		</view>
		<!-- 内容列表 -->
		<view class="film-list-content">
			<view class="nowPlayingList">
				<scroll-view scroll-y >
					<view class="film-item" v-for="(item, index) in list" :key="index" @tap="details" :data-buyCarid="item.sellId">
						<text  class="iconfont icons" v-if="item.sellStatus == 0"></text>
						<text v-if="item.sellStatus == 1" class="iconfont icons">&#xe603;</text>
						<text v-if="item.sellStatus == 2" style="color: #000000;" class="iconfont icons">&#xe605;</text>
							<view class="file-top">
								<text>发布人:</text>
								<text>{{ item.cusNike }}</text>
							</view>
							<view class="file-next flex">
								<text class="file-next-text">卖主要求:</text>
								<text class="file-next-suffix contrue">{{ item.claim }}</text>
							</view>
							<view class="file-next flex">
								<text class="file-next-text">车主联系方式:</text>
								<text class="file-next-suffix">{{ item.phone }}</text>
							</view>
							<view class="file-next flex">
								<text class="file-next-text" v-if="item.sellStatus == 1">成交价:</text>
								<text class="file-next-text" v-else>车主预算:</text>
								<text class="file-next-suffix" style="color: #FA2C22;" v-if="item.sellStatus == 1">{{ item.realPrice }} 万</text>
                <text class="file-next-suffix" style="color: #FA2C22;" v-else>{{ item.hopePrice }} 万</text>
							</view>
							<view class="btns" v-if="item.sellStatus == 0">
								<button class="freshen" catchtap="" data-target="Modal" @tap="showModal($event, item.sellId)">成交</button>
								<button class="spreads" catchtap="" @tap="failure(item.sellId)">失败</button>
							</view>
							<view class="file-data">{{ item.createTime }}</view>
					</view>
				</scroll-view>
				<UiLoading :loadingType="loadingType"></UiLoading>
			</view>
		</view>
		<view class="add-text">
			<view class="add" @tap="jump">
				<text class="iconfont">&#xe81a;</text>
			</view>
		</view>
		<view class="cu-modal"  v-if="modalName == 'Modal'" :class="modalName == 'Modal' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="read">
					<input class="pay" type="number" maxlength="9" v-model="perice" placeholder="请输入成交价(万)" />
				</view>
				<view class="cu-bar bg-white">
					<view class="action text-blue center" @tap="hideModal">取消</view>
					<view class="action text-green center" @tap="update()">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import utils from '../../utils/utils.js';
	import {loadMoreList} from '../../mixins/index.js';
	import {sellcarsList,update,sellUpdate} from '../../api/collectlist.js';
	import UiLoading from '../../colorui/components/ui-loading.vue'
	export default {
		mixins: [loadMoreList],
		components: {UiLoading},
		name: 'sellCars',
		data() {
			return {
				on: 1,
				// 已卖
				carType: 1,
				modalName: null,
				perice: '',
				id: '',
				jumpid:'' ,//详情跳转ID
				loadingType: 2 
			};
		},
		onLoad(query) {
			if (query.type) {
				this.carType = query.type;
			}
			this.callback = data => {
				data.forEach(item => {
					item.claim = item.claim.replace(/\s/g,"")
				});
				this.list = data
			}
		},
		onShow() {
			if (this.carType == 1) {
				this.on = 1;
				this.get(sellcarsList, '1,2');
			} else {
				this.on = 2;
				this.get(sellcarsList, '0');
			}

		},
		methods: {
		   //新增跳转
			jump(){
			   	uni.navigateTo({
			   	 url: 'salecar/salecar',
			   	});
			},
			 // 详情跳转
			 details(e){
				 this.jumpid = e.currentTarget.dataset.buycarid || e.target.dataset.buycarid
				  uni.navigateTo({
				 	url: 'payCar/payCarInfo?carId='+ this.jumpid,
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
				this.loadingType= 0;
				this.reqFn = req;
				this.reqValue = 'list';
				this.params.pageSizeKey = 5;
				this.params.sellCarStatus = status;
				this.getList();
			},
			collect(type) {
				this.carType = type;
				this.on = type;
				this.list = [];
				if (this.carType == 1) {
					this.get(sellcarsList, '1,2');

				} else {
					this.get(sellcarsList, '0');
				}
			},
			// 跟新状态
			renew(req, state, perice) {
				req({
					sellCarId: this.id,
					sellStatus: state,
					realPrice: perice
				}).then(res => {
					if (res.code == 200) {
						this.modalName = null;
						this.collect(this.carType);
					} else {
						utils.showTextToast(res.msg);
					}
				});
			},
			// 成交
			update() {
        if (this.perice == '') {
          utils.showTextToast('请输入成交价');
          return;
        }
        if(!/^\d+(\.\d{1,2})?$/.test(this.carMileage)){
          utils.showTextToast('成交价小数点后最多两位');
          return;
        }
					this.renew(sellUpdate, 1, this.perice);
			},
			// 失败
			failure(id) {
				this.id = id;
				this.renew(sellUpdate, 2);
			}
		}
	};
</script>

<style  lang="less">
page{
	background-color: #f1f1f1;
}
.file-next-text{
	width: auto;
}
.file-next-suffix{
	width: 55%;
	text-align: left;
}
.film-list-content {
	padding: 0;
}
.navboxColor {
	color: #a57bff;
	border-bottom: 4upx solid #a57bff;
}
.nowPlayingList {
	width: 100%;
	text-align: center;
}
</style>
