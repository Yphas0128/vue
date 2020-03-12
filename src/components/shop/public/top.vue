<template>
      <div class="head">
        <div class="head_in">
            <div class="top_shop_left">
                <ul class="ull">
                    <li><router-link to="/">商城官网</router-link></li>
                    <li>|</li>
                    <li><router-link to="/">联系方式</router-link></li>
                    <li>|</li>
                    <li><router-link to="/">关于我们</router-link></li>
                </ul>
            </div>
            <div class="top_shop_right">
                <ul class="ull">
                    <li v-show="!isLogin"><router-link to="/user/login">登录</router-link></li>
                    <li v-show="!isLogin"><router-link to="/user/register">注册</router-link></li>
                    <li v-show="isLogin">欢迎您，<router-link to="/user/index" style="color:#ca151e">{{user_info.nickname}}</router-link></li>
                    <li v-show="isLogin">|</li>
                    <li v-show="isLogin"><router-link to="/user/index" >个人中心</router-link></li>
                    <li v-show="isLogin">|</li>
                    <li v-show="isLogin">注销账号</li>
                    <li>|</li>
                    <li><router-link to="/store/join" style="color:#ca151e">商家入驻</router-link></li>
                    <li>|</li>
                    <li><router-link to="/">手机端</router-link></li>
                    <li>|</li>
                    <li><router-link to="/">APP下载</router-link></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
      return {
          isLogin:false,
          user_info:{},
      };
    },
}
</script>
<style>

.head{
    border-bottom: 1px solid #efefef;
    height: 30px;
    background: #f9f9f9;
    font-size: 12px;
    line-height: 30px;
}

   .top_shop_left{
          float: left;
   }
    .top_shop_left ul li{
        float: left;
        padding:0 10px;
    }
    .top_shop_right{
        float: right;
    }
    .top_shop_right  ul li{
        float: left;
        padding:0 5px;
    }
    .top_shop_right  li:hover{
              color:#ca151e;
    }
    .head_in:after{
      display: block;
      clear: both;
      content:'';
    }
    .head_in a:hover{
      color:#ca151e;
    }
    .ull{
        list-style:none
    }
</style>