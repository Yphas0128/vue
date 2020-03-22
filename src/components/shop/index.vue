<template>
    <div>
        <v-banner :list="banner_list"></v-banner><!--轮播图-->
        <div class="store_body">
                <v-product></v-product>
        </div>
    </div>
</template>
<script>
import vProduct from "@/components/shop/product.vue"
import vBanner from "@/components/shop/public/banner.vue"
export default {
    data(){
        return{
            banner_list:[],  
        }
    },
    components:{
        vBanner,
        vProduct
    },
    created(){
     this.getimgs();
    },
    methods:{
        async getimgs(){
            const res = await this.$axios.post('/api/api/jwt/adv/getadv');
            this.banner_list = res.data.data;   
        }
    }
}
</script>
<style >
.store_body{
    padding: 50px 0;
    background: #fff;
}
</style>