export default{
	state:{
		//登录状态
		loginStatus:false,
		user_id:0,
		userInfo:{}
	},
	mutations:{
		//登录
		login(state,userInfo){
			state.userInfo = userInfo
			state.loginStatus = true
			state.user_id = userInfo.id
		},
		//退出登录
		logout(state){
			uni.showModal({
				content: '确定要退出登录吗?',
				success: res => {
					if(res.confirm){
						uni.reLaunch({
							url:"../login/login"
						})
						state.userInfo = {}
						state.loginStatus = false
						state.user_id = 0
					}
				},

			});

		}
	}
}