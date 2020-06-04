<template>
	<view>
		<view class="p-5">
			<template v-if="type == 1">
				<input type="text" class="border-bottom mb-4 uni-input animated fadeInUp fast"
				:placeholder="userInfo.name" v-model="username"/>				
			</template>
			<template v-else-if="type == 2">
				<input type="text" class="border-bottom mb-4 uni-input animated fadeInUp fast"
				:placeholder="userInfo.sex == '' ? '在此填入您的性别' : userInfo.sex" v-model="sex"/>	
			</template>
			<template v-else-if="type == 3">
				<input type="text" class="border-bottom mb-4 uni-input animated fadeInUp fast"
				:placeholder="userInfo.birthday == '' ? '生日格式为:年-月-日,中间为短横杠' : userInfo.birthday" v-model="birthday"/>	
			</template>
			<template v-else-if="type == 4">
				<input type="text" class="border-bottom mb-4 uni-input animated fadeInUp fast"
				:placeholder="userInfo.email == '' ? '在此填入您的邮箱' : userInfo.email" v-model="email"/>				
			</template>
			<template v-else-if="type == 5">
				<input type="text" class="border-bottom mb-4 uni-input animated fadeInUp fast"
				:placeholder="userInfo.phone" v-model="phone"/>				
			</template>
			<template v-else-if="type == 6">
				<input type="text" class="border-bottom mb-4 uni-input animated fadeInUp fast"
				placeholder="请在此输入原密码" v-model="oldPassword"/>
				<input type="text" class="border-bottom mb-4 uni-input animated fadeInUp fast"
				placeholder="请在此输入新密码" v-model="newPassword"/>	
			</template>
			<view class="py-2 w-100 d-flex a-center j-center mian-bg-color text-white rounded font-md mb-4 animated fadeInUp fast"
			hover-class="main-bg-hover-color"
			@click="submit">确定</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex"
	export default {
		data() {
			return {
				type:"",
				username:"",
				sex:"",
				birthday:"",
				email:"",
				phone:"",
				oldPassword:"",
				newPassword:""
			}
		},
		methods: {
			submit(){
				if(this.type == 1){
					//用户名
					var reg = /^[\u4E00-\u9FA5A-Za-z0-9]{2,10}$/
					if(!reg.test(this.username)){
						uni.showToast({
							title: '用户名不符合规则(长度为2-10且不能出现特殊符号)( ╯□╰ )',
							icon:'none'
						});
						return
					}
					this.$H.post("/updateUserInfo",
					{
						id:this.userInfo.id,
						type:this.type,
						name:this.username,
					}).then(res =>{
							uni.showToast({
								title:'修改成功(￣▽￣)',
								icon:'none'
							})
							this.userInfo.name = this.username
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1100)
						}).catch(()=>{ 
							console.log('修改时出错')
					})				
				}else if(this.type == 2){
					//性别
					var reg = /^([男|女]){1}$/
					if(!reg.test(this.sex)){
						uni.showToast({
							title: '性别不符合规则(只能是“男”或者“女”)( ╯□╰ )',
							icon:'none'
						});
						return
					}
					this.$H.post("/updateUserInfo",
					{
						id:this.userInfo.id,
						type:this.type,
						sex:this.sex,
					}).then(res =>{
							uni.showToast({
								title:'修改成功(￣▽￣)',
								icon:'none'
							})
							this.userInfo.sex = this.sex
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1100)
						}).catch(()=>{ 
							console.log('修改时出错')
					})	
				}else if(this.type == 3){
					//生日
					var reg = /^(((?:19|20)\d\d)-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01]))$/
					if(!reg.test(this.birthday)){
						uni.showToast({
							title: '生日格式不符合规则(格式为:年-月-日)( ╯□╰ )',
							icon:'none'
						});
						return
					}
					this.$H.post("/updateUserInfo",
					{
						id:this.userInfo.id,
						type:this.type,
						birthday:this.birthday,
					}).then(res =>{
							uni.showToast({
								title:'修改成功(￣▽￣)',
								icon:'none'
							})
							this.userInfo.birthday = this.birthday
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1100)
						}).catch(()=>{ 
							console.log('修改时出错')
					})	
				}else if(this.type == 4){
					//邮箱
					var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
					if(!reg.test(this.email)){
						uni.showToast({
							title: '邮箱不符合规则,请检查( ╯□╰ )',
							icon:'none'
						});
						return
					}
					this.$H.post("/updateUserInfo",
					{
						id:this.userInfo.id,
						type:this.type,
						email:this.email,
					}).then(res =>{
							uni.showToast({
								title:'修改成功(￣▽￣)',
								icon:'none'
							})
							this.userInfo.email = this.email
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1100)
						}).catch(()=>{ 
							console.log('修改时出错')
					})	
				}else if(this.type == 5){
					//手机号码
					var reg = /^1(3|4|5|7|8)\d{9}$/
					if(!reg.test(this.phone)){
						uni.showToast({
							title: '手机号码输入有误,请检查( ╯□╰ )',
							icon:'none'
						});
						return
					}
					this.$H.post("/updateUserInfo",
					{
						id:this.userInfo.id,
						type:this.type,
						phone:this.phone,
					}).then(res =>{
							uni.showToast({
								title:'修改成功(￣▽￣)',
								icon:'none'
							})
							this.userInfo.phone = this.phone
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1100)
						}).catch(()=>{ 
							console.log('修改时出错')
					})	
				}else if(this.type == 6){
					//密码
					var reg = /^[0-9]{6,20}$/
					if(this.oldPassword != this.userInfo.account_password){
						uni.showToast({
							title: '原密码输入有误,请检查( ╯□╰ )',
							icon:'none'
						});
						this.oldPassword = ""
						return
					}else if(!reg.test(this.newPassword)){
						uni.showToast({
							title:'新密码不符合规则(长度为6-20的数字)( ╯□╰ )',
							icon:'none'
						});
						return
					}
					this.$H.post("/updateUserInfo",
					{
						id:this.userInfo.id,
						type:this.type,
						newPassword:this.newPassword,
					}).then(res =>{
							uni.showToast({
								title:'修改成功(￣▽￣)',
								icon:'none'
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1100)
						}).catch(()=>{ 
							console.log('修改时出错')
					})	
				}
			}
		},
		onLoad(e) {
			this.type = e.type
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
