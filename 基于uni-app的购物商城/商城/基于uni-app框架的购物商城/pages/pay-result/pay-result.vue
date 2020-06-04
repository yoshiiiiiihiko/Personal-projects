<template>
	<view>
		<view class="d-flex a-center flex-column j-center py-5 my-3">
			<image src="../../static/images/order/payThankYou.png" mode="widthFix" style="width: 550rpx;"></image>
			<text class="font-lg mt-3 main-text-color"> 谢谢！</text>
			<text class="font-md mt-3 text-light-muted">我们将很快把商品配送到您的手上</text>
		</view>
		<view class="px-5">
			<view class="mian-bg-color text-white rounded font-md w-100 py-2 mt-3 text-center"
			hover-class="main-bg-hover-color"
			@click="openOrder">
				查看订单
			</view>
			<view class="border rounded font-md w-100 py-2 mt-3 text-center"
			hover-class="bg-light"
			@click="openIndex">
				返回首页
			</view>
		</view>		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			openIndex(){
				uni.switchTab({
					url:'../index/index'
				});
			},
			openOrder(){
				uni.navigateTo({
					url:'../order/order'
				})
			}
		},
		// onBackPress() {
		// 	uni.switchTab({
		// 		url:'../index/index'
		// });
		// }
	}
</script>

<style>

</style>
