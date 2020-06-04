<template>
	<view>
		<view class="p-2 border-bottom d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">收货人：</view>
			<input class="px-1 font-md flex-1" type="text" v-model="form.name"/>
		</view>
		<view class="p-2  d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">手机号码：</view>
			<input class="px-1 font-md flex-1" type="text" v-model="form.phone"/>
		</view>
		
		<divider-en />
		
		<view class="p-2 border-bottom d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">所在地区：</view>
			<input class="px-1 font-md flex-1" type="text" disabled 
			@click="showMulLinkageThreePicker" placeholder="请选择所在地区"
			 :value="path"/>
			
			<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="pickerValue" @onConfirm="onConfirm"></mpvue-city-picker>
		</view>
		<view class="p-2  d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">详细地址：</view>
			<input class="px-1 font-md flex-1" type="text" v-model="form.address"/>
		</view>
		
		<divider-en />
		
		<view class="p-2  d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">设为默认地址：</view>
			<switch class="ml-auto" color="#79905A" :checked="form.isDefault" 
			@change="form.isDefault = $event.detail.value ? 1 : 0"/>
		</view>
		
		<view class="p-3">
			<view class="text-center w-100 mian-bg-color text-white font-md rounded py-2"
			hover-class="main-bg-hover-color" @click="submit">
				保存
			</view>
		</view>
	</view>
</template>

<script>
	import mpvueCityPicker from "@/components/uni-ui/mpvue-citypicker/mpvueCityPicker.vue"
	import {mapMutations,mapActions,mapState} from "vuex"
	export default {
		components:{
			mpvueCityPicker
		},
		data() {
			return {
				index:-1,
				isedit:false,//是否创建，区分是创建还是修改的字段，true是修改，false是创建
				themeColor:'#79905A',
				pickerValue:[0,0,1],
				check:false,
				isDoPath:false,
				form:{
					address:'',
					name:"",
					phone:"",
					province:"",
					city:"",
					district:"",
					isDefault:0
				},
				rules:
				{
					name:[
						{
						rule:/^.{2,10}$/,
						msg:"姓名不符合规则(长度在1-10之间)( ╯□╰ )"
						}
					],
					phone:[
						{
							rule:/^1(3|4|5|7|8)\d{9}$/,
							msg:"请输入11位的正确手机号码( ╯□╰ )"
						}
					],
					address:[
						{
							rule:/^.{2,68}$/,
							msg:"详细地址不符合规则(长度为1-68的所有字符)( ╯□╰ )"
						}
					]
				},
			}
		},
		onLoad(e) {
			if(e.data){
				let result = JSON.parse(e.data)
				this.index = result.index
				this.form = result.item
				this.isedit = true
				this.isDoPath = true
				if(this.form.isDefault == 1){
					this.form.isDefault = true
				}else{
					this.form.isDefault = false
				}
				uni.setNavigationBarTitle({
					title:"修改收货地址"
				})
			}
		},
		//修改返回事件
		onBackPress() {
			if(this.$refs.mpvueCityPicker.showPicker){
				this.$refs.mpvueCityPicker.pickerCancel();
				return true;
			}
		},
		//页面卸载关闭组件
		onUnload() {
			if(this.$refs.mpvueCityPicker.showPicker){
				this.$refs.mpvueCityPicker.pickerCancel();
			}
		},
		computed:{
			...mapState({
				'user_id':state=>state.user.user_id
			}),
			path(){
				if(this.form.province)
				{
					return this.form.province+'-'+this.form.city+'-'+this.form.district
				}
			}
		},
		methods: {
			...mapActions(['updateAddressAction','createAddressAction']),
			//三级联动确定时
			onConfirm(e){
				//this.form.address = e.label
				let arr = e.label.split('-')
				this.form.province = arr[0]
				this.form.city = arr[1]
				this.form.district = arr[2]
				this.pickerValue = e.value
				this.isDoPath = true
			},
			//显示组件
			showMulLinkageThreePicker(){
				this.$refs.mpvueCityPicker.show()
			},
			//保存按钮
			submit(){
				//验证表单
				if(!this.validate('name')) return;
				if(!this.validate('phone')) return;
				if(!this.isDoPath){
					uni.showToast({
						title: '请选择地区( ╯□╰ )',
						icon:'none'
					});
					return;
				}
				if(!this.validate('address')) return;				
				//修改收货地址
				if(this.isedit){
					if(this.form.isDefault == true){
						this.form.isDefault = 1
					}else{
						this.form.isDefault = 0
					}
					this.$H.post("/updateUserAddress",{
						id:this.form.id,
						user_id:this.user_id,
						name:this.form.name,
						phone:this.form.phone,
						province:this.form.province,
						city:this.form.city,
						district:this.form.district,
						address:this.form.address,
						isDefault:this.form.isDefault
						}).then(res =>{
						this.updateAddressAction({
							index:this.index,
							item:this.form
						})
						uni.showToast({
							title:'修改成功'
						});
						uni.navigateBack({
							delta:1
						});
					}).catch(()=>{ 
						console.log('向数据库添加地址时出错')
					}) 	
					return;			
				}
				//创建新收货地址
				this.$H.post("/addUserAddress",{
					user_id:this.user_id,
					name:this.form.name,
					phone:this.form.phone,
					province:this.form.province,
					city:this.form.city,
					district:this.form.district,
					address:this.form.address,
					isDefault:this.form.isDefault
					}).then(res =>{
					this.createAddressAction(this.form)
					uni.showToast({
						title:'创建成功',
					});
					uni.navigateBack({
						delta:1
					});
				}).catch(()=>{ 
					console.log('向数据库添加地址时出错')
				}) 		
			},
			validate(key){
				var check = true
				this.rules[key].forEach((v)=>{
					if(!(v.rule).test(this.form[key])){
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
	background: #EEEEEE;
}
</style>
