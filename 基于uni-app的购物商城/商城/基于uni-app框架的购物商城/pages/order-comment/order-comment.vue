<template>
	<view>
		<view class="a-center"
		v-for="(item,index) in orderDetail.orderItem" :key="index">
			<view class="d-flex m-2 border-bottom border-light-secondary">
				<image :src="item.pic" mode="widthFix"
				style="width: 150rpx;height: 150rpx;" class="rounded mx-2 flex-shrink"
				></image>
				<view class="flex-1">
					<view class="d-flex a-center">
						<text class="font-md text-dark">{{item.title}}</text>
						<text class="font-md text-light-muted ml-auto"
						>￥{{item.pprice}}</text>
					</view>
					<view class="d-flex a-center">
						<text class="font text-light-muted">{{item.attr}}</text>
						<text class="font text-light-muted ml-auto"
						>x{{item.num}}</text>
					</view>
				</view>
			</view>
			<card-en headTitle="评价类型">
				<radio-group class="pl-4 pb-1" style="box-sizing: border-box;"
				@change="radioChange" :id="index">
					<radio value="1" color="#79905A" /><text class="pr-5">好吃</text>
					<radio value="0" color="#79905A"/><text>难吃</text>
				</radio-group>
			</card-en>
			<card-en headTitle="评价内容" >
				<view class="position-relative p-2">
					<textarea placeholder="您的评价将是其他用户的重要参考来源哦~(￣▽￣)~*" 
					:maxlength="100" style="width: 100%;height: 200rpx;box-sizing: border-box;" class="border rounded p-2"
					v-model="orderComment[index].content"/>
					<view class="position-absolute p-2" style="right: 5rpx; bottom: 5rpx;"
					:class="orderComment[index].content.length >= 100 ? 'text-danger' : 'text-light-muted'">
						{{orderComment[index].content.length}}/100
					</view>
				</view>
			</card-en>
			<divider-en />
		</view>
		<view class="p-3">
			<view class="rounded mian-bg-color text-white text-center font-md py-2"
			hover-class="main-bg-hover-color" @click="submit">
				提交
			</view>
		</view>
	</view>
</template>

<script>
	import cardEn from "@/components/common/card-en.vue"
	import {mapState} from "vuex"
	export default {
		components:{
			cardEn
		},
		data() {
			return {
				orderDetail:{},
				orderId:0,
				orderComment:[],
			}
		},
		methods: {
			submit(){
				console.log(JSON.stringify(this.orderComment));
				for(let i = 0; i < this.orderComment.length ;i++){
					if(!this.orderComment[i].isGoodComment){
						uni.showToast({
							title:'[' + this.orderDetail.orderItem[i].title + ']' + '的评价类型不能为空( ╯□╰ )',
							icon:'none'
						})
						return
					}
					if(!this.orderComment[i].content){
						uni.showToast({
							title:'[' + this.orderDetail.orderItem[i].title + ']' + '的评价内容不能为空( ╯□╰ )',
							icon:'none'
						})
						return
					}
						
				}
				//提交评论
				uni.showModal({
					content: '是否提交评论(提交后不能修改)',
					success: (res) => {
						if(res.confirm){
							uni.showLoading({
								title: '提交中=￣ω￣=',
								mask: true
							});
							this.$H.post("/submitComment",{
								order_id:this.orderId,
								user_id:this.user_id,
								orderComment:JSON.stringify(this.orderComment),
								name:this.name
								}).then(res =>{
									uni.hideLoading()
									uni.showToast({
										title:"评价成功",
									})
									setTimeout(()=>{
										uni.navigateBack({
											delta:1
										})
									},1000)
								}).catch(()=>{ 
									console.log('提交评论时出错')
							})
						}
					},
				});
			},
			__init(){
				//初始化要评论的商品
				this.$H.post("/getOrderDetail",{order_id:this.orderId}).then(res =>{
					this.orderDetail = res	
					//生成评论数组
					for(let i = 0;i < this.orderDetail.orderItem.length ;i++){
						let obj = {
							goods_id:this.orderDetail.orderItem[i].goods_id,
							isGoodComment:"",
							content:""
						}
						this.orderComment.push(obj)
					}
					console.log(JSON.stringify(this.orderComment));
					}).catch(()=>{ 
						console.log('初始化订单详情时出错')
				})
			},
			radioChange(e){
				let index = e.currentTarget.id;
				let value = e.target.value;
				this.orderComment[index].isGoodComment = value
			}
		},
		onLoad(e) {
			this.orderId = e.id
			this.__init()
		},
		computed:{
			...mapState({
				'user_id':state=>state.user.user_id,
				'name':state=>state.user.userInfo.name
			}),
		}
	}
</script>

<style>

</style>
