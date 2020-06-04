export default{
	state:{
		list:[]
	},
	getters:{
		//获取默认地址
		defaultAddress:(state)=>{
			return state.list.filter(v=>v.isDefault)
		}
	},
	mutations:{
		//初始化收货地址
		initAddress(state,list){
			state.list = list
		},
		//创建收货地址的方法
		createAddress(state,item){
			state.list.unshift(item)
			console.log(JSON.stringify(state.list));
		},
		//删除收货地址的方法
		deleteAddress(state,index){
			state.list.splice(index,1)
		},
		//修改收货地址的方法
		updateAddress(state,{index,item}){
			for (let key in item) {
				state.list[index][key] = item[key]
			}
			console.log(JSON.stringify(state.list));
		},
		//只能有一个默认地址
		removeDafault(state){
			state.list.forEach((v)=>{
				if(v.isDefault){
					v.isDefault = 0
				}
			})
		},
	},
	actions:{
		//修改收货地址的总事件(包括默认地址的处理)
		updateAddressAction({commit},obj){
			if(obj.item.isDefault){
				commit('removeDafault');
			}
			commit('updateAddress',obj);
		},
		//创建收货地址的总事件(包括默认地址的处理)
		createAddressAction({commit},item){
			if(item.isDefault){
				commit('removeDafault');
			}
			commit('createAddress',item);
		}
	}
}