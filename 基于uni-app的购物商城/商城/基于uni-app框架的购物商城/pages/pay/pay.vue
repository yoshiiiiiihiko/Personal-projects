<template>
	<view>
		<view class="d-flex flex-column a-center j-center" style="margin-top: 300rpx; margin-bottom: 200rpx;">
			<text class="text-light-muted font-md">支付金额</text>
			<price-en>{{finalPrice}}</price-en>
		</view>
		<view class="px-5">
			<view class="mian-bg-color text-white rounded font-md w-100 py-2 mt-3 text-center"
			hover-class="main-bg-hover-color"
			@click="openPayResult">
				确认支付
			</view>
		</view>
	</view>
</template>

<script>
	import priceEn from "@/components/common/price-en.vue"
	import {mapGetters,mapState,mapMutations} from"vuex"
	export default {
		components:{
			priceEn
		},
		data() {
			return {
				goods_id:[],
				addressDetail:[]
			}
		},
		onLoad(e) {
			this.goods_id = JSON.parse(e.selectedList)
			this.addressDetail = JSON.parse(e.addressDetail)
		},
		computed:{
			...mapGetters(['finalPrice']),
			...mapState({
				list:state=>state.cart.list,
				user_id:state=>state.user.user_id,
				
			}),
			goodsList(){
				//通过传过来的选中的商品id来查询整个保存在vuex商品的信息
				return this.goods_id.map(id=>{
				    return this.list.find(v=>v.id === id)
				})
			}
		},
		methods: {
			...mapMutations(['clearCart']),
			openPayResult(){
				uni.showModal({
					content: '确认支付吗？',
					success: (res) => {
						if(res.confirm){
							uni.showLoading({
								title: '支付中=￣ω￣=',
								mask: true
							});
							this.$H.post("/submitOrder",{
									user_id:this.user_id,
									user_address:this.addressDetail,
									total_price:this.finalPrice,
									goodsList:JSON.stringify(this.goodsList)
								}).then(res =>{
									uni.hideLoading()
									uni.redirectTo({
										url:'../pay-result/pay-result'
									})
									this.clearCart()
								}).catch(()=>{ 
									console.log('支付时出错')
								}) 
						}
						console.log(JSON.stringify(this.goodsList));
					},
				});
			}
		}
		
	}
</script>

<style>

</style>
