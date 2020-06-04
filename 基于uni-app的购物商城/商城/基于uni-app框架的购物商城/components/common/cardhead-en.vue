<template>
	<view>
		<view class="text-center main-text-color font-md font-weight mt-5">
			为你推荐
		</view>
		<view class="position-relative d-flex a-center j-center mb-5 pt-3 text-secondary">
			<view style="z-index: 2;" class="px-2 position-absolute" :style="bg">好物不容错过</view>
			<view class="position-absolute" style="background-color: #DDDDDD; height: 1rpx;left: 0;right:0"></view>
		</view>
	</view>
	
</template>

<script>
	export default{
		props:{
			bg:{
				type:String,
				default:'background:#FFFFFF;'
			}
		}
	}
</script>

<style>
</style>
