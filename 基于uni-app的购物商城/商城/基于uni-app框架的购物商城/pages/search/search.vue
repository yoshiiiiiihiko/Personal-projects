<template>
	<view>
		<!-- #ifdef MP -->
		<!-- 自定义导航栏 适配微信小程序-->
		<view class="d-flex a-center px-2" style="height: 90rpx;">
			<text class="iconfont icon-sousuo mx-2 font-md"></text>
			<input type="text" v-model="keyword" class="flex-1 bg-light rounded ml-3 px-2"
			 style="height: 65rpx;" placeholder="输入想吃的东西吧"/>
			<view style="width:85rpx;" class="d-flex a-center j-center main-text-color"
			 @click="search">搜索</view>
		</view>
		<!-- #endif -->
		<card-en headTitle="热门搜索" bodyImage="/static/images/ad/ad4.jpg" @tap="openAdGoods"/>
		
		<!-- 多色按钮 -->	
		<view class="px-1 mb-2">
				<colortag-en v-for="(item,index) in hot" :key="index" :item="item" 
				@click="fastSearch(item.name)"/>
		</view>
		
		<!-- 常用分类 -->
		<card-en headTitle="常用分类">
			<view class="pl-1 pt-1">		
				<colortag-en v-for="(item,index) in cate" :key="index" :item="item" :color="false" 
				@click="categorySearch(item.id)"/>
			</view>
		</card-en>
		
		<!-- 搜索记录 -->
		<template v-if="searchHistory.length > 0">
			<divider-en />
			<card-en>
				<view slot="head" class="d-flex a-center j-sb py-1">
					<text class="pl-1 font-md">搜索记录</text>
					<view class="font text-primary ml-auto"
					@click="clearSearchHistory">清除所有搜索记录</view>
				</view>
					<uni-list-item v-for="(item,index) in searchHistory" :key="index" 
					:title="item" :showArrow="false" 
					@click = "fastSearch(item)"></uni-list-item>
			</card-en>
		</template>
	</view>
</template>
	

<script>
	import cardEn from "@/components/common/card-en.vue"
	import colortagEn from "@/components/search/colortag-en.vue"
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	export default {
		components:{
			cardEn,
			colortagEn,
			uniListItem
		},
		data() {
			return {
				searchHistory:[],
				keyword:"",
				hot:[
					{ name:'芒果干' },
					{ name:'薄脆饼干' },
					{ name:'大礼包' },
					{ name:'开心果' },
					{ name:'爆米花' },
					{ name:'辣条' },
					{ name:'四川担担面'},
					{ name:'蜜枣' }
				],
				cate:[
					{ name:'超值礼盒',id:13},
					{ name:'坚果炒货',id:3},
					{ name:'饼干膨化',id:1},
					{ name:'即食海鲜',id:11},
					{ name:'方便速食',id:6},
					{ name:'冻干脆物',id:10},
				]
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index === 0){
				uni.navigateTo({
					url: '../search-list/search-list',
				});
			}
			
		},
		//监听文本框变化
		onNavigationBarSearchInputChanged(e) {
			this.keyword = e.text
		},
		//监听文本框提交
		onNavigationBarSearchInputConfirmed() {
			this.search()
		},
		onNavigationBarButtonTap() {
			this.search()
		},
		onShow() {
			//加载本地存储历史记录
			let oldSearchHisroty = uni.getStorageSync('searchHistory')
			if(oldSearchHisroty){
				this.searchHistory = JSON.parse(oldSearchHisroty)
			}
		},
		methods: {
			fastSearch(name){
				this.keyword = name
				this.search()
			},
			search(){
				if(this.keyword === ''){
					return uni.showToast({
						title:'搜索关键词不能为空哦(￣_￣|||)',
						icon:'none'
					});
				}
				//点击搜索之后隐藏键盘
				//plus.key.hideSoftKeyBord()
				uni.hideKeyboard();

				//添加进搜索记录
				setTimeout(()=>{
					this.searchHistory.unshift(this.keyword);
					uni.setStorageSync('searchHistory',JSON.stringify(this.searchHistory))
				}, 
				500);			
				uni.navigateTo({
					url:'../search-list/search-list?keyword='+this.keyword,
				})
			},
			categorySearch(category_id){
				uni.navigateTo({
					url:'../search-list/search-list?category_id='+category_id,
				})
			},
			//清除搜索记录
			clearSearchHistory(){
				uni.clearStorageSync()
				this.searchHistory = []
			},
			openAdGoods(){
				uni.navigateTo({
					url:'../search-list/search-list?category_id=13',
				})
			}
		}
	}
</script>

<style>

</style>
