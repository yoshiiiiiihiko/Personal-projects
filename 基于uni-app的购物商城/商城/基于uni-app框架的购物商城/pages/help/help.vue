<template>
	<view class="p-3">
		<view v-for="(item,index) in msg" :key="index">
			<view class="main-text-color font-md">
				{{item.q}}
			</view>
			<text class="text-light-muted">{{item.a}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg:[
					{
						q:"1.这是正品吗?",
						a:"肯定啦。"
					},
					{
						q:"2.忘记密码怎么办?",
						a:"请联系管理员。"
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
