<template>
	<view>
		<!-- 商品详细大图 -->
		<swiper-en :resdata="banners" height="750" preview></swiper-en>
		
		<!-- 基础详情 -->
		<view class="p-3">
			<view class="font-lg">{{detail.title}}</view>
			<view class="font text-light-muted mb-3 line-h-sm">
				{{detail.desc}}
			</view>
			<price-en priceSize="font-lg" unitSize="font">{{detail.pprice}}</price-en>
		</view>
		
		<!-- 属性选择 -->
		<view class="p-3">
			<view class="rounded border bg-light-secondary">
				<uni-list-item @click="show('readyBuy')">
					<view class="d-flex">
						<text class="mr-2 text-muted">已选口味</text>
						<text>{{checkSku}}</text>
					</view>
				</uni-list-item>
				<uni-list-item :showArrowIcon="false">
					<view class="d-flex">
						<text class="mr-2 text-muted">配送范围</text>
						<text class="mr-2">仅中国大陆</text>
						<template v-if="isStock">
							<text class="main-text-color">有现货</text>
						</template>
						<template v-else>
							<text class="text-danger">暂时缺货</text>
						</template>
					</view>
				</uni-list-item>
				<uni-list-item @click="show('service')">
					<view class="d-flex a-center">
						<view class="text-muted font d-flex a-center mr-1">
							<view class="iconfont icon-finish main-text-color"></view>
							官方自营
						</view>
						<view class="text-muted font d-flex a-center mr-1">
							<view class="iconfont icon-finish main-text-color"></view>
							更快送达
						</view>
						<view class="text-muted font d-flex a-center mr-1">
							<view class="iconfont icon-finish main-text-color"></view>
							七天无理由退货
						</view>
					</view>
				</uni-list-item>
			</view>
		</view>
		
		<!-- 横向滚动评论 -->
		<scrollcomments-en :goods_id="detail.id" :comments="comments"></scrollcomments-en>
		
		<!-- 商品详情展示 -->
		<view class="py-4">
			<u-parse className="uParse" :content="introduce" @preview="preview" @navigate="navigate"></u-parse>
		</view>
		
		
		<!-- 分割线 -->
		<divider-en />
		
		<!-- 为你推荐 -->
		<cardhead-en />
		<view class="row j-sb">
			<block v-for="(item,index) in list" :key="index">
				<list-en :item="item" :index="index" />
			</block>
		</view>
		<!-- 底部操作条 -->
		<bottom-en @show="show('readyBuy')" :stock="label.list[label.selected].stock"/>
		
		<!-- 弹出框 -->
		<popup-en :popupClass="popup.readyBuy"
		@hide="hide('readyBuy')">
			<view class="d-flex a-center" style="height: 275rpx;">
				<image :src="detail.pic_main" mode="widthFix"
				style="height: 180rpx; width: 180rpx;" 
				class="border rounded"></image>
				<view class="pl-4">
					<price-en priceSize="font-lg" unitSize="font-lg">{{detail.pprice}}</price-en>
					<text class="d-block pt-2 text-muted">
						{{checkSku}}
					</text>
				</view>
			</view>
		
			<view class=" w-100" style="height: 660rpx;">
				<card-en headTitle="口味">
					<radiobutton-en :label="label" :selected.sync = "label.selected"></radiobutton-en>
				</card-en>
				<view class="d-flex j-sb a-center p-2 mt-2 border-light-secondary">
					<text style="font-size: 37rpx;">购买数量</text>
					<uni-number-box :min="1" :max="label.list[label.selected].stock" :value="num" @change="num = $event"></uni-number-box>
				</view>
			</view>
		
			<template v-if="label.list[label.selected].stock > 0">
				<view class="mian-bg-color text-white font-md d-flex a-center j-center"
				style="height: 100rpx; margin-left: -30rpx; margin-right: -30rpx;"
				hover-class="main-bg-hover-color" @tap.stop="addCart">
					确定加入购物车
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
		
		<!-- 收货地址弹出框 -->
		<popup-en :popupClass="popup.address"
		@hide="hide('address')">
			<view class="d-flex a-center j-center" style="height: 100rpx; font-size: 32rpx;">收货地址</view>
			<scroll-view scroll-y class="w-100" style="height: 835rpx;">
				<uni-list-item v-for="(item,index) in list1" :key="index">
					<view class="iconfont icon-dingwei font-weight font-md">{{item.name}}</view>
					<view class="font text-light-muted">{{item.address}} {{item.detailAddress}}</view>
				</uni-list-item>
			</scroll-view>
			<view class="mian-bg-color text-white font-md d-flex a-center j-center" 
			style="height: 100rpx; margin-left: -30rpx; margin-right: -30rpx;"
			hover-class="main-bg-hover-color" @tap.stop="openCreateAddress">
				选择新的地址
			</view>
		</popup-en>
		
		<!-- 服务说明 -->
		<popup-en :popupClass="popup.service"
		@hide="hide('service')">
			<view class="d-flex a-center j-center" style="height: 100rpx; font-size: 32rpx;">服务说明</view>
			<scroll-view scroll-y class="w-100" style="height: 835rpx;">
				<view class="py-2 px-1" v-for="(item,index) in server" :key="index">
					<view class="d-flex a-center">
						<view class="iconfont icon-finish main-text-color font-md">{{item.name}}</view>
					</view>
					<text class="text-light-muted pl-3">
						{{item.desc}}
					</text>
				</view>
			</scroll-view>
			<view class="mian-bg-color text-white font-md d-flex a-center j-center" 
			style="height: 100rpx; margin-left: -30rpx; margin-right: -30rpx;"
			hover-class="main-bg-hover-color" @tap.stop="hide('service')">
				我知道啦
			</view>
		</popup-en>
	</view>
</template>

<script>
	import swiperEn from "@/components/index/swiper-en.vue"
	import bottomEn from "@/components/detail/bottom-en.vue"
	import priceEn from "@/components/common/price-en.vue"
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	import scrollcommentsEn from "@/components/detail/scrollcomments-en.vue"
	import uParse from "@/components/uni-ui/uParse/src/wxParse.vue"
	import cardEn from "@/components/common/card-en.vue"
	import listEn from "@/components/common/list-en.vue"
	import dividerEn from "@/components/common/divider-en.vue"
	import popupEn from "@/components/common/popup-en.vue"
	import radiobuttonEn from "@/components/common/radiobutton-en.vue"
	import cardheadEn from "@/components/common/cardhead-en.vue"
	import uniNumberBox from "@/components/uni-ui/uni-number-box/uni-number-box.vue"
	import {mapState,mapMutations} from "vuex"

	
	export default {
		components:{
			swiperEn,
			bottomEn,
			priceEn,
			uniListItem,
			scrollcommentsEn,
			uParse,
			cardEn,
			listEn,
			dividerEn,
			popupEn,
			radiobuttonEn,
			uniNumberBox,
			cardheadEn
		},
		data() {
			return {
				popupClass:"none",
				popup:{
					readyBuy:"none",
					address:"none",
					service:"none"
				},
				banners:[],
				num:1,
				detail:{},
				comments:[
					{
						userpic:"/static/images/detail/touxiang.jpg",
						username:"一号买家",
						create_time:"2019-12-31",
						goods_num:"110",
						context:"真的很好吃，从来没吃过这么好吃的零食。",
						imglist:[]
					},
					{
						userpic:"/static/images/detail/touxiang.jpg",
						username:"二号买家",
						create_time:"2019-12-31",
						goods_num:"110",
						context:"天哪，好吃得我快哭了。",
						imglist:[]
					},
					{
						userpic:"/static/images/detail/touxiang.jpg",
						username:"三号买家",
						create_time:"2019-12-31",
						goods_num:"110",
						context:"这可能是这世界上最好吃的东西了吧。",
						imglist:[]
					},
				],
				introduce:``,
				list:[],
				label:{
					selected:0,
					list:[]
				},
				server:[
					{
						name:"官方自营",
						desc:"三只松鼠官方自营"
					},
					{
						name:"更快送达",
						desc:"严格考核物流时效，选择最近的仓库发货，更快送达"
					},
					{
						name:"七天无理由退货",
						desc:"满足相应条件时，消费者可申请“七天无理由退货”"
					}
				]
			}
		},
		//监听页面返回事件，即当打开弹出框时，点击手机返回键时，不是退出整个页面，而是关闭弹出框。
		onBackPress(){
			//关闭弹出框
			for(let key in this.popup){
				if(this.popup[key] !== 'none'){
					this.hide(key)
					return true
				}
			}
		},
		computed:{
			...mapState({
				'list1':state=>state.address.list
			}),
			checkSku(){
				let checkSku = this.label.list[this.label.selected].name
				return checkSku
			},
			isStock(){
				let isStock1 = true
				for(let i = 0;i<this.label.list.length;i++){
					if(this.label.list[i].stock <= 0){
						isStock1 = false
					}else{
						isStock1 = true
						return isStock1
					}
				}
				return isStock1
			}
		},
		onLoad(e) {
			if(e.detail){
				this.__init(JSON.parse(e.detail))
			}
		},
		methods: {
			...mapMutations([
				'addGoodsToCart'
			]),
			//初始化页面
			__init(data){
				//初始化轮播图
				this.$H.post("/getGoodsSwiper",data).then(res =>{
					this.banners = res.map(v=>{
						return{
							src:v.pic
						}
					})
				}).catch(()=>{ 
					console.log('初始化轮播图时出错')
				}) 
				
				
				//初始化商品详情
				this.$H.post("/getGoodsDetail",data).then(res =>{
					//商品基础信息
					this.detail = res
					//标题
					uni.setNavigationBarTitle({
						title:res.title
					})
					//商品详情图
					this.introduce = res.introduce
				}).catch(()=>{ 
					console.log('初始化商品详情时出错了')
				})
				
				//初始化商品规格
				this.$H.post("/getGoodsSku",data).then(res =>{
					this.label.list = res
				}).catch(()=>{ 
					console.log('初始化规格时出错了') 
				})
				
				//初始化为你推荐列表
				this.$H.get("/getCommonList").then(res =>{
					this.list = res
				}).catch(()=>{
					console.log('初始化为你推荐列表时出错了')
				})
			},
			openCreateAddress(){
				uni.navigateTo({
					url: '../user-address-edit/user-address-edit',
				});
				this.hide('address')
			},
			hide(key){
				this.popup[key]='hide'
				setTimeout(()=>{
					this.popup[key]='none'
				},200);
			},
			show(key){
				this.popup[key]='show'
			},
			preview(src,e){
				//做点什么 预留的接口
				console.log("src: " + src);
			},
			navigate(href,e){
				//如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容 预留接口
				console.log("href " + href);
			},
			//加入购物车
			addCart(){
				//组织数据
				let goods = this.detail
				goods['checked'] = false
				goods['num'] = this.num
				goods['attrs'] = this.label
				// 加入购物车
				let data = JSON.parse(JSON.stringify(goods))//神仙操作
				console.log(JSON.stringify(data));
				this.addGoodsToCart(data)
				this.hide('readyBuy')
				uni.showToast({
				title: '加入购物车成功'
				});
			}
		}
	}
</script>

<style>
.uParse .p{padding: 0!important;}
.uParse view{ line-height: 0!important;}

</style>
