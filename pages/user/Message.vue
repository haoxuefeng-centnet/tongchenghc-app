<!-- 消息 -->
<template>
	<view class="Message">
		<view class="nav">
			<view :class="{ colorOn: on == 1 }" @tap="change(1)">求购</view>
			<view :class="{ colorOn: on == 2 }" @tap="change(2)">估价</view>
		</view>
			<view class="" v-if="on == 1">
		<scroll-view scroll-y style="height: 100%;" >
		<view class="msg" v-for="item in list" :key="item.wantBuyId" >
			<view class=" flex align-center ">
				<text class="leftText">求购车型:</text>
				<text class="rightText contrue Modify ">{{ item.carType }}</text>
			</view>
			<view class="">
				<text class="leftText">姓名:</text>
				<text class="rightText">{{ item.cusNick }}</text>
			</view>
			<view class="">
				<text class="leftText">联系电话:</text>
				<text class="rightText">{{ item.phone }}</text>
			</view>
			<view class="flex align-center">
				<text class="leftText">备注:</text>
				<text class="rightText contrue Modifyleng">{{ item.description }}</text>
			</view>
			<view class="time leftText">{{ item.createTime }}</view>
		</view>
		</scroll-view>
		<UiLoading :loadingType="loadingType" :isLoad="isLoad"></UiLoading>
		</view>
		<!-- 估价 -->
		<view class="" v-if="on == 2">
		<scroll-view scroll-y style="height: 100%;">
		<view class="msg" v-for="item in list" :key="item.id" >
			<view class="">
				<text class="leftText">求购车型:</text>
				<text class="rightText">{{ item.carType }}</text>
			</view>
			<view class="">
				<text class="leftText">上牌时间:</text>
				<text class="rightText">{{ item.boardTime }}</text>
			</view>
			<view class="">
				<text class="leftText">行驶里程:</text>
				<text class="rightText">{{ item.mileage }} 万公里</text>
			</view>
			<view class="">
				<text class="leftText">联系电话:</text>
				<text class="rightText">{{ item.contactPhone }}</text>
			</view>
			<view class="time leftText">{{ item.createTime }}</view>
		</view>
		</scroll-view>
		<UiLoading :loadingType="loadingType" :isLoad="isLoad"></UiLoading>
		</view>
	</view>
</template>

<script>
import { carValuationList, payList } from '../../api/user.js';
import { loadMoreList } from '../../mixins/index.js';
import UiLoading from '../../colorui/components/ui-loading.vue'
const { formatDateTime } = require("../../utils/date.js");
export default {
	mixins: [loadMoreList],
	components: {
			UiLoading
		},
	data() {
		return {
			on: 1 ,
			loadingType:0,
		};
	},
	onLoad(option) {
    //1为估价请求 2 为求购请求
    //初始化请求
    this.reqFn = payList;
    this.reqValue = 'list';
    this.params.pageSizeKey = 5;
    // 判断是否微店进来  进来后重新设置请求方法
		if(option.on){
      this.on = option.on
      if (this.on == 1) {
      	this.reqFn = payList;
      } else {
      	this.reqFn = carValuationList;
      }
    }
    // 列表 
    this.getList(1, () => {
    	this.list.forEach(item => {
        item.createTime = this.formatDateTime(item.createTime)
      })
    })
	},
	methods: {
    //点击设置请求方法 
		change(type) {
			this.on = type
			if (this.on == 1) {
				this.reqFn = payList;
			} else {
				// 估价
				this.reqFn = carValuationList;
			}
      this.getList(1, () => {
      	this.list.forEach(item => {
          item.createTime = this.formatDateTime(item.createTime)
        })
      })
		}
	}
};
</script>

<style scoped lang="less">
.Message {
	background: rgba(242, 242, 242, 1);
	width: 100%;
	height: 100vh;
	.nav {
		background: #fff;
		display: flex;
		padding: 0 80upx;
		view {
			flex: 1;
			text-align: center;
			color: #989898;
			line-height: 60upx;
		}
		.colorOn {
			color: #a57bff;
			border-bottom: 4upx solid #a57bff;
		}
	}
	.msg {
		width: 700upx;
		padding: 16upx 0;
		margin: 16upx auto;
		padding-top: 22upx;
		padding-left: 30upx;
		position: relative;
		background: rgba(255, 255, 255, 1);
		box-shadow: 3upx 2upx 8upx 0px rgba(66, 71, 157, 0.22);
		border-radius: 10upx;
		line-height: 60upx;
		.leftText {
			color: #989898;
			font-size: 26upx;
			line-height: 45upx;
		}
		.rightText {
			color: #252525;
			font-size: 30upx;
			margin-left: 12upx;
			line-height: 45upx;
		}
		.time {
			position: absolute;
			right: 26upx;
			bottom: 24upx;
		}
	}
}
.Modify{
	max-width: 500upx;
	display: inline-block;
}
.Modifyleng{
	width: 400upx;
	height: 45upx;
}
</style>
>
