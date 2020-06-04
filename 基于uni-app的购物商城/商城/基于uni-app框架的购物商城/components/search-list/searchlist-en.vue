<template>
	<view class="row border-bottom border-light-secondary animated fadeIn fast" @click="openDetail">
		<view class="span-6 p-2">
			<image :src="item.pic"
			mode="widthFix" class="w-100"></image>
		</view>
		<view class="span-14 pl-3 pr-2 py d-flex flex-column">
			<view style="font-size: 32upx;">{{item.title}}</view>
			<view class="font text-light-muted line-h-md mb-auto">{{item.desc}}</view>
			<price-en>{{item.pprice}}</price-en>
			<view class="font-sm text-light-muted mt-1">{{item.comment_num}} 条评论 / 已售出{{item.sale_num}}</view>
		</view>
	</view>
</template>

<script>
	import priceEn from "@/components/common/price-en.vue"
	export default{
		props:{
			item:Object,
			index:Number
		},
		components:{
			priceEn
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
