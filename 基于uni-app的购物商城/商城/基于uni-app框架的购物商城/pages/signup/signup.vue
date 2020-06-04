<template>
	<view>
		<uni-status-bar />
		<view class="d-flex a-center j-sb px-3 py-2 text-light-muted">
			<view class="font-md" @click="backup">返回</view>
		</view>
		<text class="d-flex j-center font-big animated fadeInRight fast" style="color: #79905A;">——注册——</text>
		<text class="d-flex j-center font-lg animated fadeInRight fast" style="color: #79905A;">开启新天地</text>
		<view class="p-5">
			<input type="text" class="border mb-4 uni-input rounded animated fadeInRight fast" style="border-color: #79905A;"
			placeholder="请输入登录账号" @focus="focus('account_name')" @blur="blur('account_name')"
			:style="focusClass.account_name ? 'border-color:#2F4F4F;':''"
			v-model="account_name"/>
			
			<input type="text" class="border mb-4 uni-input rounded animated fadeInRight fast" style="border-color: #79905A;"
			placeholder="请输入登录密码" @focus="focus('password')" @blur="blur('password')"
			:style="focusClass.password ? 'border-color:#2F4F4F;':''"
			v-model="password"/>
			
			<input type="text" class="border mb-4 uni-input rounded animated fadeInRight fast" style="border-color: #79905A;"
			placeholder="请输入昵称" @focus="focus('name')" @blur="blur('name')"
			:style="focusClass.name ? 'border-color:#2F4F4F;':''"
			v-model="name"/>
			
			<input type="text" class="border mb-5 uni-input rounded animated fadeInRight fast" style="border-color: #79905A;"
			placeholder="请输入手机号码" @focus="focus('phone')" @blur="blur('phone')"
			:style="focusClass.phone ? 'border-color:#2F4F4F;':''"
			v-model="phone"/>
			
 			<view class="py-2 w-100 d-flex a-center j-center text-white rounded font-md animated fadeInRight fast"
			hover-class="main-bg-hover-color"
			style="background:#79905A;"
			@click="submit">确认注册</view>

		</view>
	</view>
</template>

<script>
	import uniStatusBar from "@/components/uni-ui/uni-status-bar/uni-status-bar.vue"
	export default {
		components:{
			uniStatusBar
		},
		data() {
			return {
				account_name:"",
				password:"",
				name:"",
				phone:"",
				focusClass:{
					account_name:false,
					password:false,
					name:false,
					phone:false
				},
				rules:{
						account_name:[
							{
								rule:/^[a-zA-Z]\w{5,17}$/,
								msg:"登录账号不符合规则(以字母开头，长度在6-18之间，只能包含字母、数字、下划线)( ╯□╰ )"
							}
						],
						password:[
							{
								rule:/^[0-9]{6,20}$/,
								msg:"密码不符合规则(长度为6-20的数字)( ╯□╰ )"
							}
						],
						name:[
							{
								rule:/^[\u4E00-\u9FA5A-Za-z0-9]{2,10}$/,
								msg:"用户名不符合规则(长度为2-10且不能出现特殊符号)( ╯□╰ )"
							}
						],
						phone:[
							{
								rule:/^1(3|4|5|7|8)\d{9}$/,
								msg:"手机不符合规则(格式出错)( ╯□╰ )"
							}
						]
					}
			}
		},
		methods: {
			backup(){
				uni.navigateBack({
					delta:1
				})
			},
			//点击输入框的特殊焦点样式
			focus(key){
				this.focusClass[key] = true
			},
			blur(key){
				this.focusClass[key] = false
			},
			submit(){
				if(!this.validate('account_name')){this.account_name = ""; return;}
				if(!this.validate('password')){this.password = ""; return;}
				if(!this.validate('name')){this.name = ""; return;}
				if(!this.validate('phone')){this.phone = ""; return;}
				uni.showLoading({
					title: '提交中=￣ω￣=',
					mask: true
				});
				this.$H.post("/signup",
				{
					account_name:this.account_name,
					password:this.password,
					name:this.name,
					phone:this.phone
				}).then(res =>{
						if(res != false){
							uni.hideLoading()
							uni.showToast({
								title:"注册成功,热烈欢迎,现在您可以用刚才注册的账号登录了(￣▽￣)",
								icon:'none',
								mask:true
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1100)
						}else{
							uni.showToast({
								title:"重复的登陆账号，请重新输入( ╯□╰ )",
								icon:"none"
							})
							this.account_name = ""
							return;
						}
					}).catch(()=>{ 
						console.log('注册时出错')
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
			}
		}
	}
</script>

<style>
	page{
		height: 100%;
		background: url('http://192.168.43.186:8080/store/image/signupbg.jpg');
		background-size: contain;
	}
</style>
