<template>
	<view>
		<scroll-view
			class="scroll-list"
			:scroll-top="1"
			scroll-y="true"
			:scroll-with-animation="scrollAnimationOFF"
			:scroll-into-view="scrollViewId"
			@scroll="handleScroll"
		>
			<view class="phone-list" >
				<view class="list-item" v-for="(item, key) of phones" :key="key" :id="key" >
					<view class="list-item-title">{{ key }}</view>
					<view
						class="list-item-phone"
						@click="handleClick"
						hover-class="commonly-hover"
						:hover-start-time="20"
						:hover-stay-time="70"
						v-for="innerItem in item"
						:key="innerItem.brandId"
						:data-brandId="innerItem.brandId"
						:data-brandName="innerItem.brandName"
					>
						{{ innerItem.brandName }}
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	name: 'phone-list',
	props: {
		phones: Object,
		letter: String,
		scrollAnimationOFF: Boolean
	},
	data() {
		return {
			winHeight: 0,
			scrollTop: 0,
			letterDetails: [],
			timer: null
		};
	},
	computed: {
		scrollViewId() {
			return this.letter;
		}
	},
	mounted() {
		// #ifndef APP-PLUS
		this.winHeight = uni.getSystemInfoSync().windowHeight - 49.5;
		//#endif

		//#ifdef APP-PLUS
		this.winHeight = uni.getSystemInfoSync().windowHeight - 100;
		//#endif
	},
	methods: {
		handleClick(e) {
			this.$emit('handleClick', e.target.dataset);
		},
		handleScroll(e) {
			// if (this.letterDetails.length === 0) {
			// 	let view = uni.createSelectorQuery().selectAll('.list-item');
			// 	view.boundingClientRect(data => {
   //        console.log(data)
			// 		let top = data[0].top;
			// 		data.forEach((item, index) => {
			// 			item.top = item.top - top;
			// 			item.bottom = item.bottom - top;
			// 			this.letterDetails.push({
			// 				id: item.id,
			// 				top: item.top,
			// 				bottom: item.bottom
			// 			});
			// 		});
			// 	}).exec();
			// }

			const scrollTop = e.detail.scrollTop;
			this.letterDetails.some((item, index) => {
				if (scrollTop >= item.top && scrollTop <= item.bottom - 5) {
					this.$emit('change', item.id);
					this.$emit('reset', true);
					return true;
				}
			});
		}
	}
};
</script>

<style>
.commonly-hover {
	background-color: #eee;
}

.scroll-list {
	flex: 1;
	height: 100vh;
	overflow-y: hidden;
}

.phone-list {
	display: flex;
	background-color: #fff;
	flex-direction: column;
	position: relative;
	width: 100%;
  /* height: 100%; */
}

.list-item {
	width: 100%;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	height: 92upx;
	background-color: #fff;
	height: 100%;
}

.list-item > .list-item-phone {
	font-weight: normal;
}

.list-item-title {
	width: 100%;
	height: 50upx;
	line-height: 50upx;
	font-weight: bold;
	background-color: #eee;
	padding: 0 20upx;
	border-bottom: 1px solid #e5e5e5;
}

.list-item-phone {
	width: 100%;
	height: 70upx;
	line-height: 70upx;
	font-size: 25upx;
	font-weight: bold;
	padding: 0 20upx;
	border-bottom: 1px solid #e5e5e5;
}
</style>
