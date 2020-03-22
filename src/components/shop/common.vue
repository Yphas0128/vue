<template>
        <div class="shops">
            <div class="shop_head">
                <v-top></v-top> 
                <v-head></v-head>
                <v-chat></v-chat>
            </div>
            <div class="shop_body">
                   <router-view></router-view>
            </div>
         
            
            <!-- <div class="sbody">
                <router-view></router-view>
            </div> -->
        </div>
</template>
<script>
import vTop from "@/components/shop/public/top.vue"
import vHead from "@/components/shop/public/header.vue"
import vChat  from "@/components/chat/index.vue"
export default {
    data(){
        return{
            banner_list:[],   
        }
    },
    components:{
        vTop,
        vHead,
        vChat,
    },
    created(){
        this.getimgs();
    },
    methods:{
        async getimgs(){
            const res = await this.$axios.post('/api/api/jwt/adv/getadv');
            this.banner_list = res.data.data;
            console.log(res);
            
        }
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
.shop_body{
    margin-top: 230px;
    z-index: 666;
    position: fixed;
    background: #fff;
    left:0;
    right: 0;
}
.shops{
    /* width: auto;
    height: 100%;
    padding: 10px;
    overflow-y: scroll;
    -webkit-box-sizing: border-box;
    box-sizing: border-box; */
}

</style>