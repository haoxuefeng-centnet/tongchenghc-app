<!-- 新建账号 -->
<template>
	<view class="addAccount">
		<view class="title">基本信息</view>
		<view class="boos-lise">
			<view class="boos-title">姓名</view>
			<input @input="nameNunber" type="text" placeholder="请输入姓名" />
			<text class="iconfont boos-icons" ></text>
		</view>
		<view class="boos-lise">
			<view class="boos-title">手机号</view>
			<input @input="phoneNunber" maxlength="11" type="number" placeholder="请输入手机号码" />
			<text class="iconfont boos-icons" ></text>
		</view>
		<view class="base">
				<button class="base-bottow" type="primary" @tap="save">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
import utils from '../../../../utils/utils.js'
import { addaccount} from  "../../../../api/account.js"
export default{
	data(){
		return{
			name:'',
			phone:''
		}
	},
	methods:{
		nameNunber(e){
			this.name = e.detail.value
		},
		phoneNunber(e){
			this.phone = e.detail.value
		},
		save(e){
			if(this.name == "" || this.phone == ''){
				utils.showTextToast('请填写信息')
				return
			} else if( !/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone)){
				utils.showTextToast('手机号码有误')
			} else{
				addaccount({name:this.name , phone:this.phone}).then( res=>{
					if( res.code == 200 ){
						utils.showTextToast('保存成功'),
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							})
						}, 1000);
					} else {
						utils.showTextToast(res.mag)
					}
				})
			}
			
		}
	}
}
</script>

<style scoped lang="less">
.addAccount {
	.title {
		width: 100%;
		height: 90upx;
		text-align: center;
		line-height: 90upx;
		background: rgba(242, 242, 242, 1);
		font-size: 30upx;
		color: rgba(37, 37, 37, 1);
	}
}
.base{
	position: fixed;
	bottom:20upx;
}
</style>
