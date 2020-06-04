<template>
	<view class="d-flex border-top border-light-secondary" style="height: 100%;box-sizing: border-box;">
		<loading-plus v-if="showLoading"></loading-plus>
		<scroll-view id="leftScroll" scroll-y style="flex:1;height:100%;" class="border-right border-light-secondary"
		:scroll-top="leftScrollTop">
			<view class="border-bottom border-light-secondary py-1 left-scroll-item"
			v-for="(item,index) in cate" :key="index" @tap="changeCate(index)" @click="openGoods(item.id)">
				<view class="py-1 font-md text-muted text-center"
				:class="activeIndex === index ? 'class-active' : ''">{{item.name}}</view>
			</view>
		</scroll-view>
		<scroll-view scroll-y style="flex:3.5;height:100%;">
			<view class="row scroll-row-item">
				<view class="span24-8 text-center py-2"
				v-for="(item,index) in list" :key="index"
				@click="openDetail(item)">
					<image  :src="item.pic"
					style="width: 120upx;height: 120upx;"></image>
					<text class="d-block">{{item.title}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import loading from "@/common/mixin/loading.js"
	
	export default {
		mixins:[loading],
		data() {
			return {	
				showLoading:true,
				//当前选中分类的索引
				activeIndex:0,
				categoryIndex:"category_id",
				cate:[
					{name:"所有商品",id:"category_id"},
					{name:"饼干膨化",id:1},
					{name:"阳光果干",id:2},
					{name:"坚果炒货",id:3},
					{name:"糖果布丁",id:4},
					{name:"美味糕点",id:5},
					{name:"方便速食",id:6},
					{name:"肉食卤味",id:7},
					{name:"素食豆类",id:8},
					{name:"爽口辣条",id:9},
					{name:"冻干脆物",id:10},
					{name:"即食海鲜",id:11},
					{name:"滋补食品",id:12},
					{name:"超值礼盒",id:13}
				],
				list:[],
				leftDomsTop:[],
				rightDomsTop:[],
				leftScrollTop:0,
				rightScrollTop:0,
				cateItemHeight:0
			}
		},
		onLoad() {
			this.__init()
		},
		methods: {
			//获取对应分类下的商品
			openGoods(e){
				this.categoryIndex = e
				this.__init()
			},
			__init(){
				this.$H.post("/getSearchCategory",{id:this.categoryIndex}).then(res =>{
					this.list = res
				}).catch(()=>{ 
					console.log('初始化商品列表时出错')
				})
				setTimeout(()=>{
					this.$nextTick(()=>{
						this.showLoading = false
					})
				},1000)
			},
		
			//点击左边分类事件
			changeCate(index){
				this.activeIndex = index
			},
			openDetail(item){
				uni.navigateTo({
					url: '/pages/detail/detail?detail='+JSON.stringify(item)
				});
			}
			
		}
	}
</script>

<style>
.class-active{
	border-left: 8upx solid #79905A;color:#79905A !important;
}
</style>
