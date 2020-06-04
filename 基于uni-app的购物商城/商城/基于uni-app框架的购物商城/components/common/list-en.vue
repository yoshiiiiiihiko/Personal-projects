<template>
	<view style="width: 372.5upx;" @click="openDetail">
		<image :src="item.pic" 
		mode="widthFix"
		lazy-load></image>
		<view class="p-2 pt-1">
			<view class="font-md">{{item.title}}</view>
			<text class="d-block font text-light-muted">{{item.desc}}</text>
			<view class="d-flex my-1">
				<price-en>{{item.pprice}}</price-en>
				<view class="font-sm text-light-muted line-through m-1 a-self-end line-h" >￥{{item.oprice}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import priceEn from "@/components/common/price-en.vue";
	export default{
		components:{
			priceEn
		},
		props:{
			item:Object,
			index:Number
		},
		methods:{
			openDetail(){
				uni.navigateTo({
					url: '/pages/detail/detail?detail='+JSON.stringify(this.item)
				});
			}
		}
	}
</script>

<style>
</style>
