<template>
	
	<view>
		<loading-plus v-if="showLoading"></loading-plus>
		<!-- #ifdef MP -->
		<!-- 自定义导航栏 适配微信小程序-->
		<view class="d-flex a-center px-2" style="height: 90rpx;" @click="openSearch()">
			<view class="bg-light-secondary w-100 rounded d-flex a-center" style="height: 65rpx;">
				<text class="iconfont icon-sousuo mx-2 font-md"></text>
				<text class="text-light-muted">输入想吃的东西吧</text>
			</view>
		</view>
		<!-- #endif -->
		
		<!--轮播图-->
		<swiper-en :resdata="swiper" />
		
		<!-- 首页分类图标 -->
		<first-en :resdata="first" />
		
	    <!-- 全局分割线 -->
		<divider-en />
		
		
		<!-- 首页广告位 今日推荐 -->
		<card-en :showhead="false" bodyImage="/static/images/ad/ad5.jpg" @tap="showAdMsg"/>
		<ad-en :resdata="ad" />
		
		<divider-en />
		
		<!-- 公共列表组件 为你推荐 -->
		<cardhead-en />
		<view class="row j-sb">
			<block v-for="(item,index) in list" :key="index">
				<list-en :item="item" :index="index" />
			</block>
		</view>
		
	</view>
	
</template>

<script>
	import loading from "@/common/mixin/loading.js"
	import $H from "../../common/lib/request.js";
	import swiperEn from "@/components/index/swiper-en.vue";
	import firstEn from "@/components/index/first-en.vue";
	import adEn from "@/components/index/ad-en.vue";
	import cardEn from "@/components/common/card-en.vue";
	import listEn from "@/components/common/list-en.vue"; 
	import cardheadEn from "@/components/common/cardhead-en.vue"
	import {mapMutations,mapState} from "vuex"
	
	export default {
		components:{
			swiperEn,
			firstEn,
			adEn,
			cardEn,
			listEn,
			cardheadEn
		},
		data() {
			return {
				showLoading:true,
				swiper:[
					{ src:"../../static/images/swiper/demo-1.jpg" },
					{ src:"../../static/images/swiper/demo-2.jpg" },
					{ src:"../../static/images/swiper/demo-3.jpg" }
				],
				first:[
					{ src:"/static/images/first/new.png",text:"当季新品",s_id:"2"},
					{ src:"/static/images/first/hot.png",text:"热卖零食",s_id:"1"},
					{ src:"/static/images/first/gift.png",text:"超值礼盒",id:"13"},
					{ src:"/static/images/first/fruits.png",text:"阳光果干",id:"2"},
					{ src:"/static/images/first/nut.png",text:"坚果炒货",id:"3"},
					{ src:"/static/images/first/candy.png",text:"糖果布丁",id:"4"},
					{ src:"/static/images/first/cake.png",text:"美味糕点",id:"5"},
					{ src:"/static/images/first/noodle.png",text:"方便速食",id:"6"},
					{ src:"/static/images/first/biscuit.png",text:"饼干膨化",id:"1"},
					{ src:"/static/images/first/meat.png",text:"肉食卤味",id:"7"},
					{ src:"/static/images/first/bean.png",text:"素食豆类",id:"8"},
					{ src:"/static/images/first/hotstrips.png",text:"爽口辣条",id:"9"},
					{ src:"/static/images/first/vagetable.png",text:"冻干脆物",id:"10"},
					{ src:"/static/images/first/seafood.png",text:"即食海鲜",id:"11"},
					{ src:"/static/images/first/supple.png",text:"滋补食品",id:"12"}
				],
				ad:{
					left:{
						src:"/static/images/ad/ad1.jpg"
					},
					righttop:{
						src:"/static/images/ad/ad2.jpg"
					},
					rightbottom:{
						src:"/static/images/ad/ad3.jpg"
					}
				},
				list:[]
			}
		},
		created() {
			this.__init()
		},
		onReady() {
			setTimeout(()=>{
				this.$nextTick(()=>{
					this.showLoading = false
				})
			},1000)
		},
		methods: {
		...mapMutations(['initAddress']),
			
		  __init(){
			     //初始化为你推荐列表
				$H.get("/getCommonList").then(res =>{
					this.list = res
				}).catch(()=>{
					console.log('初始化为你推荐列表时出错了')
				})
				
				//初始化收货地址
				$H.post("/getUserAddress",{user_id:this.user_id}).then(res =>{
					this.initAddress(res)
				}).catch(()=>{ 
					console.log('初始化收货地址时出错')
				}) 
			},
			showAdMsg(){
				uni.showToast({
					title: '全场满100元包邮,不满100元需10元邮费哦~',
					icon:'none'
				});
			},
			openSearch(){
				uni.navigateTo({
					url: '../search/search',
				});
			}
		},
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search',
			});
		},
		computed:{
			...mapState({
				'user_id':state=>state.user.user_id
			})
		}
	}

</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
