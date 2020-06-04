<template>
	<view>
		<view class="position-relative p-2 mt-5">
			<textarea placeholder="期待您的意见和建议O(∩_∩)O" 
			:maxlength="200" style="width: 100%;height: 400rpx;box-sizing: border-box;" class="border rounded p-2"
			v-model="content"/>
			<view class="position-absolute p-2" style="right: 5rpx; bottom: 5rpx;"
			:class="content.length >= 200 ? 'text-danger' : 'text-light-muted'">
				{{content.length}}/200
			</view>
		</view>	
		<view class="p-3">
			<view class="rounded mian-bg-color text-white text-center font-md py-2"
			hover-class="main-bg-hover-color" @click="submit">
				提交
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex"
	export default {
		data() {
			return {
				content:""
			}
		},
		methods: {
			submit(){
				if(!this.content){
					uni.showToast({
						title: '反馈意见不能为空( ╯□╰ )',
						icon:'none'
					});
					return
				}
				uni.showModal({
					content:'确认提交吗?',
					success:(res)=>{
						if(res.confirm){
							uni.showLoading({
								title: '提交中=￣ω￣=',
								mask: true
							});
							this.$H.post("/addUserAdvise",{id:this.userInfo.id,content:this.content}).then(res =>{
									uni.hideLoading()
									uni.showToast({
										title:"意见已提交，谢谢",
										icon:'none'
									})
									setTimeout(()=>{
										uni.navigateBack({
											delta:1
										})
									},1000)
								}).catch(()=>{ 
									console.log('提交反馈意见时出错')
								}) 
						}
					}
				});
			}
		},
		computed:{
			...mapState({
				'userInfo':state=>state.user.userInfo
			})
		}
	}
</script>

<style>

</style>
