<template>
	<view>
		<view style="height:100rpx;"></view>
		<view class="d-flex a-stretch bg-white position-fixed left-0 bottom-0 right-0 border-top border-light-secondary" 
		style="height:100rpx;z-index: 100;border-width:thin;">
			<view class="flex-1 d-flex flex-column a-center j-center line-h-md" hover-class="bg-light-secondary">
				<view class="iconfont icon-gouwuche text-muted line-h-md"
				@tap.stop="ToCart"></view>
				购物车
			</view>
			<template v-if="isStock">
				<view class="d-flex j-center a-center font-md mian-bg-color text-white" hover-class="main-bg-hover-color" style="flex: 2.5;"
				@tap="$emit('show')">
					加入购物车
				</view>
			</template>
			<template v-else>
				<view class="d-flex j-center a-center font-md bg-danger text-white" hover-class="main-bg-hover-color" style="flex: 2.5;">
					暂时缺货
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			stock:Number
		},
		methods:{
			ToCart(){
				uni.switchTab({
					url:"../../pages/cart/cart"
				})
			}
		},
		computed:{
			isStock(){
				if(this.stock <= 0){
					return false
				}else{
					return true
				}
			}
		}
	}
</script>

<style>
</style>
