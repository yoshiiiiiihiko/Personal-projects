<template>
	<!-- 首页广告位 -->
	<!-- 左边 宽为373upx,高为530upx -->
	<view class="d-flex">
		<image :src="resdata.left.src"
		lazy-load
		style="width: 373upx;height: 530upx;border-right: 2upx solid #F5F5F5;"
		@tap="event(1)">
		</image>
	
	<!-- 右边 分为上下两部分 宽为375upx，高为264upx-->
		<view class="d-flex flex-column">
			<image :src="resdata.righttop.src"
			style="width: 375upx;height: 264upx;border-bottom: 2upx solid #F5F5F5;"
			@tap="event(2)"></image>
			<image :src="resdata.rightbottom.src"
			style="width: 375upx;height: 264upx;"
			@tap="event(3)">
			</image>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			resdata:Object
		},
		methods:{
			event(obj){
				if(obj == 1){
					uni.navigateTo({
						url:'../search-list/search-list?category_id=13',
					})
				}else{
					uni.showToast({
						title: '活动已经结束啦⊙﹏⊙∥',
						icon:'none'
					});
				}
				
			}
		}
		
	}
</script>

<style>
</style>
