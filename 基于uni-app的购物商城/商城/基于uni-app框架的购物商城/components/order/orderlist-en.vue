<template>
	<view class="bg-white" @click.stop="openOrderDetail">
		<divider-en />
		<!-- 头部 -->
		<view class="d-flex a-center p-2 border-bottom border-light-secondary">
			<text class="text-light-muted">{{item.createTime}}</text>
			<text class="main-text-color ml-auto font-md">{{orderStatus}}</text>
		</view>
		<!-- 内容 -->
		<view class="px-2">
			<view class="border-bottom d-flex a-center py-2 border-light-secondary"
			v-for="(orderListItem,orderListIndex) in item.orderItem" :key="orderListIndex">
				<image :src="orderListItem.pic" mode="widthFix"
				style="width: 150rpx; height: 150rpx;" class="rounded mx-2 flex-shrink"></image>
				<view class="flex-1">
					<view class="d-flex a-center">
						<text class="font-md text-dark">{{orderListItem.title}}</text>
						<text class="font-md text-light-muted ml-auto">￥{{orderListItem.pprice}}</text>
					</view>
					<view class="d-flex a-center">
						<text class="font text-light-muted">{{orderListItem.attr}}</text>
						<text class="font text-light-muted ml-auto">x{{orderListItem.num}}</text>
					</view>		
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="d-flex a-center p-2">
			<text class="text-dark font-md ml-auto">共{{totalNum}}件商品，合计：￥{{item.totalPrice}}</text>
		</view>
		<view class=" d-flex j-end a-center px-2 pb-2">
			<template v-if="parseInt(item.isRefund) == 3">
				<view class="rounded border py-1 px-2 text-secondary mr-2" @click.stop="openAfterSale">重新申请退款</view>
			</template>
			<template v-else-if="parseInt(item.isRefund) == 2 || parseInt(item.isRefund) == 1">
			</template>
			<template v-else-if="parseInt(item.status) == 0">
				<view class="rounded border py-1 px-2 text-secondary mr-2" @click.stop="openAfterSale">申请退款</view>
			</template>
			<template v-else-if="parseInt(item.status) == 1">
				<view class="rounded border py-1 px-2 text-secondary mr-2" @click.stop="openExpress">查看物流</view>
				<view class="rounded border py-1 px-2 text-secondary mr-2" @click.stop="orderDone">确认收货</view>
			</template>
			<template v-else-if="parseInt(item.status) == 2">
				<view class="rounded border py-1 px-2 text-secondary mr-2" @click.stop="opencomment">去评价</view>
				<view class="rounded border py-1 px-2 text-secondary mr-2" @click.stop="openAfterSale">申请退款</view>
			</template>
			<template v-else-if="parseInt(item.status) == 3">
				<view class="rounded border py-1 px-2 text-secondary mr-2" @click.stop="openAfterSale">申请退款</view>
			</template>
		</view> 
	</view>
</template>

<script>
	export default{
		props:{
			item:Object,
			index:Number
		},
		methods:{
			//订单详情
			openOrderDetail(){
				uni.navigateTo({
					url: '../../pages/order-detail/order-detail?id='+this.item.id,
				});
			},
			//查看物流
			openExpress(){
				uni.navigateTo({
					url: '../../pages/express/express',
				});
			},
			//申请售后
			openAfterSale(){
				uni.navigateTo({
					url:"../../pages/afterSale/afterSale?id="+this.item.id
				})
			},
			//评价
			opencomment(){
				uni.navigateTo({
					url:"../../pages/order-comment/order-comment?id="+this.item.id
				})
			},
			//确定收货
			orderDone(){
				uni.showModal({
					content: '您确定收到货了吗？',
					success: (res) => {
						if(res.confirm){
							uni.showLoading({
								title: '确认收货中=￣ω￣=',
								mask: true
							});
							this.$H.post("/takeGoods",{order_id:this.item.id}).then(res =>{
									uni.hideLoading()
									uni.showToast({
										title:'确认收货成功,去评价吧',
										icon:'none'
									});
									this.$emit('update')
								}).catch(()=>{ 
									uni.hideLoading()
									console.log('确认收货时出错')
								}) 
						}
					},
				});
			}
		},
		computed:{
			//订单状态判断
			orderStatus(){
				if(!this.item){
					return ''
				}
				if(parseInt(this.item.isRefund) !== 0){
					switch(parseInt(this.item.isRefund)){
						case 1:
							return "退款中"
							break;
						case 2:
							return '已退款'
							break;
						case 3:
							return '退款失败'
							break;
					}
				}
				switch(parseInt(this.item.status)){
					case 0:
						return '待发货'
						break;
					case 1:
						return '待收货'
						break;
					case 2:
						return '待评价'
						break;
					case 3:
						return '已完成'
						break;
				}
			},
			totalNum(){
				let total = 0
				for(let i=0 ; i<this.item.orderItem.length; i++){
					total += parseInt(this.item.orderItem[i].num)
				}
				return total
			}
		}
	}
</script>

<style>
</style>
