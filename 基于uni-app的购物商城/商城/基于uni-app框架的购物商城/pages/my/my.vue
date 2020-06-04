<template>
	<view>
		<loading-plus v-if="showLoading"></loading-plus>
		<!-- 头部 -->
		<view class="position-relative d-flex a-center" style="height: 420rpx;">
			<image src="../../static/images/my/1.jpg" mode="aspectFill" style="height: 420rpx;width:100%"></image>
			<view class="d-flex a-center position-absolute left-0 right-0" style="bottom: 50rpx;">
				<image src="../../static/images/detail/touxiang.jpg"
				style="height: 145rpx;width:145rpx;border: 5rpx solid;"
				class="rounded-circle border-light ml-4"></image>
				<view class="ml-2 text-white font-lg">{{userInfo.name}}</view>					
			</view>
		</view>
		
		<!-- 订单管理 -->
		<card-en>
			<view slot="head" class="d-flex a-center j-sb border-bottom border-light-secondary py-1">
				<text class="pl-1" style="font-size: 35rpx;">我的订单</text>
				<view class="text-secondary font-md" @click="navigate('order')">
					全部订单<text class="iconfont icon-you font-md"></text>
				</view>
			</view>
			<view class="d-flex a-center">
				<view class="flex-1 d-flex flex-column a-center j-center py-3" @click="openOrder(1)">
					<view class="iconfont icon-yinhangqia font-big line-h"></view>
					<view>待发货</view>
				</view>
				<view class="flex-1 d-flex flex-column a-center j-center py-3" @click="openOrder(2)">
					<view class="iconfont icon-daishouhuo font-big line-h"></view>
					<view>待收货</view>
				</view>
				<view class="flex-1 d-flex flex-column a-center j-center py-3" @click="openOrder(3)">
					<view class="iconfont icon-pinglun1 font-big line-h"></view>
					<view>待评价</view>
				</view>
				<view class="flex-1 d-flex flex-column a-center j-center py-3" @click="openOrder(4)">
					<view class="iconfont icon-chaojihuati-chaojihuati font-big line-h"></view>
					<view>售后中</view>
				</view>
			</view>
		</card-en>
		
		<divider-en />
		
		<!-- 菜单列表 -->
		<uni-list-item title="收货地址" :showExtraIcon="true" iconName="icon-dingwei" iconStyle="color:#F4A460;font-size:45rpx;"
		@click="navigate('user-address')"></uni-list-item>
		<uni-list-item title="个人资料" :showExtraIcon="true" iconName="icon-wode" iconStyle="color:#79905A;font-size:45rpx;"
		@click="navigate('user-userInfo')"></uni-list-item>
		<uni-list-item title="帮助中心" :showExtraIcon="true" iconName="icon-yiwen" iconStyle="color:#FF69B4;font-size:45rpx;"
		@click="navigate('help')"></uni-list-item>
		<uni-list-item title="意见反馈" :showExtraIcon="true" iconName="icon-fenbianshuai" iconStyle="color:	#4682B4;font-size:45rpx;"
		@click="navigate('user-advise')"></uni-list-item>
		<divider-en />
		<uni-list-item title="用户协议" :showExtraIcon="true" iconName="icon-gantan" iconStyle="color:#FFA500;font-size:45rpx;"
		@click="navigate('userAgreement')"></uni-list-item>
		<uni-list-item title="关于" :showExtraIcon="true" iconName="icon-pinglun" iconStyle="color:#778899;font-size:45rpx;"
		@click="navigate('about')"></uni-list-item>
		<divider-en />
		<uni-list-item title="退出账号" :showExtraIcon="true" iconName="icon-shanchu" iconStyle="color:	#000000;font-size:45rpx;"
		@click="logout()"></uni-list-item>
	</view>
</template>

<script>
	import loading from "@/common/mixin/loading.js"
	import {mapState,mapMutations} from "vuex"
	
	import cardEn from "@/components/common/card-en.vue"
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	export default {
		mixins:[loading],		
		components:{
			cardEn,
			uniListItem
		},
		data() {
			return {
				showLoading:true,
			}
		},
		computed:{
			...mapState({
				'loginStatue':state=>state.user.loginStatue,
				'userInfo':state=>state.user.userInfo
			})
		},
		onReady() {
			setTimeout(()=>{
				this.$nextTick(()=>{
					this.showLoading = false
				})
			},1000)
		},
		methods: {
			...mapMutations(['logout']),
			navigate(path){
				if(!path) return;
				uni.navigateTo({
					url: `/pages/${path}/${path}`,
				});
			},
			openOrder(e){
				uni.navigateTo({
					url: '../order/order?key='+e,
				});
			}
		},
	}
</script>

<style>

</style>
