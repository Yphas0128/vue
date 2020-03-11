<template>
    <div class="container">
        <div class="handle-box">
                <div class="admin_main_block_top">
                    <div class="admin_main_block_left">
                        <div>角色编辑</div>
                    </div>
                    <div class="admin_main_block_right">
                        <div><el-button icon="el-icon-back" size="mini" @click="$router.go(-1)">返回</el-button></div>
                    </div>
               </div>
                <el-form  label-width="100px" >
                    <el-form-item class="width_auto">
                        <div class="div_apis" v-for="(v,k) in info" :key="k" >
                            <el-checkbox style="float:left" v-model="hooks" :label="v.id" border>{{v.name}}</el-checkbox>
                            <div class="apis"><el-tag type="info">{{v.apis}}</el-tag></div>
                            <div class="content"><el-tag type="info">{{v.content}}</el-tag></div>
                        </div>
                        
                    </el-form-item>



                </el-form>

        </div>     
    </div>
</template>
<script>
export default {
    data(){
        return{
            info:[],
            hooks:[],
            edit_id:'',
        }
    },
    created(){
        this.edit_id = this.$route.params.id;
        this.getdata( this.edit_id);
    },
    methods:{
        async getdata(id){
            const res = this.$axios.post("/api/public/api/jwt/hook/gethook",{id:id});
            this.info = res.data;
        }

    }
}
</script>
<style>
.admin_main_block_right{
    float: right;
}
.admin_main_block_left {
    float: left;
}
</style>