<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
            </div>
        <el-table :data="tableData" border> 
            <el-table-column fixed type="index" label="#" width="50"></el-table-column>
            <el-table-column  label="商品" width="650">
                <template slot-scope="scope">
                    <dl class="table_dl">
                        <dt><img :src="scope.row.picture||require('@/assets/img/default_pic.png')" width="50px" height="50px"></dt>
                        <dd class="table_dl_dd_all">{{ scope.row.name }}</dd>
                    </dl>
               </template>
            </el-table-column>
            <el-table-column  prop="price" label="价格"  width="100"></el-table-column>
             <el-table-column prop="num" label="库存" width="100"> </el-table-column>
            <el-table-column fixed="right" label="操作" width="300">
            <template slot-scope="scope">
                <el-button @click.native.prevent="deleteRow(scope.$index,scope.row)" type="button" class="el-icon-delete" size="small" circle></el-button>
               <!--editRow(scope.$index, scope.row)--> 
               <el-button @click.native.prevent="editHook(scope.$index, scope.row)" type="button" class="el-icon-edit" size="small" circle></el-button>
                <el-button type="button" icon="el-icon-check" size="small"  @click.prevent="showTree(scope.row)" circle></el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="6"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        </div>


        <el-dialog title="添加商品" :visible.sync="goodsVisible">
               <el-form :model="goods" :rules='rules' ref="goods" class="admin_form_main">
                <el-form-item label="商品名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="goods.name" autocomplete="off"></el-input>
                </el-form-item>
     
                <el-form-item   label="商品图片" :label-width="formLabelWidth" >
                    <el-upload :action="action" :headers="upload_headers" class="avatar-uploader" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item   label="价格" :label-width="formLabelWidth" >
                    <el-input v-model="goods.price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item   label="库存" :label-width="formLabelWidth" >
                    <el-input v-model="goods.num" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addsubmit">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
import moment from "moment"
export default {
    name:'userc',
    data(){
        return{
            datas:[],
            tableData:[],
            goodsVisible: false,
            goods:{},
            imageUrl:'',
            formLabelWidth:'100px',
            total:0,
            pageSize:6,
            pageIndex:1,
            search:'',
            editIndex:0,
            arrkey:[],//选中的值
            info:[],
            hooks:[],
            hooklists:[],
            currentId:'',
            action:'/api/api/jwt/good/upload',
            upload_headers:{},
            rules:{
                  name:[{ required: true, message: '请输入名称', trigger: 'blur' }],
                  price:[{ required: true, message: '请输入价格', trigger: 'blur' }],
                  num:[{ required: true, message: '请输入库存', trigger: 'blur' }],
            }
        }
    },
    mounted(){
       
    },
    created(){
        // this.upload_headers = this.$store.getters.getToken;
         this.upload_headers.Authorization = this.$store.getters.getToken
        this.getdata()
    },
    methods:{
        handleAvatarSuccess(res, file) {
            //图片上传成功之后
            this.goods.picture  = res.path;
            this.imageUrl= URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file){
            //图片上传之前
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        },
       add(){
            this.goodsVisible = true;
       },
       async deleteRow(index,scope){
            const res = await this.$axios.post("/api/api/jwt/good/del",{id:scope.id});
            this.$message.success(res.data.msg);
            this.tableData.splice(index,1);
       },
       addsubmit(){
           var _this =this;
           _this.$refs.goods.validate(res=>{
               _this.$axios.post('/api/api/jwt/good/add',this.goods).then(res=>function(){
                    _this.$message.success(res.data.msg);
                    _this.goodsVisible = false;
               })
           })
       },
        async getdata(){
            const res = await this.$axios.post('/api/api/jwt/good/getdata',{page:this.pageIndex,size:this.pageSize});
            this.tableData = res.data.data.data;
            this.total = res.data.data.total;
        },
       handleSizeChange(val){
            this.pageSize= val ;
            this.getdata();
       },
       handleCurrentChange(val){
            this.pageIndex = val ;
            this.getdata();
       }

    }
}
</script>
<style>
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
.menus_list{
    float: left;
    margin-right: 15px;
    margin-bottom: 15px;
}
.apis{
    margin-left: 15px;
    float: left;
}
.content{
    float: left;
    margin-left: 15px;
}
.div_apis{
    margin-bottom: 15px;
    float: left;
    width: 50%;
}
.div_apis:after{
    content:'';
    display: block;
    clear:both;
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