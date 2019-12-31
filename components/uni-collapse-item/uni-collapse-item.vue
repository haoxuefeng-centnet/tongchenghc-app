<template>
	<view :class="['recordss',{'uni-collapse-cell--disabled':disabled}]">
		<view class="flex justify-between align-center records-title" @click="onClick">
			<view class="records-left flex justify-between align-center">
				<image :src="image" mode=""></image>
				<view style="padding-left: 20rpx;">{{ title }}</view>
			</view>
			<view :class="{'uni-active':isOpen,'uni-collapse-cell--animation':showAnimation===true}" class="uni-collapse-cell__title-arrow">
				<text class="iconfont"  style="color: #6B73FF;">&#xe60b;</text>
			</view>
		</view>
		<view :class="{'uni-collapse-cell--animation':showAnimation===true}" :style="{height:isOpen ? height : '100%'}" class="uni-collapse-cell__content">
			<view :id="elId">
				<slot />
				<view class="load-more" v-if="isShowMoreBtn" @tap="loadMore">查看更多</view>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	export default {
		name: 'UniCollapseItem',
		props: {
			title: { // 列表标题
				type: String,
				default: ''
			},
			image:{ //列表图片
				type: String,
				default: ''
			},
			name: { // 唯一标识符
				type: [Number, String],
				default: 0
			},
			disabled: { // 是否禁用
				type: Boolean,
				default: false
			},
			showAnimation: { // 是否显示动画
				type: Boolean,
				default: false
			},
			open: { // 是否展开
				type: Boolean,
				default: false
			},
			isShowMoreBtn: {
				type: Boolean,
				default: false
			},
			thumb: { // 缩略图
				type: String,
				default: ''
			}
		},
		data() {
			/**
			 * TODO 兼容新旧编译器
			 * 新编译器（自定义组件模式）下必须使用固定数值，否则部分平台下会获取不到节点。
			 * 随机数值是在旧编译器下使用的，旧编译器模式已经不推荐使用，后续直接废掉随机数值的写法。
			 */
			const elId = this.__callback_hook ? 'uni_collapse_item' : `Uni_${Math.ceil(Math.random() * 10e5).toString(36)}`
			return {
				isOpen: false,
				height: 'auto',
				elId: elId
			}
		},
		watch: {
			open(val) {
				this.isOpen = val
			}
		},
		inject: ['collapse'],
		created() {
			this.isOpen = this.open
			this.nameSync = this.name ? this.name : this.collapse.childrens.length
			this.collapse.childrens.push(this)
			if (this.collapse.accordion) {
				if (this.isOpen) {
					let lastEl = this.collapse.childrens[this.collapse.childrens.length - 2]
					if (lastEl) {
						this.collapse.childrens[this.collapse.childrens.length - 2].isOpen = false
					}
				}
			}
		},
		// #ifdef H5
		mounted() {
			this.getSize()
		},
		// #endif
		// #ifndef H5
		onReady() {
			this.getSize()
		},
		// #endif
		methods: {
			loadMore(){
				this.$emit('loadMore');
			},
			getSize() {
        console.log(this.showAnimation);
				if (this.showAnimation) {
					uni.createSelectorQuery().in(this).select(`#${this.elId}`).boundingClientRect().exec((ret) => {
            console.log('ret', ret);
            if (ret[0].height > 0) {
             	this.height = ret[0].height + 'px';
            } else {
              this.height = '100%';
            }
					})
				}
			},
			onClick() {
				if (this.disabled) {
					return
				}
				if (this.collapse.accordion) {
					this.collapse.childrens.forEach(vm => {
						if (vm === this) {
							return
						}
						vm.isOpen = false
					})
				}
				this.isOpen = !this.isOpen;
        this.$emit('onClick', this.isOpen);
				this.collapse.onChange && this.collapse.onChange()
			}
		}
	}
</script>

<style>
	@charset "UTF-8";
	.uni-collapse-cell {
		position: relative
	}

	.uni-collapse-cell--open {
		background-color: #f1f1f1
	}

	.uni-collapse-cell--disabled {
		opacity: .3
	}

	.uni-collapse-cell--animation {
		transition: all .3s;
		overflow: hidden;
	}
	.uni-collapse-cell__title-arrow.uni-active {
		transform: rotate(90deg)
	}

</style>