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
		<!-- 排序|筛选 -->
		<view class="d-flex border-bottom a-center" style="height: 90upx;">
			<view class="flex-1 d-flex a-center j-center font-md" 
			v-for="(item,index) in screen.list" :key="index"
			@tap="changeScreen(index)">
				<text :class="screen.currentIndex === index ? 'main-text-color' : 'text-light-muted'">{{item.name}}</text>
				<view>
					<view class="iconfont icon-paixu-shengxu line-h0" :class="item.status === 1 ? 'main-text-color' : 'text-light-muted'"></view>
					<view class="iconfont icon-paixu-jiangxu line-h0" :class="item.status === 2 ? 'main-text-color' : 'text-light-muted'"></view>
				</view>
			</view>
		</view>
		
		
		<!-- 列表 -->
		<template v-if="list.length">
			<block v-for="(item,index) in list" :key="index">
				<searchlist-en :item="item" :index="index" />
			</block>
		</template>
		<template v-else>
			<view class="position-absolute d-flex flex-column a-center j-center top-0 left-0 right-0 bottom-0">
				<view class="mt-1" style="color: #B2B2B2;">什么都没搜到(╯‵□′)╯︵┻━┻</view>
				<view class="mt-1" style="color: #B2B2B2;">岛田老八秘制小汉堡了解一下？</view>
			</view>
		</template>
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni-ui/uni-drawer/uni-drawer.vue"
	import cardEn from "@/components/common/card-en.vue"
	import radiobuttonEn from "@/components/common/radiobutton-en.vue"
	import searchlistEn from "@/components/search-list/searchlist-en.vue"
	export default {
		components:{
			uniDrawer,
			cardEn,
			radiobuttonEn,
			searchlistEn
		},
		data() {
			return {
				keyword:"",
				screen:{
					currentIndex:0,
					list:[
						{ name:"默认",status:1},
						{ name:"销量",status:0},
						{ name:"价格",status:0}
					]
				},
				label:{
					selected:0,
					list:[
						{ name:"仅看有货"}
					]
				},
				list:[],
				searchHistory:[]
			}
		},
		onNavigationBarSearchInputChanged(e) {
			this.keyword = e.text
		},
		onNavigationBarSearchInputConfirmed() {
			this.search()
		},
		onNavigationBarButtonTap() {
			this.search()
		},
		onLoad(e) {
			if(e.keyword){
				this.__init(e.keyword)
			}else if(e.category_id){
				this.__initC(e.category_id)
			}else{
				this.__initS(e.s_id)
			}
		},
		methods: {
			//初始化根据用户搜索的数据
			__init(data){			
				this.$H.post("/getSearchList",{title:data}).then(res =>{
					this.list = res
				}).catch(()=>{ 
					console.log('初始化商品列表时出错')
				})
			},
			//初始化根据商品分类查询的数据
			__initC(data){
				this.$H.post("/getSearchCategory",{id:data}).then(res =>{
					this.list = res
				}).catch(()=>{ 
					console.log('初始化商品列表时出错')
				})
			},
			//特殊分类
			__initS(data){
				this.$H.post("/getSearchSpacial",{s_id:data}).then(res =>{
					this.list = res
				}).catch(()=>{ 
					console.log('初始化商品列表时出错')
				})
			},
			changeScreen(index){
				//判断当前点击是否已经是激活状态
				let oldIndex = this.screen.currentIndex
				let oldItem = this.screen.list[oldIndex]
				if(oldIndex === index){
					this.list.reverse()
					return oldItem.status = oldItem.status === 1 ? 2 : 1				
				}
				let newItem = this.screen.list[index]
				//移除旧激活状态
				oldItem.status = 0
				this.screen.currentIndex = index
				//增加新激活状态
				newItem.status = 1
				//触发排序
				if(this.screen.list[0].status === 1){
					this.list = this.list.sort(this.$options.methods.compare('id'))
				}
				if(this.screen.list[1].status === 1){
					this.list = this.list.sort(this.$options.methods.compare('sale_num'))
				}
				if(this.screen.list[2].status === 1){
					this.list = this.list.sort(this.$options.methods.compare('pprice'))
				}

			},
			submit(){
				
			},
			compare(property){
				return function(value1,value2){
					let v1 = value1[property];
					let v2 = value2[property];
					return v1-v2
				}
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
				let oldSearchHisroty = uni.getStorageSync('searchHistory')
				if(oldSearchHisroty){
					this.searchHistory = JSON.parse(oldSearchHisroty)
				}
				this.searchHistory.unshift(this.keyword);
				uni.setStorageSync('searchHistory',JSON.stringify(this.searchHistory))
				
				//搜索
				this.__init(this.keyword)
			}
			
		}
	}
</script>

<style>
</style>
