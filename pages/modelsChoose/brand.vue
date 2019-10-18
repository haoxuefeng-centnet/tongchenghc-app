<!-- 品牌选择 -->
<template>
	<view>
		<view>
			<phone-directory :isShow="!isShow" :phones="citylist" v-if="citylist" @paramClick="paramClick"></phone-directory>
		</view>
		<!-- <ScreenLoading :isShow="isShow"></ScreenLoading> -->
	</view>
</template>

<script>
	import {
		brandAlone
	} from '../../api/models.js'
	import phoneDirectory from '@/components/phone-directory/phone-directory.vue'
	export default {
		name: "phones",
		components: {
			phoneDirectory
		},
		data() {
			return {
				// 列表数据
				citylist: {} ,
				id: '',
				name: '',
				isShow: true
			}
		},
		onLoad() {
      uni.showLoading({
          title: '加载中'
      });
		brandAlone().then(res => {
			if (res.code == 200) {
				this.citylist = res.data
        uni.hideLoading();
			}
		}).finally(() => {
			this.isShow = false
		})
		},
		onShow() {},
		methods: {
			paramClick(e) {
				this.id = e.brandid
				this.name = e.brandname
				uni.navigateTo({
					url: `branMdodels/branMdodels?id=${this.id}&name=${this.name}`
				});
			}
		}
	}
</script>

<style>

</style>
