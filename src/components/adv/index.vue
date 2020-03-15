<template>
     <div class="qingwu">
        <div class="container">
            <div class="handle-box">
                <div class="admin_main_block_top">
                    <div class="admin_main_block_left">
                        <div><el-button type="primary" @click="addadv" size="mini" icon="el-icon-plus">添加</el-button></div>
                    </div>
                    <div class="admin_main_block_right">
                        <div><el-button type="danger" size="mini" icon="el-icon-delete" >批量删除</el-button></div>
                    </div>
                </div>    
            </div>
        <el-table :data="list" border  row-key="id" >   
            <el-table-column type="selection"></el-table-column>
            <el-table-column fixed type="index" label="#" width="100"></el-table-column>
            <el-table-column prop="name" label="广告位" width="200"></el-table-column>
            <el-table-column prop="ap_height" label="高度" width="200"></el-table-column>
            <el-table-column prop="ap_width" label="宽度" width="200"></el-table-column>
            <el-table-column fixed="right"   label="操作" width="500">
            <template slot-scope="scope">
                <el-button type="button" class="el-icon-edit" size="small" >编辑</el-button>
                <el-button type="button" class="el-icon-plus" size="small" @click.prevent="addgg(scope.row)">添加广告</el-button>
            </template>
            </el-table-column>
        </el-table>
        </div>
                
        <el-dialog title="添加广告位"  :visible.sync="diaadvddVisible">
            <el-form :model="addform" :rules='rules' ref="addform" class="admin_form_main">
                <el-form-item label="菜单名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="addform.name" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="高度" :label-width="formLabelWidth" prop="api_height">
                    <el-input v-model="addform.api_height" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="宽度" :label-width="formLabelWidth" prop="api_width">
                    <el-input v-model="addform.api_width" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="diaadvddVisible = false">取 消</el-button>
                <el-button type="primary" @click.prevent="saveadv">确 定</el-button>
            </div>
        </el-dialog>



        <el-dialog title="添加广告"  :visible.sync="diaggddVisible">
            <el-form :model="ggform" :rules='gules' ref="ggform" class="admin_form_main">
                <el-input type="hidden" v-model="ggform.id"></el-input>
                <el-form-item label="广告位" :label-width="formLabelWidth" >
                    <el-select v-model="ggform.id">

                    </el-select>
                </el-form-item>
                <el-form-item label="广告名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="ggform.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="广告图" :label-width="formLabelWidth" >
                  <el-upload class="avatar-uploader"
                    :action="upaction"
                    :headers="upload_headers"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item  v-model="ggform.date" label="日期" :label-width="formLabelWidth" >
                  
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="diaggddVisible = false">取 消</el-button>
                <el-button type="primary" @click.prevent="savegg">确 定</el-button>
            </div>
        </el-dialog>



    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[],
            addform:{name:'',api_height:'',api_width:''},
            diaadvddVisible:false,
            diaggddVisible:false,
            upload_headers:{},
            ggform:{id:'',name:''},
            imageUrl: '',
            formLabelWidth:'100px',
            upaction :'/api/public/api/jwt/adv/upload',
            rules:{
                name:[{ required: true, message: '请输入名称', trigger: 'blur' }],
                api_height:[{ required: true, message: '请输入高度', trigger: 'blur' }],
                api_width:[{ required: true, message: '请输入宽度', trigger: 'blur' }],
            },
            gules:{
                name:[{ required: true, message: '请输入名称', trigger: 'blur' }],
            }
        }
    },
    created(){
        this.upload_headers.Authorization = this.$store.getters.getToken
        //'Bearer '+localStorage.getItem('token');
        this.getdata();
    },
    methods:{
        handleAvatarSuccess(){
            
        },
        addgg(rows){
            console.log(rows);
            this.diaggddVisible =true;



        },
        async   getdata(){
            const res = await  this.$axios.post("/api/public/api/jwt/adv/getdata");
            this.list = res.data.data;
        },
        addadv(){
            this.diaadvddVisible = true;

        },
         saveadv(){
            var vm =this;
            vm.$refs.addform.validate(function(res){
               vm.$axios.post("/api/public/api/jwt/adv/add",vm.addform).then(res=>{


               })


            })
        }

    },

}
</script>
<style>
.admin_main_block_left {
    float: left;
}
.admin_main_block_right {
    width: 10%;
    float: right;
    margin-right: 15px;
}
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
.admin_main_block_top {
    padding-bottom: 35px;
    margin-bottom: 20px;
    border-bottom: 1px solid #efefef;
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>