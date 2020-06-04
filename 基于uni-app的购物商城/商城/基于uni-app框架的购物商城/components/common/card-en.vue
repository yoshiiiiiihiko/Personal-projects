<template>
	<!-- 基础卡片组件 -->
	<view class="card">
		<!-- 标题 head-->
		<view v-if="showhead" class="pb-1 pt-1 pr-1 pl-2 main-border-color font-md">
			<slot name="head">		
				<text v-if="headTitle">{{headTitle}}</text>
			</slot>
		</view>
		<!-- 内容 body-->
		<view>
			<image v-if="bodyImage" :src="bodyImage" mode="widthFix"></image>
			<!-- <slot name="body"></slot> -->
			<slot />
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			headTitle:String,
			bodyImage:String,
			
			//是否显示head
			showhead:{
				type:Boolean,
				default:true
			}
		}
	}
</script>

<style>
</style>
