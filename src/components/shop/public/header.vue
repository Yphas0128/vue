<template>
    <div  class="center_top width_center_1200" v-show="center_top">
        <div class="shop_top_seach float_left">
            <ul>
                <li><input class="search_input" v-model="keywords" type="text" placeholder="手机 笔记本电脑 衣服"></li>
                <li><button class="search_button" type="button" @click="search()"><i class="icon iconfont">&#xeba0;</i></button></li>
                <li>
                    <div class="index_my_car">
                        <span @click="to_my_store()">我的商城<i class="icon iconfont">&#xe654;</i></span>
                        <span><router-link to="/cart/index">我的购物车<i class="icon iconfont">&#xe602;</i></router-link><div class="shop_car_dot">{{cart_count}}</div></span>
                    </div>
                </li>
            </ul>
        </div>

                <!-- nav -->
                <div class="shop_top_nav">
            <div class="width_center_1200">
                <div class="shop_top_nav_left" @mouseover="subnav_show?subnav:subnav=true" @mouseleave="subnav_show?subnav:subnav=false">
                    全部商品
                    <transition name="el-zoom-in-top"></transition>
                </div>
                <div class="shop_top_nav_right">
                    <ul>
                        <li>
                            <router-link to="/">首页</router-link>
                        </li>
                        <li>
                            <router-link to="/shop/seckill">秒杀</router-link>
                        </li>
                        <li>
                            <router-link to="/shop/list">拼团</router-link>
                        </li>
                        <li>
                            <router-link to="/shop/integral">积分商城</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data(){
        return{
          subnav:true,
          keywords:'',
          cart_count:0,
          center_top:true,
        }
    },
    methods:{

    },
    props: {
        subnav_show:{
            type:Boolean,
            default:true,
        },
        change_color:{
            type:Boolean,
            default:false,
        },
        cart_change:{
            type:Number,
        }
    },
}
</script>
<style>
    .shop_top_nav{
        height: 40px;
        background:#333;
        font-size: 14px;
        line-height: 40px;
        color:#fff;
    }
    .shop_top_nav_left{
        float: left;
        width: 240px;
        background:#ca151e;
        box-sizing: border-box;
        padding-left: 15px;
        position: relative;
    }
    .shop_top_nav_right{
        padding-left: 20px;
        float: left;
    }
    .shop_top_nav_right ul{
           list-style:none
    }
    .shop_top_nav_right ul li{
            float: left;
    }
    .shop_top_nav_right    ul li a{
            line-height: 40px;
            padding:0 30px;
            color:#fff;
            display: block;
        }
    .shop_top_nav_right  ul li a:hover{
            background: #000;
        }
    .width_center_1200{
        width: 100%;
        margin: 0 auto;
     
    }
    .shop_logo{
        margin-top: 10px;
        margin-bottom: 10px;
        float: left;
    }


    .shop_top_seach{
        margin-top: 44px;
        margin-left: 400px;
        min-height: 100px;
    
    
    }
    .shop_top_seach ul{
           list-style:none
    }
    .shop_top_seach ul li{
        float: left;
    }
    .search_input{
        width: 434px;
        height: 38px;
        padding: 10px;
        outline: 0;
        border: 1px solid #efefef;
        border-right: none;
        float: left;
        box-sizing: border-box;
        font-size: 12px;
    }
    .search_button{
        border: 1px solid #efefef;
        float: left;
        width: 38px;
        height: 38px;
        background: #fff;
        outline: 0;
        text-align: center;
    }
    .search_button:hover{
        color:#fff;
        background:#333;
    }
    .index_my_car{
        height: 38px;
        border: 1px solid #efefef;
        margin-left: 30px;
        box-sizing: border-box;
        font-size: 12px;
        line-height: 38px;
        padding: 0 20px;
    }
    .index_my_car span:hover{
        color:#ca151e;
    }
    .index_my_car .shop_car_dot {
        position: absolute;
        top: -24px;
        line-height: 16px;
        background: #ca151e;
        padding: 0 4px;
        color: #fff;
        border-radius: 4px;
        right: -10px;
    }
    .index_my_car  span{
        margin-right: 20px;
           position: relative;
    }
    .index_my_car span i{
        font-size: 13px;
        margin-left: 6px;
    }
</style>