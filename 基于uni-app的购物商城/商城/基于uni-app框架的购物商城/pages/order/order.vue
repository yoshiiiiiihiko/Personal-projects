<template>
	<view style="background: #F5F5F5;">
		<!-- <view class="position-relative" style="height: 400rpx;">
		</view> -->
		
		<!-- 顶部选项卡 -->
		<view class="d-flex bg-white a-center font-md text-muted border-top border-bottom border-light-secondary">
			<view class="flex-1 d-flex a-center j-center py-2"
			v-for="(item,index) in tabBars" :key="index"
			:class="tabIndex === index ? 'tabActice':''"
			@tap="tabChange(index)">
				{{item.name}}
			</view>
		</view>
		<!-- 订单列表 -->
		<block v-for="(tab,tabI) in tabBars" :key="tabI">
			<view class="position-relative" v-show="tabI === tabIndex"
			style="min-height:440rpx;">
				<template v-if="tab.orderList.length">
				<!-- 订单列表 -->
				<block v-for="(item,index) in tab.orderList" :key="index">
					<orderlist-en :item="item" :index="index" @update="getOrder"></orderlist-en>
				</block>
				</template>
				<!-- 无订单时 -->
				<template v-else>
					<nothing-en :pic="tab.nothing" :title="tab.msg"></nothing-en>
				</template>
				
			</view>
		</block>
		
		<!-- 为你推荐 -->
		<cardhead-en bg="background: #F5F5F5;"/>
		<view class="row j-sb">
			<block v-for="(item,index) in list" :key="index">
				<list-en :item="item" :index="index" />
			</block>
		</view>
	</view>
</template>

<script>
	import cardheadEn from "@/components/common/cardhead-en.vue"
	import listEn from "@/components/common/list-en.vue";
	import orderlistEn from "@/components/order/orderlist-en.vue"
	import nothingEn from "@/components/common/nothing-en.vue"
	import {mapState} from "vuex"
	export default {
		components:{
			cardheadEn,
			listEn,
			nothingEn,
			orderlistEn
		},
		data() {
			return {
				tabIndex:0,
				tabBars:[
					{
						name:"全部",
						nothing:"no_order",
						msg:"您还没有订单Σ(っ °Д °;)っ",
						key:"status",
						orderList:[],
					},
					{
						name:"待发货",
						nothing:"no_pay",
						msg:"您还没有待发货订单Σ(っ °Д °;)っ",
						key:"0",
						orderList:[]
					},
					{
						name:"待收货",
						nothing:"no_receiving",
						msg:"您还没有待收货订单Σ(っ °Д °;)っ",
						key:"1",
						orderList:[]
					},
					{
						name:"待评价",
						nothing:"no_comment",
						msg:"您还没有待评价订单Σ(っ °Д °;)っ",
						key:"2",
						orderList:[]
					},
					{
						name:"售后中",
						nothing:"no_afterSale",
						msg:"您还没有售后订单Σ(っ °Д °;)っ",
						key:"4",
						orderList:[]
					}
				],
				swiper:[
					{ src:"../../static/images/swiper/demo-1.jpg" },
					{ src:"../../static/images/swiper/demo-2.jpg" },
					{ src:"../../static/images/swiper/demo-3.jpg" }
				],
				first:[
					{ src:"/static/images/first/new.png",text:"当季新品"},
					{ src:"/static/images/first/hot.png",text:"热卖零食"},
					{ src:"/static/images/first/gift.png",text:"超值礼盒"},
					{ src:"/static/images/first/fruits.png",text:"阳光果干"},
					{ src:"/static/images/first/nut.png",text:"坚果炒货"},
					{ src:"/static/images/first/candy.png",text:"糖果布丁"},
					{ src:"/static/images/first/cake.png",text:"美味糕点"},
					{ src:"/static/images/first/noodle.png",text:"方便速食"},
					{ src:"/static/images/first/biscuit.png",text:"饼干膨化"},
					{ src:"/static/images/first/meat.png",text:"肉食卤味"},
					{ src:"/static/images/first/bean.png",text:"素食豆类"},
					{ src:"/static/images/first/hotstrips.png",text:"爽口辣条"},
					{ src:"/static/images/first/vagetable.png",text:"冻干脆物"},
					{ src:"/static/images/first/seafood.png",text:"即食海鲜"},
					{ src:"/static/images/first/supple.png",text:"滋补食品"}
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
		onLoad(e) {
			this.__init()
			if(e.key){
				this.tabIndex = parseInt(e.key)
			}
		},
		onShow() {
			this.getOrder()
		},
		methods: {
			tabChange(index){
				this.tabIndex = index
				this.getOrder()
			},
			__init(){
				//初始化为你推荐
				this.$H.get("/getCommonList").then(res =>{
				this.list = res
				}).catch(()=>{
				console.log('初始化为你推荐列表时出错了')
				})
			},
			getOrder(){
				this.$H.post("/getOrder",{key:this.key,user_id:this.user_id}).then(res =>{
					this.tabBars[this.tabIndex].orderList = res
				}).catch(()=>{ 
					console.log('初始化订单时出错')
				}) 
			}
		},
		computed:{
			...mapState({
				'user_id':state=>state.user.user_id
			}),
			key(){
				return this.tabBars[this.tabIndex].key
			}
		}
	}
</script>

<style>
.tabActice{
	border-bottom: 5rpx solid #79905A;
	color: #79905A;	
	margin-bottom: -5rpx;
}
</style>
