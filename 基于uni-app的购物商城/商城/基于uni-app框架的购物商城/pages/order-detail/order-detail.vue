<template>
	<view>
		<view class="mian-bg-color text-white p-4 d-flex a-end j-sb" style="height:300rpx;">
			<template v-if="orderDetail.isRefund == 1">
				<view class="mb-3">
					<view class="font-lg">退款中</view>
					<view class="font">我们正在处理您的退款申请:)</view>
				</view>
				<view class="mb-3 iconfont icon-yiwen line-h" style="font-size: 100rpx;"></view>
			</template>
			<template v-else-if="orderDetail.isRefund == 2">
				<view class="mb-3">
					<view class="font-lg">已退款</view>
					<view class="font">很抱歉此次购物没有让您满意:(</view>
				</view>
				<view class="mb-3 iconfont icon-finish line-h" style="font-size: 100rpx;"></view>
			</template>
			<template v-else-if="orderDetail.isRefund == 3">
				<view class="mb-3">
					<view class="font-lg">退款失败</view>
					<view class="font">竟然失败了Σ(っ °Д °;)っ</view>
				</view>
				<view class="mb-3 iconfont icon-gantan1 line-h" style="font-size: 100rpx;"></view>
			</template>
			<template v-else-if="orderDetail.status == 0">
				<view class="mb-3">
					<view class="font-lg">待发货</view>
					<view class="font">您的商品正在打包中 ε=ε=ε=(~￣▽￣)~</view>
				</view>
				<view class="mb-3 iconfont icon-fuzhi line-h" style="font-size: 100rpx;"></view>
			</template>
			<template v-else-if="orderDetail.status == 1">
				<view class="mb-3">
					<view class="font-lg">待收货</view>
					<view class="font">您的商品在路上啦 ε=ε=ε=(~￣▽￣)~</view>
				</view>
				<view class="mb-3 iconfont icon-daishouhuo line-h" style="font-size: 100rpx;"></view>
			</template>
			<template v-else-if="orderDetail.status == 2">
				<view class="mb-3">
					<view class="font-lg">待评价</view>
					<view class="font">不要吝啬您的好评哦 ε=ε=ε=(~￣▽￣)~</view>
				</view>
				<view class="mb-3 iconfont icon-dianzan line-h" style="font-size: 100rpx;"></view>
			</template>
			<template v-else>
				<view class="mb-3">
					<view class="font-lg">已完成</view>
					<view class="font">感谢您的购物 ε=ε=ε=(~￣▽￣)~</view>
				</view>
				<view class="mb-3 iconfont icon-finish line-h" style="font-size: 100rpx;"></view>
			</template>
		</view>
		<view class="p-3 bg-white">
			<view class="text-light-muted font-md">
				<text class="font-lg text-dark mr-3">{{name}}</text>
				{{phone}}
			</view>
			<view class="text-light-muted font-md">{{address}}</view>
		</view>
		
		<divider-en />
		
		<view class="px-2">
			<block v-for="(item,index) in orderDetail.orderItem" :key="index">
				<orderlistitem-en :item="item" :index="index"></orderlistitem-en>
			</block>
		</view>
			
		<divider-en />
		
		<uni-list-item>
			<text class="font-md text-light-muted">商品总价</text>
			<view slot="right" class="font-md text-light-muted">￥{{beforeTotalPrice}}</view>
		</uni-list-item>
		<uni-list-item :showArrowIcon="false">
			<text class="font-md text-light-muted">快递</text>
			<template v-if="isExpress">
				<view slot="rightContent" class="font-md text-light-muted">包邮</view>
			</template>
			<template v-else>
				<view slot="rightContent" class="font-md text-light-muted">￥10.00</view>
			</template>
		</uni-list-item>
		<uni-list-item>
			<text class="font-md main-text-color">实际付款</text>
			<view slot="right" class="font-md text-light-muted">
				<price-en>{{orderDetail.totalPrice}}</price-en>
			</view>
		</uni-list-item>
		
		<divider-en />
		
		<uni-list-item>
			<text class="font-md ">订单编号</text>
			<view slot="right" class="font-md ">{{orderId}}</view>
		</uni-list-item>
		<uni-list-item>
			<text class="font-md ">创建时间</text>
			<view slot="right" class="font-md ">{{orderDetail.createTime}}</view>
		</uni-list-item>
		<uni-list-item>
			<text class="font-md ">票据类型</text>
			<view slot="right" class="font-md ">电子票据</view>
		</uni-list-item>
	</view>
</template>

<script>
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	import priceEn from "@/components/common/price-en.vue"
	import orderlistitemEn from "@/components/order/orderlistitem-en.vue"
	export default {
		components:{
			orderlistitemEn,
			uniListItem,
			priceEn
		},
		data() {
			return {
				orderDetail:{},
				orderId:0,
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
		computed:{
			//对地址的处理
			name(){
				let name = this.orderDetail.address.split('-');
				return name[0]
			},
			phone(){
				let phone = this.orderDetail.address.split('-');
				return phone[1]
			},
			address(){
				let address = this.orderDetail.address.split('-');
				return address[2]+address[3]+address[4]+" "+address[5]
			},
			//商品总价
			beforeTotalPrice(){
				let total = 0
				for(let i = 0;i<this.orderDetail.orderItem.length; i++){
					total += (parseFloat(this.orderDetail.orderItem[i].pprice) * parseInt(this.orderDetail.orderItem[i].num))
				}
				return total.toFixed(2)
			},
			isExpress(){
				if((parseFloat(this.orderDetail.totalPrice) - 10) > 100){
					return true
				}else{
					return false
				}
			}
		}
	}
</script>

<style>

</style>
