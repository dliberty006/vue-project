<template>
  <div class="list">
    <header>
    	<div class="s_input">
	    		<img class="ngv" src="../assets/ngv.png" />
	    		<img class="search" src="../assets/search.png" />
	    		<img class="cha" @click="clearKeyWord()" src="../assets/x.png" />
	    		<div class="ss" @click="searchInput">搜索</div>
	    		<input  type="search"  v-model="keywords" @keyup.enter="searchInput" id="myInput" />
    	</div>
    	<div class="nav">
    		<ul>
    			<li :class="sortZh ? 'active' : ''" @click="clickZh">综合排序</li>
    			<li @click="clickPrice">价格
    				<img class="top" src="../assets/bottom_a.png" v-if="sortPrice == 'desc'">
    				<img class="top" src="../assets/top_a.png" v-else-if="sortPrice == 'asc'">
    				<img class="top" src="../assets/top.png" v-else>
    			</li>
    			<li @click="clickXl">销量
    				<img class="top" src="../assets/bottom_a.png" v-if="sortXl == 'desc'">
    				<img class="top" src="../assets/top_a.png" v-else-if="sortXl == 'asc'">
    				<img class="top" src="../assets/top.png" v-else>
    			</li>
    			<li @click="clickSx" v-if="!showSx">筛选<img class="shai" src="../assets/shai.png"></li>
    			<li @click="clickSx" class="active" v-else>筛选<img class="shai" src="../assets/shai_a.png"></li>
    		</ul>
    	</div>
    </header>
    <div class="coupon_select" v-if="hasCoupon">
			<span @click="deleteCoupon">只看有券<em>X</em></span>
		</div>
    <div :class="hasCoupon ? 'content content2' : 'content'">
    	<div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    	<ul>
    		<li v-for="item in optional">
    			<router-link :to="'/detail?id=' + item.num_iid">
    			<div class="fl">
    				<img :src="item.pict_url"  />
    			</div>
    			<div class="fr">
    				<p class="t">
    					<img class="user_type" src="../assets/tb.png" v-if="item.user_type == '0'" />
    					<img class="user_type" src="../assets/tm.png" v-if="item.user_type == '1'" />
    					<span>{{item.title}}</span>
    				</p>
    				<div class="q">
    					<div class="left"><img src="../assets/q.png"><span>￥{{item.couponMoney}}</span></div>
    					<div class="right">月销量{{item.volume}}件</div>
    				</div>
    				<div class="jg">
    					<span class="qh">券后</span>
    					<span class="qhb">￥</span>
    					<span class="qhj">{{item.couponEdMoney}}</span>
    					<span class="xj">现价 ￥{{item.zk_final_price}}</span>
    				</div>
    				<div class="lq">
    					<span class='dp'>{{item.shop_title}}</span>
    					<img src="../assets/lq.png" />
    				</div>
    			</div>
    				</router-link>
    		</li>
    	
    	</ul>
    	
    	</div>
    </div>
    <p v-show="isLoadding" class="loadding">加载中...</p>
    <p v-show="loaddingEnd" class="loadding">没有更多数据</p>
    <div class="zhe" v-show="showSx"></div>
		<div class="screen" v-show="showSx">
			<div class="screen_item" @click="clickCoupon">
				<p class="zi fl coupon" v-if="hasCoupon">只看有券</p>
				<p class="zi fl" v-else>只看有券</p>
				<p class="mark fr" v-show="hasCoupon">√</p>
			</div>
		</div>
  </div>
  
</template>

<script>
	

export default {
  name: 'list',
  data () {
    return {
      keywords:"",
      focusStatus:false,
      optional:[],
      busy: false,
      isLoadding:false,
      loaddingEnd:false,
      pageNo:0,
      pageSize:20,
      sortZh:true,
      sortPrice:'',
      sortXl:'',
      sortSx:'',
      disableClick:false,
      sort:'',
      showSx:false,
      hasCoupon:false
    }
  },
  created(){
  		let q=this.$route.query.q;
  		if (q != '' && q!= undefined) {
  			this.keywords = q;
  		} else {
  			this.keywords = '女装';
  		}
			
    },
  methods:{
  	clearKeyWord:function(){
  		this.keywords = "";
  	},
  	search:function(){
  		if (this.pageNo == 1) {
  			this.optional = [];
  		}
  		this.loaddingEnd = false;
  		this.isLoadding = true;
  		this.$axios.get("/tb/tbksc/list",{
			 	params:{
			 		"q":this.keywords,
			 		"pageNo":this.pageNo,
			 		"sort":this.sort,
			 		"hasCoupon":this.hasCoupon
			 	}
			 }).then(res=>{
			 	if (res.data.optional == undefined || res.data.optional == null) {
			  	this.loaddingEnd = true;
			  	this.busy = true;
			  } else {
			  	 this.optional = this.optional.concat(res.data.optional.map_data);
			  	this.busy = false;
			  }
			 this.isLoadding = false;
			 this.disableClick = false;
			 });
  	},
  	loadMore: function() {
      this.busy = true;
			this.pageNo ++;
     //官方示例中延迟了1秒，防止滚动条滚动时的频繁请求数据
      setTimeout(() => {
        //这里请求接口去拿数据，实际应该是调用一个请求数据的方法
        this.search();
      }, 1000);
    },
    searchInput:function(){
    	var input = document.getElementById("myInput");
  		if (input) {
  			input.blur();	
  		}
  		this.pageNo = 1;
  		this.search();
    },
    clickZh:function(){
    	if (this.disableClick) {
    		return;
    	}
    	this.sort = '';
    	this.disableClick = true;
    	this.sortZh = true;
    	this.sortPrice = "";
    	this.sortXl = "";
    	this.pageNo = 1;
  		this.search();
    },
    clickPrice:function(){
    	if (this.disableClick) {
    		return;
    	}
    	this.disableClick = true;
    	this.sortZh = false;
    	this.sortXl = "";
    	if (this.sortPrice == '' || this.sortPrice == 'asc') {
    		this.sort = 'price_des';
    		this.sortPrice = "desc";
    	} else {
    		this.sort = 'price_asc';
    		this.sortPrice = "asc";
    	}
    	this.pageNo = 1;
  		this.search();
    },
    clickXl:function(){
    	if (this.disableClick) {
    		return;
    	}
    	this.disableClick = true;
    	this.sortZh = false;
    	this.sortPrice = "";
    	if (this.sortXl == '' || this.sortXl == 'asc') {
    		this.sort = 'total_sales_des';
    		this.sortXl = "desc";
    	} else {
    		this.sort = 'total_sales_asc';
    		this.sortXl = "asc";
    	}
    	this.pageNo = 1;
  		this.search();
    },
    clickSx:function(){
    	this.showSx = !this.showSx;
    },
    clickCoupon:function(){
    	this.showSx = !this.showSx;
    	this.hasCoupon = !this.hasCoupon;
    	this.searchInput();
    },
    deleteCoupon:function(){
    	this.hasCoupon = false;
    	this.searchInput();
    }
  }
}
</script>
<style scoped>
	header{
		width: 750px;
		height: 193px;
		background: #f2f2f2;
		border-bottom: 1px solid #F2F2F2;
		margin: 0 auto;
		position: fixed;
    top: 0;
    margin: 0;
    z-index: 999;
	}

	header .s_input{
		width: 100%;
		height: 81px;
		position: relative;
		margin: 34px auto 22px auto;
	}
	header .ngv{
		position: absolute;
		top: 25%;
		left: 3.3%;
		width: 40px;
	}
	header .search{
		position: absolute;
		top: 25%;
		left: 15.3%;
		width: 38px;
		height: 38px;
	}
	header .cha{
		position: absolute;
		top: 30%;
		right: 176px;
		width: 30px;
	}
	header .ss{
		width: 126px;
		height: 80px;
		line-height: 80px;
		background-color: #f14d38;
		color: #fff;
		font-size: 36px;
		position: absolute;
		top: 0;
		right: 37px;
		text-align: center;
		border-top-right-radius: 40px;
		border-bottom-right-radius: 40px;
	}
	header input{
		width: 83%;
		margin-left:12.27%;
		border: 2px solid #ec4c2c;
		display: inline-block;
		outline:none;
		font-size: 30px;
		color: #666;
		padding-left: 70px;
		height: 80px;
		line-height: 80px;
		border-radius: 40px;
		background: #fff ;
		-webkit-appearance: none;
	}
	input[type="search"]::-webkit-search-cancel-button{
    display: none;
	}
	header .nav{
		width: 100%;
		height: 58px;
		position: relative;
	}
	header .nav ul {
		margin-left: 20px;
	}
	header .nav ul li {
		float: left;
		height: 58px;
		line-height: 58px;
		font-size: 28px;
		padding: 0 8px;
		margin-right: 105px;
		position: relative;
	}
	header .nav ul li:last-child{
		margin-right: 0;
	}
	header .nav ul li.active{
		color: #ff3413;
		border-bottom: 2px solid #ff3413;
	}
	header .nav ul li .top{
		width: 10px;
		height: 16px;
		position: absolute;
		top: 22px;
		right: -10px;
	}
	header .nav ul li .shai{
		width: 25px;
		height: 21px;
		position: absolute;
		top: 20px;
		right: -20px;
	}
.coupon_select{
		width: 100%;
		height: 69px;
		line-height: 69px;
		border-bottom: 1px solid #ddd;
		background: #fff;
		position: fixed;
		top: 193px;
		left: 0;
		z-index: 999;
	}
.coupon_select span {
		margin-left: 30px;
		font-size: 24px;
		color: #333333;
		background: #f2f2f2;
		border-radius: 10px;
		padding: 5px 20px;
	}
.coupon_select span em {
		font-style: normal;
		padding-left: 10px;
	}
	.content{
		background-color: #fff;
		margin-top: 193px;
	}
	.content2{
		margin-top: 262px;
	}

	.content ul{
		width: 714px;
		margin: 0 auto;
	}
	.content ul li{
		width: 100%;
		height: 308px;
		border-bottom: 1px solid #ddd;
	}
	.content ul li .fl{
		width: 276px;
	}
	.content ul li .fl img{
		width: 256px;
		height: 253px;
		margin-top: 25px;
		border-radius: 12px;
	}

	.content ul li .fr{
		width: 438px;
		margin-top: 25px;
	}
	.content ul li .fr p {
		position: relative;
		font-size: 28px;
		line-height: 36px;
		color: #010101;
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box;
		-webkit-line-clamp:2;
		/*! autoprefixer: off */
		-webkit-box-orient: vertical;
		/* autoprefixer: on */
	}
	.content ul li .fr p .user_type{
		width: 39px;
		height: 21px;
		position: absolute;
		top: 5px;
		left: 0;
	}
	.content ul li .fr p span{
		margin-left: 45px;
	}
	.content ul li .fr .q{
		margin-top: 20px;
		overflow: hidden;
	}
	.content ul li .fr .q .left{
		width: 50%;
		position: relative;
	}
	.content ul li .fr .q .left img{
		width: 128px;
		height: 35px;
	}
		.content ul li .fr .q .left span{
		font-size: 22px;
		color: #ff3413;
		position: absolute;
		top: 4px;
		left: 50px;
	}
	.content ul li .fr .q .right{
		width: 50%;
		color: #666;
		font-size: 22px;
		height: 36px;
		line-height: 36px;
		text-align: right;
	}
	.content ul li .fr .jg{
		margin-top: 20px;
		clear: both;
	}
	.content ul li .fr .jg .qh{
		color: #666;
		font-size: 22px;
	}
	.content ul li .fr .jg .qhb{
		color: #ff3413;
		font-size: 22px;
	}
	.content ul li .fr .jg .qhj{
		color: #ff3413;
		font-size: 36px;
	}
	.content ul li .fr .jg .xj{
		color: #666;
		font-size: 22px;
		margin-left: 31px;
		text-decoration: line-through;
	}
	.content ul li .fr .lq{
		height: 34px;
		line-height: 34px;
		margin-top: 20px;
		position: relative;
	}
	.content ul li .fr .lq span{
		display: inline-block;
		color: #666;
		font-size: 20px;
		height: 28px;
		line-height: 28px;
		padding: 0 12px;
		background: #f1f1f1;
		border-radius: 14px;
	}
	.content ul li .fr .lq img{
		width: 126px;
		height: 34px;
		position: absolute;
		top: 0;
		right: 0;
	}
.loadding{
	text-align: center;
	font-size: 24px;
	height: 36px;
	line-height: 36px;
	margin: 10px auto;
}
.zhe{
		width: 100%;
		height: 100%;
		position: fixed;
		background: #000000;
		top: 0;
		left: 0;
		z-index: 998;
		opacity: 0.3;
	}
.screen{
		position: fixed;
		top: 193px;
		left: 0;
		width: 100%;
		height: 150px;
		background: #fff;
		z-index: 999;
	}
.screen	.screen_item{
	width: 100%;
	height: 80px;
	line-height:80px;
}
.screen p{
		width: 45%;
		font-size: 28px;
	}
.screen .zi{
		text-align: left;
		padding-left: 30px;
	}
.screen .mark{
		text-align: right;
		padding-right: 12px;
		color: #ff3413;
	}
.screen .coupon{
		color: #ff3413;
	}

	
</style>
