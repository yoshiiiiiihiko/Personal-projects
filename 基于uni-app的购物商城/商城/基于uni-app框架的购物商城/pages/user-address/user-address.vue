<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<uni-list-item title="新增收货地址+" @click="openEditUserAddressWX()"></uni-list-item>
		<!-- #endif -->
		<template v-if="list.length">
			<block v-for="(item,index) in list" :key="index">
				<uni-swipe-action :options="options" @click="bindClick($event,index)">
					<uni-list-item @click="choose(item)">
						<view class="text-secondary">
							<view class="d-flex a-center">
								<text class="main-text-color">{{item.name}}</text>
								<text class="px-1">{{item.phone}}</text>
								<text class="main-text-color"
								v-if="item.isDefault==1">[默认]</text>
							</view>
							<view>
								{{item.province}} {{item.city}} {{item.district}}
							</view>
							<view>
								{{item.address}}
							</view>
						</view>
					</uni-list-item>
				</uni-swipe-action>
			</block>
		</template>
		<!-- #ifdef APP-PLUS -->
		<template v-else>
			<view class="position-absolute d-flex flex-column a-center j-center top-0 left-0 right-0 bottom-0">
				<view class="mt-1" style="color: #B2B2B2;">你一个收货地址都没有⊙﹏⊙∥</view>
				<view class="mt-1" style="color: #B2B2B2;">要不点击右上角加号创建一个？</view>
			</view>
		</template>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<template v-else>
			<view class="d-flex flex-column a-center j-center" style="margin-top: 150px;">
				<view class="mt-1" style="color: #B2B2B2;">你一个收货地址都没有⊙﹏⊙∥</view>
				<view class="mt-1" style="color: #B2B2B2;">要不点击上方新建收货地址创建一个？</view>
			</view>
		</template>
		<!-- #endif -->
	</view>
</template>

<script>
	import uniSwipeAction from "@/components/uni-ui/uni-swipe-action/uni-swipe-action.vue"
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	import {mapState,mapMutations} from "vuex"
	export default {
		components:{
			uniListItem,
			uniSwipeAction
		},
		data() {
			return {
				isChoose:false,
				options:[
					{
						text:'修改',
						style:{
							backgroundColor:'#79905A'
						}
					},
					{
						text:'删除',
						style:{
							backgroundColor:'#dd524d'
						}
					}
				]
			}
		},
		onNavigationBarButtonTap(e){
			if(e.index === 0)
			{
				uni.navigateTo({
					url:"../user-address-edit/user-address-edit"
				})
			}
		},
		onShow() {
			this.__init()
		},
		onLoad(e){
			if(e.type === 'choose'){
				this.isChoose = true
			}
		},
		methods: {
			...mapMutations(['deleteAddress','initAddress']),
			bindClick(value,i){
				switch(value.index){
					case 0://修改
					let obj = JSON.stringify({
						index:i,
						item:this.list[i]
					})
					setTimeout(()=>{
						uni.navigateTo({
							url: '../user-address-edit/user-address-edit?data='+obj,
						});
					},50);
						break;
					case 1://删除
					uni.showModal({
						content: '是否要删除该收货地址？（注意：这个操作不能恢复的哦。）',
						success: (res) => {
							if (res.confirm) {
								this.$H.post("/delUserAddress",{id:this.list[i].id,user_id:this.user_id}).then(res =>{
									this.deleteAddress(i)
									uni.showToast({
										title: '删除成功'
									});
									this.__init();
								}).catch(()=>{ 
									console.log('删除时出错')
								})
								
							} 
						}
					});
					break;
				}
			},
			//选择收货地址（应用于在结算时选择）
			choose(item){
				if(this.isChoose)
				{
					//修改
					uni.$emit('chooseAddress',item)
					//返回上一页
					uni.navigateBack({
						delta:1
					});
				}
			},
			//初始化收货地址
			__init(){
				this.$H.post("/getUserAddress",{user_id:this.user_id}).then(res =>{
					this.initAddress(res)
				}).catch(()=>{ 
					console.log('初始化收货地址时出错')
				}) 
			},
			openEditUserAddressWX(){
				console.log("!");
				uni.navigateTo({
					url: '../user-address-edit/user-address-edit',
				});
			}
		},
		computed:{
			...mapState({
				'list':state=>state.address.list,
				'user_id':state=>state.user.user_id
			})
		}
	}
</script>

<style>

</style>
