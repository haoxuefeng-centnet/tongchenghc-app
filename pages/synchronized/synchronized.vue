<!-- 车辆信息未同步  -->
<template>
	<view class="index">
		<!-- image 上传-->
		<view class="indexImage">
			<view class="indexImages">
				<image class="indexImages-a"></image>
				<text class="indexImages-title">车辆照片</text>
			</view>
			<view class="indexImages">
				<image class="indexImages-a"></image>
				<text class="indexImages-title">车辆照片</text>
			</view>
			<view class="indexImages">
				<image class="indexImages-a"></image>
				<text class="indexImages-title">车辆照片</text>
			</view>
		</view>
		<!-- 基本信息 -->
		<view class="index-text">基本信息</view>
		<view class="boos">
			<view class="boos-lise">
				<view class="boos-title">车身颜色</view>
				<text class="boos-content">黑色</text>
			</view>
			<view class="boos-lise">
				<view class="boos-title">品牌车型</view>
				<text class="boos-content">奥迪A6</text>
			</view>
			<view class="boos-lise">
				<view class="boos-title">表显里程</view>
				<text class="boos-content">179KM</text>
			</view>
			<view class="boos-lise">
				<view class="boos-title">初次上牌</view>
				<text class="boos-content">2018年6月</text>
			</view>
			<view class="boos-lise">
				<view class="boos-title">车牌号</view>
				<text class="boos-content">川A MH988</text>
			</view>
			<view class="boos-lise">
				<view class="boos-title">使用性质</view>
				<text class="boos-content">非营运</text>
			</view>
			<view class="boos-lise">
				<view class="boos-title">出厂日期</view>
				<text class="boos-content">2018年1月</text>
			</view>
			<view class="boos-lise">
				<view class="boos-title">年检到期日</view>
				<text class="boos-content">2018年1月</text>
			</view>
			<view class="boos-lise">
				<view class="boos-title">钥匙数量</view>
				<text class="boos-content">2</text>
			</view>
			<view class="boos-lise">
				<view class="boos-title">车辆所在地</view>
				<text class="boos-content">四川省成都市</text>
			</view>
			<view class="boos-lise">
				<view class="boos-title">车辆归属地</view>
				<text class="boos-content">四川省成都市</text>
			</view>
			<!--  -->
			<view class="index-text">价格信息</view>
			<!--  -->
			<view class="boos-lise">
				<view class="boos-title">成本价</view>
				<text class="boos-content">28</text>
				<text class=" boos-iconst-text">万元</text>
			</view>
			<view class="boos-lise">
				<view class="boos-title">网络标价</view>
				<text class="boos-content">34</text>
				<text class="boos-iconst-text">万元</text>
			</view>
			<!--  -->
			<view class="index-text">手续信息</view>
			<!--  -->
			<view class="tabList">
				<text class="tabtitle">购置税证</text>
				<view class="tabList-content">
					<radio-group class="tabcontent" @change="radioChange">
						<label class="tabcontent" style="margin: 0 8upx;" v-for="(item, index) in items" :key="item.value">
							<radio style="margin: 0 8upx; color: red" :value="item.value" :checked="index === current" />
							<view style="margin: auto 8upx;">{{ item.name }}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="tabList">
				<text class="tabtitle">行驶证</text>
				<view class="tabList-content">
					<radio-group class="tabcontent" @change="radioChange">
						<label class="tabcontent" style="margin: 0 8upx;" v-for="(item, index) in items" :key="item.value">
							<radio style="margin: 0 8upx; color: red" :value="item.value" :checked="index === current" />
							<view style="margin: auto 8upx;">{{ item.name }}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="tabList">
				<text class="tabtitle">登记证</text>
				<view class="tabList-content">
					<radio-group class="tabcontent" @change="radioChange">
						<label class="tabcontent" style="margin: 0 8upx;" v-for="(item, index) in items" :key="item.value">
							<radio style="margin: 0 8upx; color: red" :value="item.value" :checked="index === current" />
							<view style="margin: auto 8upx;">{{ item.name }}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="tabList">
				<text class="tabtitle">原车主身份证</text>
				<view class="tabList-content">
					<radio-group class="tabcontent" @change="radioChange">
						<label class="tabcontent" style="margin: 0 8upx;" v-for="(item, index) in items" :key="item.value">
							<radio style="margin: 0 8upx; color: red" :value="item.value" :checked="index === current" />
							<view style="margin: auto 8upx;">{{ item.name }}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="tabList">
				<text class="tabtitle">新车发票</text>
				<view class="tabList-content">
					<radio-group class="tabcontent" @change="radioChange">
						<label class="tabcontent" style="margin: 0 8upx;" v-for="(item, index) in items" :key="item.value">
							<radio style="margin: 0 8upx; color: red" :value="item.value" :checked="index === current" />
							<view style="margin: auto 8upx;">{{ item.name }}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="tabList">
				<text class="tabtitle">交强险单</text>
				<view class="tabList-content">
					<radio-group class="tabcontent" @change="radioChange">
						<label class="tabcontent" style="margin: 0 8upx;" v-for="(item, index) in items" :key="item.value">
							<radio style="margin: 0 8upx; color: red" :value="item.value" :checked="index === current" />
							<view style="margin: auto 8upx;">{{ item.name }}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="tabList">
				<text class="tabtitle">商业险单</text>
				<view class="tabList-content">
					<radio-group class="tabcontent" @change="radioChange">
						<label class="tabcontent" style="margin: 0 8upx;" v-for="(item, index) in items" :key="item.value">
							<radio style="margin: 0 8upx; color: red" :value="item.value" :checked="index === current" />
							<view style="margin: auto 8upx;">{{ item.name }}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="tabList">
				<text class="tabtitle">车船税证</text>
				<view class="tabList-content">
					<radio-group class="tabcontent" @change="radioChange">
						<label class="tabcontent" style="margin: 0 8upx;" v-for="(item, index) in items" :key="item.value">
							<radio style="margin: 0 8upx; color: red" :value="item.value" :checked="index === current" />
							<view style="margin: auto 8upx;">{{ item.name }}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="index-bottom">
				<view class="index-footer-content"><text style="color: #0081FF;">同步到微店</text></view>
				<view class="index-footer-content" style=" background: #007AFF;"><text style="color: #FFFFFF;">同步到微店及平台</text></view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			title: 'radio 单选框',
			items: [
				{
					value: 'USA',
					name: '有'
				},
				{
					value: 'CHN',
					name: '无',
					checked: 'true'
				}
			],
			current: 0
		};
	},
	methods: {
		radioChange(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
		}
	}
};
</script>
<style>
.boos-title{
	color: #989898;
}
</style>
