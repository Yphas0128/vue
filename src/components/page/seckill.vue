<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
            </div>
        <el-table :data="tableData" border> 
            <el-table-column fixed type="index" label="#" width="50"></el-table-column>
            <el-table-column prop="name" label="秒杀名称" width="200"></el-table-column>
            <el-table-column  prop="start" label="开始时间"  width="200"  >
                <template slot-scope="scope">
                    <div v-if="scope.row.start<=0"> - </div>
                    <div v-else>{{scope.row.start|formatDate}}</div>
                </template>
            </el-table-column>
             <el-table-column prop="end" label="结束时间" width="200">
                <template slot-scope="scope">
                    <div v-if="scope.row.end<=0"> - </div>
                    <div v-else>{{scope.row.end|formatDate}}</div>
                </template>
             </el-table-column>
            <el-table-column fixed="right" label="操作" width="450">
            <template slot-scope="scope">
                <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="button" class="el-icon-delete" size="small" circle></el-button>
               <!--editRow(scope.$index, scope.row)--> 
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


        <el-dialog title="秒杀编辑" :visible.sync="dialogVisible">
               <el-form :model="form" :rules='rules' ref="form" class="admin_form_main">
                <el-form-item label="广告名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item   label="日期" :label-width="formLabelWidth" >
                    <div class="block">
                        <el-date-picker v-model="form.tdate"  type="daterange" start-placeholder="开始日期"  end-placeholder="结束日期" :default-time="['12:00:00']"></el-date-picker>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addsubmit">确 定</el-button>
            </div>
        </el-dialog>

        
        <el-dialog title="编辑" :visible.sync="dialogeditVisible">
               <el-form :model="editform" :rules='rules' ref="editform" class="admin_form_main">
                <el-input type="hidden" v-model="editform.id" autocomplete="off"></el-input>
                <el-form-item   label="商品" :label-width="formLabelWidth" >
                      <el-select v-model="editform.goods" multiple placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogeditVisible = false">取 消</el-button>
                <el-button type="primary" @click="editsubmit">确 定</el-button>
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
            dialogVisible: false,
            dialogeditVisible:false,
            form:{name:'',tdate:[]},
            editform:{id:'',goods:[]},
            options:[],
            formLabelWidth:'100px',
            total:0,
            pageSize:2,
            pageIndex:1,
            search:'',
            editIndex:0,
            arrkey:[],//选中的值
            info:[],
            hooks:[],
            hooklists:[],
            currentId:'',
            rules:{
                  name:[{ required: true, message: '请输入名称', trigger: 'blur' }],
            }
        }
    },
    mounted(){
       
    },
    created(){
        this.getdata()
    },
    methods:{
        async editRow(index,scope){
            //
            const res =  await this.$axios.post("/api/api/jwt/good/goptions",{id:scope.id});
            this.options = res.data.data;
            this.editform.goods= res.data.goods;
            this.editform.id = scope.id;
            this.dialogeditVisible = true;
        },
        async editsubmit(){
            const res =  await this.$axios.post("/api/api/jwt/seckill_good/edit",this.editform);
            this.$message.success(res.data.msg);
            this.dialogeditVisible = false;

        },
       add(){
            this.dialogVisible = true;
       },
       addsubmit(){
           var _this =this;
           _this.$refs.form.validate(res=>{
               _this.$axios.post('/api/api/jwt/seckill/add',{data:this.form}).then(res=>function(){
                    _this.$message.success(res.data.msg);
                    _this.getdata();
                    _this.dialogVisible = false;
               })
           })
       },
        async getdata(){
            const res = await this.$axios.post('/api/api/jwt/seckill/getdata',{page:this.pageIndex,size:this.pageSize});
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
</style>