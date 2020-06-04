export default {
	state:{
		list:[//数据格式
			// {
			// 	checked:false,
			// 	id:11,
			// 	title:"薄脆饼干",
			// 	pic:"../../static/images/detail/zhutu1.jpg",
			// 	pprice:19.9,
			// 	num:1,
			// 	minnum:1,
			// 	maxnum:10,//最大数量与库存有关
			// 	//选中商品属性
			// 	attrs:{
			// 		selected:0,
			// 		list:[
			// 			{ name:'海苔味'},
			// 			{ name:'原味'}
			// 		]
			// 	}
			// },
			//{...},{...}

		],
		//选中列表(存放选中的id)
		selectedList:[],
		
		//popup显示
		popupShow:"none",
		popupIndex:-1,
		total_price:0
	},
	getters:{
		//判断是否全选
		checkedAll:(state)=>{
			return state.list.length === state.selectedList.length
		},
		//合计
		totalPrice:(state)=>{
			var total = 0
			state.list.forEach(v=>{
				if(state.selectedList.indexOf(v.id) > -1){
					total += v.pprice*v.num
				}
			})
			state.total_price = total.toFixed(2)
			return state.total_price
		},
		finalPrice:(state)=>{
			if(state.total_price >= 100){
				return state.total_price;
			}else{
				return ((parseFloat(state.total_price) + 10).toFixed(2));
			}
		},
		//无商品时禁用底部合计控件
		disableSelectAll:(state)=>{
			if(state.list.length === 0){
				return false
			}
			return true
		},
		//初始化之后获得需要修改属性的商品
		popupData:(state)=>{
			return state.popupIndex > -1 ? state.list[state.popupIndex] : {}
		}
	},
	mutations:{
		//全选
		selectAll(state){
			state.selectedList = state.list.map(v=>{
				//设置选中状态
				v.checked = true
				return v.id
			})
		},
		//取消全选
		unSelectAll(state){
			state.list.forEach(v=>{
				v.checked = false
			})
			state.selectedList = []
		},
		//单选与取消单选
		selectItem(state,index){
			let id = state.list[index].id
			let i = state.selectedList.indexOf(id)
			if(i>-1){
				//如果选中则取消选中
				state.list[index].checked = false
				return state.selectedList.splice(i,1)
			}
			
			//选中
			state.list[index].checked = true
			state.selectedList.push(id)
		},
		//删除选中的商品
		deleteGoods(state){
			state.list = state.list.filter(v=>{
				return state.selectedList.indexOf(v.id) === -1
			})
		},
		//初始化popupIndex
		initPopupIndex(state,index){
			state.popupIndex = index
		},
		//加入购物车
		addGoodsToCart(state,goods){
			state.list.unshift(goods)
		},
		clearCart(state){
			state.list = []
		}
	},
	actions:{
		//全选
		doSelectAll({commit,getters}){
			getters.checkedAll ? commit('unSelectAll') : commit('selectAll')
		},
		//删除
		doDelectGoods({commit}){
			uni.showModal({
				content: '是否删除选中的商品',
				success:(res)=>{
					if (res.confirm) {
						commit('deleteGoods')
						commit('unSelectAll')
						uni.showToast({
							title:'已删除'
						});
					} 
				}
			});
		},
		//显示和隐藏弹出框
		doShowPopup({state,commit},index){
			commit('initPopupIndex',index)
			state.popupShow = 'show'
		},
		doHidePopup({state,commit}){
			state.popupShow = 'hide'
			setTimeout(()=>{
				state.popupShow = 'none'
				commit('initPopupIndex',-1)
			},200)
		}
	}
}