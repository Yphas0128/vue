<template>
    <div class="qingwu">
        <div class="container">
            <div class="handle-box">
                <div class="admin_main_block_top">
                    <div class="admin_main_block_left">
                        <div><el-button type="primary" @click="addmenu" size="mini" icon="el-icon-plus">添加</el-button></div>
                    </div>
                    <div class="admin_main_block_right">
                        <div><el-button type="danger" size="mini" icon="el-icon-delete" >批量删除</el-button></div>
                    </div>
                </div>    
            </div>
        <el-table :data="list" border @selection-change="handleSelectionChange" row-key="id"  :tree-props="{children: 'children', hasChildren: 'hasChildren'}">   
            <el-table-column type="selection"></el-table-column>
            <el-table-column fixed type="index" label="#" width="100"></el-table-column>
            <el-table-column prop="title" label="名称" width="200"></el-table-column>
            <el-table-column prop="url" label="链接" width="200"></el-table-column>
            <el-table-column fixed="right"   label="操作" width="500">
            <template slot-scope="scope">
                <el-button type="button" class="el-icon-edit" size="small" circle></el-button>
            </template>
            </el-table-column>
        </el-table>
        </div>


        
        <el-dialog title="添加菜单"  :visible.sync="dialogaddVisible">
            <el-form :model="addform" :rules='rules' ref="addform" class="admin_form_main">
                <el-input type="hidden" v-model="addform.id"></el-input>
                <el-form-item label="菜单名" :label-width="formLabelWidth" prop="title">
                    <el-input v-model="addform.title" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="父级菜单" :label-width="formLabelWidth">
                        <el-select placeholder="请选择栏目" v-model="addform.pid">
                            <el-option label="顶级栏目" :value="0"></el-option>
                            <el-option v-for="(v,k) in options" :label="v.title" :key="k" :value="v.id"></el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="图标" :label-width="formLabelWidth">
                    <el-input v-model="addform.icon" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="链接" :label-width="formLabelWidth">
                    <el-input v-model="addform.url" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogaddVisible = false">取 消</el-button>
                <el-button type="primary" @click.prevent="addmenus">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[],
            options:[],
            dialogaddVisible:false,
            addform:{title:'',pid:'',icon:'',url:''},
            formLabelWidth:'100px',
            rules:{
                title: [{ required: true, message: '请输入名称', trigger: 'blur' }],
            },
        }
    },
    created(){
        this.get_user_data();
    },
    methods:{
        addmenus(){
            var vm =this;
            //验证规则
            vm.$refs.addform.validate(function(res){
                if(res){
                    vm.$axios.post("/api/public/api/jwt/menu/add",vm.addform).then(function(res){
                        


                    });
                }
            })


        },
        addmenu(){
            this.get_menu_info();
            this.dialogaddVisible  =true;

        },
        handleSelectionChange(e){
            let ids = [];
            e.forEach(v => {
                ids.push(v.id);
            });
            this.select_id = ids.join(',');
        },
        async get_menu_info(){
            const res = await this.$axios.post("/api/public/api/jwt/menu/getinfo");
            this.options = res.data.data;


        },
        async get_user_data(){
            //得到meus
            const res = await this.$axios.post("/api/public/api/jwt/menu/getdata");
            this.list = res.data.data;
        }
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