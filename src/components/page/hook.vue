<template>
    <div class="qingwu">
        <div class="container">
            <div class="handle-box">
                <div class="admin_main_block_top">
                    <div class="admin_main_block_left">
                        <div><el-button type="primary" @click="add" size="mini" icon="el-icon-plus">添加</el-button></div>
                    </div>
                    <div class="admin_main_block_right">
                        <div><el-button type="danger" size="mini" icon="el-icon-delete" >批量删除</el-button></div>
                    </div>
                </div>    
            </div>
        <el-table :data="list" border>   
            <el-table-column type="selection"></el-table-column>
            <el-table-column fixed type="index" label="#" width="100"></el-table-column>
            <el-table-column prop="name" label="接口名" width="200"></el-table-column>
            <el-table-column prop="controller_action" label="控制器" width="200"></el-table-column>
            <el-table-column prop="api"   label="接口路径" width="200"></el-table-column>
            <el-table-column prop="content"   label="描述" width="200"></el-table-column>
            <el-table-column fixed="right" label="操作" width="300">
            <template slot-scope="scope">
                <el-button @click.native.prevent="editRow(scope.$index, scope.row)" type="button" class="el-icon-edit" size="small" circle></el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="2"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
        <el-dialog title="添加接口"  :visible.sync="dialogaddVisible">
            <el-form :model="addform" :rules='rules' ref="addform" class="admin_form_main">
                <el-input type="hidden" v-model="addform.id"></el-input>
                <el-form-item label="接口名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="addform.name" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="控制器" :label-width="formLabelWidth" prop='controller_action'>
                    <el-input v-model="addform.controller_action" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="接口" :label-width="formLabelWidth" prop="api">
                    <el-input v-model="addform.api" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                    <el-input v-model="addform.content" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogaddVisible = false">取 消</el-button>
                <el-button type="primary" @click.prevent="addhook">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[],
            total:0,
            pageSize:2,
            pageIndex:1,
            formLabelWidth:'100px',
            rules:{
                    name:[{ required: true, message: '请输入接口名', trigger: 'blur' }],
                    controller_action:[{ required: true, message: '请输入控制器', trigger: 'blur' }],
                    api:[{ required: true, message: '请输入接口', trigger: 'blur' }],

                },
            dialogaddVisible:false,
            addform:{name:'',controller_action:'',api:'',content:''},
        }
    },
    created(){
        this.getdata(this.pageSize,this.pageIndex);
    },
    methods:{
        getdata(pageSize,pageIndex){
            var vm = this;
            this.$axios.post('/api/api/jwt/hook/getdata',{size:pageSize,page:pageIndex}).then(function(res){
                vm.list = res.data.data.data;
                vm.total= res.data.data.total;
            });


        },
        add(){
            this.dialogaddVisible = true;
        },
        addhook(){
            var vm =this;
            this.$refs.addform.validate(res=>{
                if(res){
                    vm.$axios.post("/api/api/jwt/hook/add",vm.addform).then(res=>{
                        vm.$message.success(res.data.msg);
                        this.dialogaddVisible = false;
                    })
                }
            })
        },
        handleSizeChange(val) {
            this.pageSize = val ;  
        },
        handleCurrentChange(val) {
            this.pageIndex = val;
        },
    }


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

</style>