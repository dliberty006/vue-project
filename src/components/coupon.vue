<template>
	<div id="coupon">
		<div class="container-wrap">
			<ul class="container">
				<li @click="selectItem(index)" v-for="(item,index) in datas" :class="{'active':index == currentIndex}">{{item}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex :0,
				datas:['综合','女装','家居家装','数码家电','母婴','食品','鞋包配饰','美妆个护','男装','内衣','运动户外']
			}
		},
		methods: {
			selectItem:function(index) {
				this.currentIndex = index;
			}
		}
	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
	}
	 .container-wrap {
        width: 100%;
        height: 80px;
        white-space: nowrap;
        overflow: hidden;
        overflow-x: scroll;
        -webkit-backface-visibility: hidden;
        -webkit-perspective: 1000;
        -webkit-overflow-scrolling: touch;
        text-align: justify;
        border-bottom: 1px solid #ddd;
    }
     .container li {
     	list-style: none;
        display: inline-block;
        height: 80px;
        color: #333;
        text-align: center;
        line-height: 80px;
        padding: 0 40px;
        box-sizing: border-box;
    }
    .container li.active{
    	color: #FF3413;
    	border-bottom: 2px solid #FF3413;
    }
</style>