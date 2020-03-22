<template>
    <div>
        <!-- 模拟 -->

    
        <el-button type="primary" @click="play">模拟支付</el-button>
         <el-button type="primary" @click.prevent="cancel(id)">模拟支付</el-button>
        <!-- 支付页面 -->
        <!--  -->
    </div>
</template>
<script>
export default {    
    data(){
        return{
           id:'',     
        }
    },
    created(){

        console.log(this.$route.params.id);   
        this.id =this.$route.params.id;
    },
    methods:{
      async play(){

            
            const res =await this.$axios.post("/api/api/jwt/seckill/snapUpCheckout",{id:this.id});
            // const res =await this.$axios.post("/api/api/jwt/seckill/snapUpCheckout",{id:id})


        }
    }
}
</script>
<style scoped>

</style>