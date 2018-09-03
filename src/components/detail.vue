<template>
    <div id="el">
			<div class="logo">
				<img :src="coupon.pict_url" />
			</div>
			<div class="content">
				<p class="title"><span v-if=" coupon.userType='1' ">天猫</span><span v-else>淘宝</span>{{coupon.title}}</p>
				<div class="fl">
					<p class="quan">
						<span class="quanmoney">
							<em>券</em>
							<strong  v-cloak>￥{{coupon.couponMoney}}</strong>
						</span>·
						<span class="quanhou">券后</span>
						<span class="biao">￥</span>
						<span class="price"  v-cloak>{{coupon.couponEdMoney}}</span>
						<em class="yuanjia"  v-cloak>原价￥{{coupon.zk_final_price}}</em>
					</p>
				</div>
			</div>
			<div class="tpwd" id="tpwd">
				<p  v-cloak>长按复制这条信息，{{coupon.couponTpwd}}<br/>打开【手机淘宝】即可查看</p>
			</div>
			<button @click="copy()" class="tag-read" :data-clipboard-text="'长按复制这条信息，'+coupon.couponTpwd+'打开【手机淘宝】即可查看'"  v-cloak>{{message}}</button>
	</div>
</template>

<script>
// import { 'taobaoUrl' } from "../api.js";
import Clipboard from 'clipboard';
export default {
    data() {
        return {
            coupon: [],
            message:'一键复制'
        }
  },
  methods:{
  	calcPrice(price,couponMoney){
  		return (price - couponMoney || 0).toFixed(2);
  	},
	copy() {
        var clipboard = new Clipboard('.tag-read')
        clipboard.on('success', e => {
          console.log('复制成功');
          this.message = '已复制，请打开手机淘宝';
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          console.log('该浏览器不支持自动复制');
	 		this.message = '复制失败,请长按红框内容复制';
          // 释放内存
          clipboard.destroy()
        })
      },
  },
  created(){
  		let id=this.$route.query.id
        let url = '/tb/tbksc/detail/' + id
        this.$axios.get(url)
		.then(response=> {
			this.coupon = response.data.detail;
		})
		.catch( error => {
			console.log(error);
		});
 
        
    }
}
</script>

<style scoped>
input,button,select,textarea{outline:none;}
#el{
	width: 750px;
}
.logo{
	width: 82%;
	margin: 30px auto;
}
.logo img{
	width: 100%;
}
.content{
	width: 92.67%;
	margin: 0 auto;
	overflow: hidden;
}
.title{
	font-size: 28px;
	color: #000;
	line-height: 48px;
}
.title span{
	color: red;
	padding: 0 20px;
	border: 1px solid red;
	border-radius: 12px;
	margin-right: 10px;
	background: #fffcfc;
}

.quan{
	height: 56px;
	line-height: 56px;
	padding-bottom: 5px;
}
.quan .quanmoney{
	border: 1px solid #ff3c3c;
	border-radius: 5px;
	font-size: 28px;
	display: inline-block;
    height: 48px;
    line-height: 48px;
	margin-right: 10px;
}
.quan .quanmoney em{
	font-style: normal;
	background: #ff3c3c;
	color: #fff;
	display: inline-block;
	padding: 0 10px;
}
.quan .quanmoney strong{
	color: #ff3c3c;
	display: inline-block;
	padding-right: 10px;
	font-weight: normal;
}
.quan .quanhou{
	color: #666;
	font-size: 28px;
}
.quan .biao{
	color: #ff3c3c;
	font-size: 28px;
}
.quan .price{
	color: #ff3c3c;
	font-size: 48px;
	font-weight: 600;
}
.quan .yuanjia{
	color: #666;
	font-size: 28px;
	text-decoration: line-through;
	padding-left: 10px;
}
.yishou{
	display: inline-block;
	background: #e8e8e8;
	color: #666;
	font-size: 28px;
	padding: 0 30px;
	height: 56px;
	line-height: 56px;
	border-radius: 28px;
}

.tpwd{
	clear: both;
	width: 92.67%;
	height: 102px;
	background: #fef7f7;
	border: 2px dashed #ff5f5f;
	margin: 30px auto;
	text-align: center;
}
.tpwd p {
	margin-top: 18px;
    font-size: 28px;
    color: #000;
    height: 76px;
}
button{
	width: 92.67%;
	background: #ff4c3c;
	color: #fff;
	text-align: center;
	height: 90px;
	line-height: 90px;
	border: none;
	font-size: 40px;
	border-radius: 45px;
	margin-left: 3.665%;
}

</style>
