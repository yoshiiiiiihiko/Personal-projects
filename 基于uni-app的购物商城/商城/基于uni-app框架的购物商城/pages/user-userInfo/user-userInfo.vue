<template>
	<view>
		<divider-en />
		<uni-list-item title="用户名" @click="openEdit(1)">
			<block slot="right">
				{{userInfo.name}} <text class="iconfont icon-you text-light-muted ml-2"></text>
			</block>
		</uni-list-item>
		<uni-list-item title="性别" @click="openEdit(2)">
			<block slot="right">
				{{userInfo.sex}} <text class="iconfont icon-you text-light-muted ml-2"></text>
			</block>
		</uni-list-item>
		<uni-list-item title="生日" @click="openEdit(3)">
			<block slot="right">
				{{userInfo.birthday}} <text class="iconfont icon-you text-light-muted ml-2"></text>
			</block>
		</uni-list-item>
		<uni-list-item title="手机号码" @click="openEdit(5)">
			<block slot="right">
				{{userInfo.phone}} <text class="iconfont icon-you text-light-muted ml-2"></text>
			</block>
		</uni-list-item>
		<uni-list-item title="邮箱" @click="openEdit(4)">
			<block slot="right">
				{{userInfo.email}} <text class="iconfont icon-you text-light-muted ml-2"></text>
			</block>
		</uni-list-item>
		<divider-en />
		<uni-list-item title="修改密码" @click="openEdit(6)">
			<block slot="right">
				<text class="iconfont icon-you text-light-muted ml-2"></text>
			</block>
		</uni-list-item>	
	</view>
</template>

<script>
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	import {mapState} from "vuex"
	export default {
		components:{
			uniListItem
		},
		data() {
			return {
				
			}
		},
		computed:{
			...mapState({
				'userInfo':state=>state.user.userInfo
			})
		},
		methods: {
			openEdit(e){
				uni.navigateTo({
					url: '../user-userInfo-edit/user-userInfo-edit?type='+e
				});
			}
		}
	}
</script>

<style>

</style>
