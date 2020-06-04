<template>
	<view>
		<uni-status-bar />
		<view class="d-flex a-center j-sb px-3 py-2 text-light-muted">
			<view class="font-md" @click="openSignup">注册</view>
		</view>
		
		<view class="d-flex j-center animated fadeInUp fast">
			<image src="../../static/images/detail/touxiang.jpg" mode="widthFix" style="width: 220rpx;"></image>
		</view>
		<view class="p-5">			
			<input type="text" class="border-bottom mb-4 uni-input animated fadeInUp fast"
			placeholder="请输入账号" @focus="focus('username')" @blur="blur('username')"
			:class="focusClass.username ? 'border-main' : ''"
			v-model="username"/>
			
			<input type="text"  class="border-bottom mb-4 uni-input animated fadeInUp fast"
			placeholder="请输入密码" @focus="focus('password')" @blur="blur('password')"
			:class="focusClass.password ? 'border-main' : ''"
			v-model="password">
			
			<view class="py-2 w-100 d-flex a-center j-center mian-bg-color text-white rounded font-md mb-4 animated fadeInUp fast"
			hover-class="main-bg-hover-color"
			@click="submit">登录</view>
			<label class="checkbox animated fadeInUp fast">
				<checkbox :checked="check" @click="check = !check"></checkbox>
			</label>
			<text class="text-light-muted font">已阅读并同意</text>
			<text class="main-text-color" style="text-decoration: underline;" @click="openUserAgreement()">用户协议</text>
		</view>
	</view>
</template>

<script>
	import uniStatusBar from "@/components/uni-ui/uni-status-bar/uni-status-bar.vue"
	import {mapMutations} from "vuex"
	export default {
		components:{
			uniStatusBar
		},
		data() {
			return {
				username:"",
				password:"",
				check:false,
				//验证规则
				rules:
				{
					username:[
						{
							rule:/^[a-zA-Z]\w{5,17}$/,
							msg:"登录账号不符合规则(以字母开头，长度在6-18之间，只能包含字母、数字、下划线)( ╯□╰ )"
						}
					],
					password:[
						{
							rule:/^[0-9]{6,20}$/,
							msg:"密码不符合规则(长度为6-20的所有数字)( ╯□╰ )"
						}
					]
				},
				focusClass:{
					username:false,
					password:false
				}
			}
		},
		methods: {
			...mapMutations(['login']),
			openSignup(){
				uni.navigateTo({
					url:'../signup/signup'
				})
			},
			//点击输入框的特殊焦点样式
			focus(key){
				this.focusClass[key] = true
			},
			blur(key){
				this.focusClass[key] = false
			},
			//验证表单
			submit(){
				if(!this.check){
					return uni.showToast({
						title:'您还尚未同意用户协议，无法登录( ╯□╰ )',
						icon:'none'
					})
				}
				if(!this.validate('username')) return;
				if(!this.validate('password')) return;
				this.$H.post("/login",{username:this.username,password:this.password}).then(res =>{
					if(res != false)
					{
						//登录数据存储
						this.login(res)
						uni.showToast({
							title:"登录成功，欢迎回来（*＾-＾*）",
							icon:'none',
							mask:true
						})
						setTimeout(()=>{
							uni.switchTab({
								url:'../index/index'
							})
						},1100)
					}
					else
					{
						uni.showToast({
							title:"用户名或密码错误( ╯□╰ )",
							icon:"none"
						})
						return;
					}
				}).catch(()=>{ 
					console.log('登录时出错')
				})
			},
			validate(key){
				var check = true
				this.rules[key].forEach((v)=>{
					if(!(v.rule).test(this[key])){
						uni.showToast({title: v.msg, icon:'none'});
						check = false
						return false
					}
				})
				return check
			},
			openUserAgreement(){
				uni.navigateTo({
					url: '../userAgreement/userAgreement',
				});
			}
			
		}
	}
</script>

<style>

</style>
