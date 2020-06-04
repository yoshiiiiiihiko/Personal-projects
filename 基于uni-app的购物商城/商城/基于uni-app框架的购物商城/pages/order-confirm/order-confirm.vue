<template>
	<view style="background: #F5F5F5;min-height: 100%; height: auto;">
		<!-- 地址选择 -->
		<view class="mian-bg-color text-white d-flex a-center px-3" style="height:250rpx"
		@click="openUserAddress">
			<view>
				<template v-if="address">
					<view class="font-weight font-lg d-flex a-center">
						{{address.name}} {{address.phone}} 
						<view class="border border-white rounded px-1 font ml-2"
						v-if="address.isDefault == 1">默认</view>
					</view>
					<view class="font">
						{{address.province}} {{address.city}} {{address.district}} {{address.address}}
					</view>
				</template>
				<template v-else>
					<view class="font-weight font-lg d-flex a-center">
						请选择收货地址
					</view>
				</template>
			</view>
			<view class="iconfont icon-you ml-auto"></view>
		</view>
		
		<!-- 订单确认 -->
		<view style="overflow: hidden; margin-top: -25rpx; border-top-left-radius: 25rpx; border-top-right-radius: 25rpx;">
			<view class="bg-white">
				<uni-list-item :showArrowIcon="false">
					<scroll-view scroll-x class="scroll-row" style="width: 100%;">
						<view class="scroll-row-item">
							<image :src="item.pic_main"
							style="width: 150rpx; height: 150rpx;" mode="widthFix" class="rounded mr-2"
							v-for="(item,index) in goodsList" :key="index"></image>
						</view>	
					</scroll-view>
					<view slot="rightContent" class="ml-2">共{{totalNum}}件</view>
				</uni-list-item>
				<uni-list-item title="商品总价" :showArrowIcon="false">
					<view slot="rightContent">
						<price-en color="text-dark">{{totalPrice}}</price-en>
					</view>
				</uni-list-item>
				<uni-list-item title="运费(满100元享包邮)" :showArrowIcon="false">
					<template v-if="isExpress">
						<view slot="rightContent">包邮</view>
					</template>
					<template v-else>
						<view slot="rightContent">
								<price-en>10.00</price-en>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item :showArrowIcon="false">
					<text class="main-text-color">小计</text>
					<view slot="rightContent">
						<price-en>{{finalPrice}}</price-en>
					</view>
				</uni-list-item>
				<divider-en />
				<uni-list-item title="票据" :showArrowIcon="false">
					<view slot="rightContent">电子票据--以订单详情为准</view>
				</uni-list-item>
			</view>
		</view>
		
		<!-- 底部 -->
		<view class="position-fixed d-flex a-center j-end bottom-0 left-0 right-0 bg-white p-2 font-md">
			应付金额:
			<view class="ml-2">
				<price-en>{{finalPrice}}</price-en>
			</view>
			<view class="ml-2 px-2 py-1 font-md mian-bg-color text-white"
			hover-class="main-bg-hover-color" style="border-radius:80rpx;"
			@click="openPay">
				去支付吧
			</view>
		</view>
	</view>
</template>

<script>
	import priceEn from "@/components/common/price-en.vue"
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	import {mapGetters,mapState} from"vuex"
	export default {
		components:{
			uniListItem,
			priceEn
		},
		data() {
			return {
				address:false,
				goods_id:[],
				addressDetail:""
			}
		},
		methods: {
			openUserAddress(){
				uni.navigateTo({
					url: '../user-address/user-address?type=choose',
				});
			},
			openPay(){
				if(!this.address){
					return uni.showToast({
						title:'请选择收货地址',
						icon:'none'
					})
				}
				uni.redirectTo({
					url:"../pay/pay?selectedList="+JSON.stringify(this.selectedList)+"&addressDetail="+JSON.stringify(this.addressDetail)
				})
			}
		},
		computed:{
			...mapGetters(['defaultAddress','totalPrice','finalPrice']),
			...mapState({
				list:state=>state.cart.list,
				selectedList:state=>state.cart.selectedList
			}),
			goodsList(){
				//通过传过来的选中的商品id来查询整个保存在vuex商品的信息
				return this.goods_id.map(id=>{
				    return this.list.find(v=>v.id === id)
				})
			},
			isExpress(){
				if(this.totalPrice >= 100){
					return true
				}
				return false
			},
			totalNum(){
				let total = 0
				for(let i = 0;i<this.goodsList.length; i++){
					total += parseInt(this.goodsList[i].num)
				}
				return total
			}
		},
		onLoad(e) {
			this.goods_id = JSON.parse(e.detail)
			if(this.defaultAddress.length){
				let arr = this.defaultAddress.filter(v=>v.isDefault==1)
				this.address = arr[0]
				this.addressDetail = this.address.name+"-"+this.address.phone+"-"+this.address.province+"-"+this.address.city+"-"+this.address.district+"-"+this.address.address			
			}
			//开启监听选择收货地址事件
			uni.$on('chooseAddress',(res)=>{
				this.address = res
				this.addressDetail = this.address.name+"-"+this.address.phone+"-"+this.address.province+"-"+this.address.city+"-"+this.address.district+"-"+this.address.address
			})
		},
		onUnload(){
			//关闭监听事件
			uni.$off('chooseAddress',(e)=>{
				console.log('关闭监听收货地址');
			})
		}
	}
</script>

<style>

</style>
