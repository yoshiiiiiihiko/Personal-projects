<template>
	<view class="row j-center m-2">
		<!--首页图标-->
		<block v-for="(item,index) in resdata " :key="index">
			<view class="span-4 d-flex flex-column j-center a-center py-2" @tap="event(item)">
				<image :src="item.src"
				style="width: 60upx; height: 60upx;"
				mode="widthFix"></image>
				<text class="font-sm">{{item.text}}</text>
			</view>
		</block>
	</view>
</template>

<script>
	export default{
		props:{
			resdata:Array
		},
		methods:{
			event(item){
				if(item.s_id){
					uni.navigateTo({
						url:'../search-list/search-list?s_id='+item.s_id,
					})
				}else{
					uni.navigateTo({
						url:'../search-list/search-list?category_id='+item.id,
					})
				}

			}
		}
		
	}
</script>

<style>
</style>
