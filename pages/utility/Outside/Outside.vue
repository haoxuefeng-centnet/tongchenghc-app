<!-- 外链 -->
<template>
	<view class="contenss">
		<web-view :src="urls"></web-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				urls:'',
        formData:{}
			}
		},
		onLoad(option) {
        // 1 为维保查询  2 为车险查询
       this.formData = option
       
		},
		onShow() {
      if(this.formData.item == 1){
      // #ifdef APP-PLUS
        this.urls = decodeURIComponent(this.formData.urls) 
      // #endif
      // #ifdef MP-WEIXIN
      const escapeUrl = decodeURIComponent(this.formData.urls)
      this.urls = escapeUrl.replace('api.chaboshi.cn','app.schyxgl.com/proxy')
      // #endif
      }else if(this.formData.item == 2){
        this.urls = decodeURIComponent(this.formData.urls)
      }
		},
		methods: {
			
		}
	}
</script>

<style>
.contenss{
	width: 100%;
	height: 100%;
}
</style>
