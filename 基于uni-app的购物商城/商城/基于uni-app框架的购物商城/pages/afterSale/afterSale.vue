<template>
	<view>
		<divider-en />
		<card-en headTitle="申请售后的商品" >
			<view class="px-2">
				<block v-for="(item,index) in orderDetail.orderItem" :key="index">
					<orderlistitem-en :item="item" :index="index"></orderlistitem-en>
				</block>
			</view>
		</card-en>
		<divider-en />
		<card-en headTitle="服务类型">
			<radiobutton-en :label="label1" 
			:selected.sync='label1.selected'
			></radiobutton-en>
		</card-en>
		<divider-en />
		<card-en headTitle="问题描述" >
			<view class="position-relative p-2">
				<textarea placeholder="很抱歉让您有不好的体验,哪里不好吃跟我们说说吧,我们将会快速处理您的申请〒▽〒" 
				:maxlength="200" style="width: 100%;height: 400rpx;box-sizing: border-box;" class="border rounded p-2"
				v-model="content"/>
				<view class="position-absolute p-2" style="right: 5rpx; bottom: 5rpx;"
				:class="content.length >= 200 ? 'text-danger' : 'text-light-muted'">
					{{content.length}}/200
				</view>
			</view>
		</card-en>
				
		<view class="p-3">
			<view class="rounded mian-bg-color text-white text-center font-md py-2"
			hover-class="main-bg-hover-color" @click="submit">
				提交
			</view>
		</view>
	</view>
</template>

<script>
	import cardEn from "@/components/common/card-en.vue"
	import radiobuttonEn from "@/components/common/radiobutton-en.vue"
	import orderlistitemEn from "@/components/order/orderlistitem-en.vue"
	import {mapState} from "vuex"
	export default {
		components:{
			cardEn,
			radiobuttonEn,
			orderlistitemEn
		},
		data() {
			return {
				label1:{
					selected:0,
					list:[
						{name:"退款"},
					]
				},
				content:"",
				orderId:0,
				orderDetail:{}
			}
		},
		onLoad(e) {
			this.orderId = e.id
			this.$H.post("/getOrderDetail",{order_id:e.id}).then(res =>{
					this.orderDetail = res
				}).catch(()=>{ 
					console.log('初始化订单详情时出错')
				}) 
		},
		methods:{
			submit(){
				if(!this.content){
					uni.showToast({
						title: '请填写退款原因( ╯□╰ )',
						icon:'none'
					});
					return
				}
				uni.showModal({
					content:'确认提交退款申请？',
					success: (res) => {
						if(res.confirm){
							uni.showLoading({
								title: '提交中=￣ω￣=',
								mask: true
							});
							this.$H.post("/submitOrderRefund",{order_id:this.orderId,user_id:this.user_id,content:this.content}).then(res =>{
									uni.hideLoading()
									uni.showToast({
										title:"申请已提交",
									})
									setTimeout(()=>{
										uni.navigateBack({
											delta:1
										})
									},1000)
								}).catch(()=>{ 
									console.log('提交退款申请时出错')
								}) 
						}
					},

				});
			}
		},
		computed:{
			...mapState({
				'user_id':state=>state.user.user_id
			})
		}
	}
</script>

<style>

</style>
