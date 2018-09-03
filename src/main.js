// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'lib-flexible'
import axios from "axios"
import infiniteScroll from 'vue-infinite-scroll'
import VueRouter from 'vue-router'

import List from './components/List'
import Detail from './components/Detail'
import DetailTwo from './components/DetailTwo'


//import Users from './components/Users'



Vue.use(infiniteScroll)
Vue.use(VueRouter)

const routes = [
	{path:"/",component:List,meta: {keepAlive: true }},
	{path:"/detail",component:Detail,meta: {keepAlive: false }},
	{path:"/detailTwo",component:DetailTwo,meta: {keepAlive: false }}
]

const router = new VueRouter({
	routes
	//mode:'history'
})


Vue.config.productionTip = false
Vue.prototype.$axios = axios

//全局注册组件
//Vue.component("users",Users)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
