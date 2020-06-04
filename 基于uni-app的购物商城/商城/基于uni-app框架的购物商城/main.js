import Vue from 'vue'
import App from './App'
import store from './store'

Vue.prototype.$store = store

Vue.config.productionTip = false


// 引入全局组件

// 分割线
import dividerEn from "@/components/common/divider-en.vue"
Vue.component('divider-en',dividerEn)
//加载动画
import loadingPlus from "@/common/mixin/loading-plus.vue"
Vue.component('loading-plus',loadingPlus)

import $H from "@/common/lib/request.js"
Vue.prototype.$H = $H

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
