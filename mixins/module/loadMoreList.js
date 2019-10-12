// 上拉加载更多列表
import utils from '../../utils/utils.js';


export default {
	data() {
		return {
			// 当前页码
			currentPage: 1,
			// 总页码
			pages: 0,
			loadingType: 0,
			list: [],
			// 列表请求方法
			reqFn: null,
			// 请求中存放列表的字段
			reqValue: 'list',
			// 请求或搜索存放请求参数
			params: {},
			// 请求成功回调函数
			callback: null,
			noData:false
		}
	},
	methods: {
		/**
		 * 请求列表方法
		 * @param page 页码
		 * @param callback 回调函数
		 * **/
		getList(page = 1, callback) {
			if (!this.reqFn) {
				console.error('请传入请求函数')
				this.loadingType = 2
				return false
			}
			const getFn = this.reqFn
			this.loadingType = 0
			getFn({
				pageNumKey: page,
				...this.params
			}).then(res => {
				if(!res.data.list.length){
					this.noData=true;
				}else{
					this.noData=false;
				}
				this.pages = res.data.pages;
				// 分页判断
				if (this.pages > 1) {
					if (this.currentPage <= this.pages) {
						this.loadingType = 1
						this.list = [ ...this.list,...res.data[this.reqValue]]
					}
				} else {
					this.list = res.data[this.reqValue]
					this.loadingType = 2
				}
				(this.callback && this.callback(this.list)) || (callback && callback())
			}).catch(err => {})
		}
	},
	// 下拉刷新
	onPullDownRefresh() {
		this.list = []
		this.getList(1, () => {
			uni.stopPullDownRefresh()
		})
	},
	//上拉加载更多
	onReachBottom() {
		if (this.currentPage < this.pages) {
			this.currentPage++
			this.getList(this.currentPage)
		} else {
			this.loadingType = 2
		}
	},
}
