pic<template>
	<view style="background: #F5F5F5;" class="animated fadeIn fast">	
		<!-- <loading-plus v-if="notReady"></loading-plus> -->
		<uni-nav-bar :right-text="isEdit ? '完成':'编辑'" title="购物车" 
		statusBar :shadow="false" :fixed="true"
		@click-right="isEdit = !isEdit"
		></uni-nav-bar>
		
		<!-- 购物车为空 -->
		<view class="py-5 d-flex a-center j-center bg-white border"
		v-if="!disableSelectAll">
			<view class="iconfont icon-gouwuche text-light-muted" style="font-size: 50rpx;"></view>
				<text class="text-light-muted mx-2">购物车还是空的(～﹃～)~zZ</text>
				<view class="px-2 py-1 border border-light-secondary rounded"
				hover-class="bg-light-secondary">
				去逛逛
				</view>			
		</view>
		
		<!-- 购物车多选组件 -->
	<!-- 	<label class="radio" @click="selectItem">
			<radio value="1" color="#79905A" :checked="checked"></radio>
		</label> -->
		
		<!-- 购物车商品列表 -->
		<view class="bg-white px-2" v-else>
			<view class="d-flex a-center py-3 border-bottom border-light-secondary"
			v-for="(item,index) in list" :key="index">
				<label class="radio d-flex a-center j-center flex-shrink" 
				style="width: 80upx;height: 80upx;" @click="selectItem(index)">
					<radio :value="item.id" color="#79905A" :checked="item.checked"/>
				</label>
				<image :src="item.pic_main" mode="widthFix"
				style="height:180rpx; width: 180rpx;"
				class="border rounded flex-shrink"></image>
				
				<view class="flex-1 d-flex flex-column pl-3">
					<view class="text-dark" style="font-size: 35upx;">
						{{item.title}}
					</view>
					<!-- 属性规格 -->
					<view class="d-flex text-light-muted mb-3"
					:class="isEdit ? 'p-1 bg-light-secondary' : ''"
					@tap.stop="showPopup(index)">
						<text class="mr-1">{{item.attrs.list[item.attrs.selected].name}}</text>
						
						<view class="iconfont icon-bottom font ml-auto"
						v-if="isEdit"></view>
					</view>
					<view class="mt-auto d-flex j-sb">			
						<price-en priceSize="font-md" unitSize="font-md">{{item.pprice}}</price-en>
						<view class="a-self-end">
						<uni-number-box :min=1 :max="item.attrs.list[item.attrs.selected].stock" :value="item.num"
						@change="changeNum($event,item,index)"></uni-number-box>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 为你推荐头部样式 -->
		<cardhead-en bg="background:#F5F5F5;"/>
		<!-- 为你推荐列表 -->
		<view class="row j-sb bg-white">
			<block v-for="(item,index) in hotList" :key="index">
				<list-en :item="item" :index="index" />
			</block>
		</view>
		<!-- 底部合计 -->
		<view style="height: 100rpx; background: #FFFFFF;"></view>
		<view v-if="disableSelectAll">
			<view class="bg-white d-flex a-center position-fixed left-0 right-0 bottom-0 border-top border-light-secondary a-stretch"
			style="height: 100rpx; z-index: 1000;">
				<label class="radio d-flex a-center j-center flex-shrink"
				style="width: 120rpx;" @click="doSelectAll">
					<radio color="#79905A" :checked="checkedAll"/>
				</label>
				<template v-if="!isEdit">
					<view class="flex-1 d-flex a-center j-center font-md">
						合计<price-en>{{totalPrice}}</price-en>
					</view>
					<view class="flex-1 d-flex a-center j-center mian-bg-color text-white font-md"
					hover-class="main-bg-hover-color" @tap="openOrderConfirm">
						结算
					</view>
				</template>
				
				<template v-else>
					<view class="flex-1 d-flex a-center j-center bg-danger text-white font-md border border-danger"
					hover-class="main-bg-hover-color" @tap="doDelectGoods">
						删除
					</view>
				</template>
			</view>
		</view>
		<!-- 属性选择弹出框 -->
		<popup-en :popupClass="popupShow"
		@hide="doHidePopup" v-if="isEdit">
			<view class="d-flex a-center" style="height: 275rpx;">
				<image :src="popupData.pic_main" mode="widthFix"
				style="height: 180rpx; width: 180rpx;" 
				class="border rounded"></image>
				<view class="pl-4">
					<price-en priceSize="font-lg" unitSize="font-lg">{{popupData.pprice}}</price-en>
						<text class="d-block pt-2 text-muted">
							{{popupData.attrs.list[popupData.attrs.selected].name}}
						</text>						
				</view>
			</view>
		
			<view class=" w-100" style="height: 660rpx;">
				<card-en headTitle="口味">
					<radiobutton-en :label="popupData.attrs" :selected.sync = "popupData.attrs.selected"></radiobutton-en>
				</card-en>
				<view class="d-flex j-sb a-center p-2 mt-2 border-light-secondary">
					<text style="font-size: 37rpx;">购买数量</text>
					<uni-number-box :min="1" :max="popupData.attrs.list[popupData.attrs.selected].stock" :value="popupData.num" @change="popupData.num = $event"></uni-number-box>
				</view>
			</view>
		
			<template v-if="popupData.attrs.list[popupData.attrs.selected].stock > 0">
				<view class="mian-bg-color text-white font-md d-flex a-center j-center"
				style="height: 100rpx; margin-left: -30rpx; margin-right: -30rpx;"
				hover-class="main-bg-hover-color" @tap.stop="doHidePopup">
					确定
				</view>
			</template>
			<template v-else>
				<view class="bg-danger text-white font-md d-flex a-center j-center"
				style="height: 100rpx; margin-left: -30rpx; margin-right: -30rpx;"
				hover-class="main-bg-hover-color" >
					暂时缺货
				</view>
			</template>
		</popup-en>
	</view>
</template>

<script>
	// import loading from "@/common/mixin/loading.js"
	
	import uniNavBar from "@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue"
	import priceEn from "@/components/common/price-en.vue"
	import uniNumberBox from "@/components/uni-ui/uni-number-box/uni-number-box.vue"
	import {mapState,mapGetters,mapActions,mapMutations} from "vuex"
	import cardEn from "@/components/common/card-en.vue"
	import radiobuttonEn from "@/components/common/radiobutton-en.vue"
	import popupEn from "@/components/common/popup-en.vue"
	import listEn from "@/components/common/list-en.vue"
	import cardheadEn from "@/components/common/cardhead-en.vue"
	export default{
		// mixins:[loading],
		components:{
			uniNavBar,
			priceEn,
			uniNumberBox,
			cardEn,
			radiobuttonEn,
			popupEn,
			listEn,
			cardheadEn
		},
		data(){
			return{
				isEdit:false,
				hotList:[],
			}
		},
		onLoad() {
			this.__init()
		},
		methods:{
			changeNum(e,item,index){
				item.num = e
			},
			...mapActions([
				'doSelectAll',
				'doDelectGoods',
				'doShowPopup',
				'doHidePopup'
			]),
			...mapMutations([
				'selectItem'
			]),
			__init(){
				this.$H.get("/getCommonList").then(res =>{
				this.hotList = res
				}).catch(()=>{
				console.log('初始化为你推荐列表时出错了')
				})
			},
			openOrderConfirm(){
				if(this.selectedList.length === 0){
					return uni.showToast({
						title:'请选择要结算的商品(ˉ▽ˉ；)...',
						icon:'none'
					})
				}
				uni.navigateTo({
					url: '../order-confirm/order-confirm?detail='+JSON.stringify(this.selectedList)
				});
			},
			showPopup(index){
				if(this.isEdit){
					this.doShowPopup(index)
				}
			}
		},
		computed:{
			...mapState({
				list:state=>state.cart.list,
				selectedList:state=>state.cart.selectedList,
				popupShow:state=>state.cart.popupShow
			}),
			...mapGetters([
				'checkedAll',
				'totalPrice',
				'disableSelectAll',
				'popupData'
			]),
		},
	}
</script>

<style>

</style>
