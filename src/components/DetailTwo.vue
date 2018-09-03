<template>
	<div id="DetailTwo">
		<div class="container">
			<div class="banner">
				<img :src="coupon.pict_url" alt="">
				<div class="back" @click="back">
					<i class="fa fa-angle-left"></i>
				</div>
			</div>
			<div class="title">
				<span v-if="coupon.user_type == '1'" style="background-color: #ff0039;">天猫</span>
				<span v-if="coupon.user_type == '0'">淘宝</span>
				<span>{{coupon.title}}</span>
			</div>
			
			<div class="coupon-box">
				<em class="coupon"><span>券</span><span><i class="fa fa-yen"></i>{{coupon.couponMoney}}</span></em>
				<em class="payable"><span>券后</span><span><i class="fa fa-yen"></i>{{coupon.couponEdMoney}}</span><span>现价<i class="fa fa-yen"></i>{{coupon.zk_final_price}}
                    <i class="line-through"></i></span></em>
				<em class="sales fr">月销量{{coupon.volume}}件</em>
			</div>
			
			
			<div class="entrance-psw">
				<p style="width: 70%;margin: 0 auto;">长按复制这条信息，{{coupon.couponTpwd}}<br/>打开【手机淘宝】即可查看</p>
			</div>
			<div class="product-list">
				<div class="details">
					<div class="details-title" style="display: none;">
						<span>商品图文详情</span>
						<span>(点击展开)</span>
						<i class="fa fa-angle-right fr"></i>
					</div>
					<div class="details-main">

					</div>
					<div class="recommend">
						<h1 class="recommend-title"><i class="fa fa-heart-o"></i>猜您喜欢</h1>
						<div class="recommend-list clearfix">
							<div class="commodity">
								<img src="../assets/list_05.jpg" alt="">
								<em class="commodity-title"><span>淘宝</span><span>2018新款太阳镜 女王2018新款太阳镜 女王2018新款太阳镜 女王</span></em>
								<div class="arch-box">
									<em class="arch"><span>券</span><span><i class="fa fa-yen"></i>50</span></em>
									<em class="arched"><span>券后</span><span><i class="fa fa-yen"></i>48.00</span></em>
								</div>

							</div>
							<div class="commodity">
								<img src="../assets/list_05.jpg" alt="">
								<em class="commodity-title"><span>淘宝</span><span>2018新款太阳镜 女王2018新款太阳镜 女王2018新款太阳镜 女王</span></em>
								<div class="arch-box">
									<em class="arch"><span>券</span><span><i class="fa fa-yen"></i>50</span></em>
									<em class="arched"><span>券后</span><span><i class="fa fa-yen"></i>48.00</span></em>
								</div>

							</div>
							<div class="commodity">
								<img src="../assets/list_05.jpg" alt="">
								<em class="commodity-title"><span>淘宝</span><span>2018新款太阳镜 女王2018新款太阳镜 女王2018新款太阳镜 女王</span></em>
								<div class="arch-box">
									<em class="arch"><span>券</span><span><i class="fa fa-yen"></i>50</span></em>
									<em class="arched"><span>券后</span><span><i class="fa fa-yen"></i>48.00</span></em>
								</div>

							</div>
							<div class="commodity">
								<img src="../assets/list_05.jpg" alt="">
								<em class="commodity-title"><span>淘宝</span><span>2018新款太阳镜 女王2018新款太阳镜 女王2018新款太阳镜 女王</span></em>
								<div class="arch-box">
									<em class="arch"><span>券</span><span><i class="fa fa-yen"></i>50</span></em>
									<em class="arched"><span>券后</span><span><i class="fa fa-yen"></i>48.00</span></em>
								</div>

							</div>
							<div class="commodity">
								<img src="../assets/list_05.jpg" alt="">
								<em class="commodity-title"><span>淘宝</span><span>2018新款太阳镜 女王2018新款太阳镜 女王2018新款太阳镜 女王</span></em>
								<div class="arch-box">
									<em class="arch"><span>券</span><span><i class="fa fa-yen"></i>50</span></em>
									<em class="arched"><span>券后</span><span><i class="fa fa-yen"></i>48.00</span></em>
								</div>

							</div>
							<div class="commodity">
								<img src="../assets/list_05.jpg" alt="">
								<em class="commodity-title"><span>淘宝</span><span>2018新款太阳镜 女王2018新款太阳镜 女王2018新款太阳镜 女王</span></em>
								<div class="arch-box">
									<em class="arch"><span>券</span><span><i class="fa fa-yen"></i>50</span></em>
									<em class="arched"><span>券后</span><span><i class="fa fa-yen"></i>48.00</span></em>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import { 'taobaoUrl' } from "../api.js";
	import '../assets/font-awesome/css/font-awesome.min.css'
	import Clipboard from 'clipboard';
	export default {
		data() {
			return {
				coupon: [],
				message: '一键复制'
			}
		},
		methods: {
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
			back(){
				this.$router.go(-1);
			}
		},
		created(){
	  		let id=this.$route.query.id
	        // 这样会有跨域问题
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
@charset "UTF-8";
*,::before,::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-size: 14px;
  font-family: 'Microsoft YaHei', sans-serif;
  background-color: #fff;
  height: 1500px;
}
* {
  outline: none;
  -webkit-tap-highlight-color: transparent;
}
a {
  color: #333;
  text-decoration: none;
}
ul,
ol {
  list-style: none;
}
input[type="text"],
input[type="search"],
textarea {
  border: none;
  outline: none;
  resize: none;
  -webkit-appearance: none;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clearfix::before,
.clearfix::after {
  content: "";
  display: block;
  visibility: hidden;
  height: 0;
  line-height: 0;
  clear: both;
}
img {
  display: block;
  width: 100%;
}
em{
  font-style: normal;
}
.container {
    width: 750px;
    margin: 0 auto;
}

.banner {
    position: relative;
}

.banner>img {
    width: 750px;
    height: 751px;
}

.back {
    position: absolute;
    top: 25px;
    left: 10px;
    width: 62px;
    height: 62px;
    text-align: center;
    border-radius: 50%;
    background: rgba(0, 0, 0, .3);
}

.back i {
    color: #fff;
    font-size: 50px;
    line-height: 62px;
}

.title {
    margin: 25px 10px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
}

.title span:nth-child(1) {
    font-size: 18px;
    color: #FFF;
    background-color: #fe7600;
    padding: 1px 3px;
    border-radius: 4px;
}

.title span:nth-child(2) {
    font-size: 28px;
    color: #000;
    letter-spacing: 1px;
    vertical-align: middle;
}

.coupon-box {
    margin: 25px 10px;
    font-size: 22px;
}

.coupon-box .coupon {
    border: 2px solid #ff3413;
    border-radius: 5px;
    color: #ff3413;
}

.coupon-box .coupon span:nth-child(1) {
    color: #FFF;
    background-color: #ff3413;
    padding: 1px 3px;
}
.coupon-box .coupon span:nth-child(2) {
    padding: 0 10px;
}

.coupon-box .payable {
    color: #666666;
    margin-left: 20px;
}

.coupon-box .payable span:nth-child(2) {
    margin-left: 10px;
    color: #ff3413;
    font-size: 36px;
}

.coupon-box .payable span:nth-child(2) i {
    font-size: 22px;
    padding-right: 5px;
}

.coupon-box .payable span:nth-child(3) {
    position: relative;
    padding-left: 15px;
}

.coupon-box .payable span:nth-child(3) .fa.fa-yen {
    padding-left: 10px;
}

.coupon-box .payable span:nth-child(3) .line-through {
    width: 100%;
    height: 1px;
    background-color: #666666;
    position: absolute;
    top: 50%;
    left: 7px;
}

.coupon-box .sales {
    line-height: 46px;
    color: #666666;
}

.entrance-psw {
    margin: 10px 10px 20px 10px;
    border: 1px #ffa89a dashed;
    text-align: center;
    background-color: #fff7f6;
}

.entrance-psw p {
    line-height: 36px;
    font-size: 22px;
    color: #444;
    padding: 10px 0;
}

.product-list {
    background-color: #f3f3f3;
    border-top: 1px solid #dad9d9;
}

.details-title {
    margin-top: 20px;
    width: 100%;
    height: 70px;
    background-color: #fff;
    text-indent: 15px;
    font-size: 28px;
    line-height: 70px;
    border-top: 1px solid #dad9d9;
    border-bottom: 1px solid #dad9d9;
}

.details-title span:nth-child(2) {
    color: #0978f5;
    cursor: pointer;
}

.details-title i::before {
    cursor: pointer;
    margin-right: 10px;
    font-size: 50px;
    line-height: 70px;
}

.details-main {
    width: 100%;
    background-color: red;
    height: 200px;
    display: none;
}

.recommend-title {
    height: 60px;
    text-align: center;
    color: #666666;
    line-height: 60px;
    letter-spacing: 2px;
    font-weight: normal;
}

.recommend-title i {
    color: #ff3413;
    padding-right: 5px;
}

.recommend-list {
    background-color: #fff;
    margin: 10px;
}

.recommend-list .commodity {
    padding: 10px;
    width: 50%;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.recommend-list .commodity img {
    width: 100%;
    margin-bottom: 15px;
}

.recommend-list .commodity .commodity-title {
    font-size: 24px;
    display: inline-block;
    margin-bottom: 10px;
}

.recommend-list .commodity .commodity-title span:nth-child(1) {
    font-size: 18px;
    color: #ffffff;
    background-color: #fe7600;
    padding: 0px 3px;
    border-radius: 5px;
}

.recommend-list .commodity .commodity-title span:nth-child(2) {
    vertical-align: middle;
    padding-left: 5px;
}

.arch {
    width: 100px;
    height: 28px;
    border: 2px solid #ff9685;
    position: relative;
    margin-top: 8px;
    line-height: 28px;
    font-size: 20px;
    color: #ff3413;
}

.arch::before {
    content: '';
    width: 7px;
    height: 14px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: -2px;
    transform: translateY(-50%);
    border: 2px solid #ff9685;
    border-left: none;
    border-radius: 0 7px 7px 0;
    z-index: 1;
}

.arch::after {
    content: '';
    width: 7px;
    height: 14px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    right: -2px;
    transform: translateY(-50%);
    border: 2px solid #ff9685;
    border-right: none;
    border-radius: 7px 0 0 7px;
    z-index: 1;
}

.arch span:nth-child(1) {
    display: inline-block;
    height: 20px;
    margin-top: 4px;
    width: 35%;
    text-align: center;
    border-right: 1px #ff9685 dashed;
    line-height: 20px;
}

.arch span:nth-child(2) {
    display: inline-block;
    height: 100%;
    text-align: center;
    width: 65px;
}

.arched span {
    line-height: 45px;
    font-size: 18px;
    color: #666;
}

.arched span:nth-child(2) {
    font-size: 28px;
    color: #fe7600;
}

.arched span:nth-child(2) i {
    font-size: 18px;
    color: #fe7600;
    padding: 0 5px;
}

.arch-box {
    display: flex;
    justify-content: space-between;
    height: 45px;
}

</style>