<template>
  <div id="app">
  	
		<keep-alive>
		    <router-view v-if="$route.meta.keepAlive">
		    </router-view>
		</keep-alive>

		<router-view v-if="!$route.meta.keepAlive">
		</router-view>

  </div>
</template>

<script>

//局部注册组件

import List from './components/List'


export default {
  name: 'App',
  components:{
  	"app-list":List
  }
}
</script>
<style>
	*{margin: 0;padding: 0;}
	a{text-decoration: none;}
	ul{list-style: none;}
	.fl,.left{float: left;}
	.fr,.right{float: right;}
</style>

