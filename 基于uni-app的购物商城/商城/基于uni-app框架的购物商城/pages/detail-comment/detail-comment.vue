<template>
	<view>
		<view class="p-2">
			<view class="d-flex a-center py-2 px-1">
				<text class="text-muted">用户评价({{commentNum}})</text>
			</view>
		</view>	
		<divider-en/>
		<template v-if="comment.length">
			<view class="p-2 d-flex a-start border-bottom border-light-secondary"
			v-for="(item,index) in comment" :key="index">
				<image src="../../static/images/detail/touxiang.jpg" mode="widthFix"
				style="width: 90rpx; height: 90rpx;" class="rounded flex-shrink"></image>
				<view class="pl-2 flex-1">
					<view class="d-flex a-center">
						<text class="font-md text-primary font-weight">{{item.name}}</text>
						<template v-if="item.isGoodComment === '1'">
							<view class="iconfont icon-dianzan main-text-color ml-auto font">
								<text class="pl-1 font">好吃</text>
							</view>
						</template>
						<template v-else>
							<view class="iconfont icon-gantan1 text-warning ml-auto font-md">
								<text class="pl-1 font">难吃</text>
							</view>
						</template>
					</view>
					<view class="line-h-md font-md">
						{{item.content}}
					</view>
					<text class="d-flex a-center text-light-muted">{{item.time}}</text>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="position-absolute d-flex flex-column a-center j-center top-0 left-0 right-0 bottom-0">
				<view class="mt-1" style="color: #B2B2B2;">商品还没人评价呢o((⊙﹏⊙))o</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				comment:[],
				commentNum:0
			}
		},
		onLoad(e) {
			if(e.id){
				this.__init(e.id)
			}			
		},
		methods: {
			//初始化
			__init(data){
				this.$H.post("/getGoodsComment",{id:data}).then(res =>{
					this.comment = res
					this.commentNum = this.comment.length
				}).catch(()=>{ 
					console.log('初始化评论时出错')
				})
			}
		}
	}
</script>

<style>

</style>
