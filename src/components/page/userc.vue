<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="search" placeholder="请输入内容" class="input-with-select mr10" style="width:400px;">
                <el-button slot="append" icon="el-icon-search" @click="ensearch(search)"></el-button>
                </el-input>
                <el-button type="primary" icon="el-icon-plus" @click="adduser">创建用户</el-button>
            </div>
        <el-table
            :data="tableData"
            border
           >
            <el-table-column
            fixed
            type="index"
            label="#"
            width="50">
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名"
            width="150">
            </el-table-column>
            <el-table-column
            prop="email"
            label="邮箱"
            width="200">
            </el-table-column>
            <el-table-column
            prop="created_at"
            label="创建时间"
            width="200">
            </el-table-column>
            <el-table-column
            label="用户状态"
            width="300">
                 <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.status"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        :active-value="'1'"
                        :inactive-value="'0'"
                        @change="changeStatus($event,scope.row,scope.$index)"
                    />
                </template>

            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="300">
            <template slot-scope="scope">
                <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="button" class="el-icon-delete" size="small" circle></el-button>
                <el-button @click.native.prevent="editRow(scope.$index, scope.row)" type="button" class="el-icon-edit" size="small" circle></el-button>
                <el-button type="button" icon="el-icon-check" size="small" title="用户" @click.prevent="addrole(scope.row)" circle></el-button>
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

        <el-dialog title="分配角色" :visible.sync="dialogroleFormVisible">
            <el-form >
                <el-form-item label="用户名" :label-width="formLabelWidth">

                </el-form-item>

                <el-form-item label="角色" :label-width="formLabelWidth">
                    {{selectvalue}}
                    <el-select v-model="selectvalue" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogroleFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editrole">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submituser">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑用户" :visible.sync="dialogaddVisible">
            <el-form :model="addform">
                <el-input type="hidden" v-model="addform.id"></el-input>
                <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="addform.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="addform.email" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogaddVisible = false">取 消</el-button>
                <el-button type="primary" @click="edituser">确 定</el-button>
            </div>
        </el-dialog>
        
    </div>
</template>
<script>
export default {
    name:'userc',
    data(){
        return{
            tableData:[],
            dialogFormVisible: false,
            dialogaddVisible :false,
            dialogroleFormVisible:false,
            form:{name:'',password:'',email:''},
            addform:{id:'',name:'',password:'',email:''},
            formLabelWidth:'',
            total:0,
            pageSize:2,
            pageIndex:1,
            search:'',
            editIndex:0,
            selectvalue:"",
            options:[],
            currentId:'',
        }
    },
    mounted(){
        this.get_user_data(this.pageSize,this.pageIndex);
    },
    methods:{
       async editrole(){
            const res  = await this.$axios.post("/api/api/jwt/userc/editrole",{id:this.currentId,role:this.selectvalue});
            if(res.data.result ==='success'){
                this.$message.success(res.data.msg);
                this.get_user_data();
                this.dialogroleFormVisible = false;
            }
        },
        async addrole(row){
            const res  = await this.$axios.post("/api/api/jwt/role/options");
            this.options   = res.data.data;
            this.currentId = row.id;
            this.selectvalue = row.role_id;
            this.dialogroleFormVisible = true;
        },
        edituser(){
            var vm = this;
            this.$axios.post('/api/api/jwt/userc/edit',vm.addform).then(function(rs){
                vm.$message.success(rs.data.msg);
                vm.tableData[vm.editIndex] = rs.data.user;
                vm.dialogaddVisible = false;


            }).catch(function(rs){
                vm.$message.error(rs.msg);
                vm.dialogaddVisible = false
            })  
              

        },
        editRow(index,row){
            this.addform = row;
            this.editIndex = index;
            this.dialogaddVisible =!this.dialogaddVisible;
        },
        changeStatus(e,row,index){
            this.$confirm("确定改变状态?","确定信息",{
                distinguishCancelAndClose: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(()=>{
                    this.$axios.post("/api/api/jwt/userc/change",{status:e,id:row.id}).then(function(res){
                        this.$message.success(res.data.msg);
                    })
            }).catch(action=>{
                if(action === 'cancel'){
                    row.status = !e;
                }
            });
        },
        deleteRow(index){
         let id = this.tableData[index].id;
        this.$confirm('确定删除？', '确认信息', {
                distinguishCancelAndClose: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消'
                })
                .then(() => {
                
                    this.$axios.post("/api/api/jwt/userc/del",{id:id}).then(function(res){
                        this.$message.success(res.data.msg);
                        this.tableData.splice(index,1);
                    })
                })
                .catch(action => {
                    this.$message({
                    type: 'info',
                    message: action === 'cancel'
                        ? '放弃保存并离开页面'
                        : '停留在当前页面'
                })
        });
           
        },
        ensearch(val){
            if(!val){
                this.$message.error("不可为空");
            }else{
                this.pageSize  = 2;
                this.pageIndex = 1;
                this.getsearchdata(val,this.pageSize,this.pageIndex);
            }
        },
        handleSizeChange(val) {
            this.pageSize = val ;
            this.get_user_data(this.pageSize,this.pageIndex);

        },
        handleCurrentChange(val) {
            this.pageIndex = val;
            this.get_user_data(this.pageSize,this.pageIndex);
        },
        submituser:function(){
            var vm = this;
            this.$axios.post('/api/api/jwt/userc/add',vm.form).then(function(rs){
                vm.$message.success(rs.data.msg);
                  vm.dialogFormVisible = true;
            }).catch(function(rs){
                vm.$message.error(rs.msg);
                vm.dialogFormVisible = false
            })
        },
        adduser:function(){
            //添加用户
            this.dialogFormVisible =true;
        },
        getsearchdata:function(val,size,page){
            var vm = this;
            this.$axios.post('/api/api/jwt/userc/getsearch',{val:val,size:size,page:page}).then(function(res){
                vm.tableData = res.data.user.data;
                vm.total     = res.data.user.total;
            });
        },
         get_user_data:function(pageSize,pageIndex){
             var vm = this;
            this.$axios.post('/api/api/jwt/userc/getdata',{size:pageSize,page:pageIndex}).then(function(res){
                vm.tableData = res.data.user.data;
                vm.total     = res.data.user.total;
            });
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
</style>