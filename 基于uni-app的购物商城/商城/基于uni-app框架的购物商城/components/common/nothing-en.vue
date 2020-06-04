<template>
	<view class="position-absolute d-flex flex-column a-center j-center top-0 left-0 right-0 bottom-0" style="background-color: #F5F5F5;">
		<image :src="getPic" mode="widthFix" style="width: 250rpx"></image>
		<view class="mt-1" style="color: #B2B2B2;">{{title}}</view>
	</view>
</template>

<script>
	export default{
		props:{
			pic:{
				type:String,
				default:""
			},
			title:{
				type:String,
				default:""
			}
		},
		computed:{
			getPic(){
				return `../../static/images/nothing/${this.pic}.png`
			}
		}
	}
</script>

<style>
</style>
