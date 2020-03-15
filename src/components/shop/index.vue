<template>
    <div>
        <div class="wrapper">
            <div class="shop_head">
                <v-top></v-top> 
                <v-head></v-head>
                <v-chat></v-chat>
            </div>
            <div><v-banner :list="banner_list"></v-banner></div>
        </div>
    </div>
</template>
<script>
import vTop from "@/components/shop/public/top.vue"
import vHead from "@/components/shop/public/header.vue"
import vBanner from "@/components/shop/public/banner.vue"
import vChat  from "@/components/chat/index.vue"
export default {
    data(){
        return{
            banner_list:[
               // {path:require("@/assets/img/login-bg.jpg")},
               // {path:require("@/assets/img/logo.jpg")}
            ],  // 幻灯片    
        }
    },
    components:{
        vTop,
        vHead,
        vBanner,
        vChat,
        
    },
    created(){

    }
   
}
</script>
<style>
.shop_head{
    z-index: 666;
    position: fixed;
    background: #fff;
    left:0;
    right: 0;
}
</style>