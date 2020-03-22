<template>
    <div>
        <v-bread></v-bread>
        <div class="goods_where width_center_1200">
            <ul>
                <li v-for="(v,k) in seckill_list" :key="k" @click="change_seckill(v.id)"  :class="v.id==seckill_info['id']?'red':''">{{v.name}} 
                    <span v-if="v.id==seckill_info['id']">距离{{fontSkill}} {{hour}}:{{min}}:{{secs}}</span>
                    <font v-else>{{v.is_active?'活动中':'即将开始'}}</font>
                </li>
            </ul>
        </div>
        
        <div class="goods_list width_center_1200" v-if="goods_list.length>0">
            <div class="goods_list_item" v-for="(v,k) in goods_list" :key="k">
                <!-- <router-link :to="'/shop/good/info/'+v.id"> -->
                <dl>
                    <dt><el-image :src="v.picture" alt="" lazy></el-image></dt>
                    <dd class="title">{{v.name}}</dd>
                    <dd class="price">￥{{v.price}}</dd>
                    <dd><span @click.prevent="toplay(v.id)">立即购买</span><span>0人评价</span></dd>
                </dl>
                <!-- </router-link> -->
            </div>
        </div>
        
        <div class="home_fy_block  width_center_1200">
            <el-pagination @current-change="current_change" background layout="prev, pager, next,jumper,total" :total="total_data" :page-size="page_size" :current-page="current_page"></el-pagination>
        </div>
    </div>
</template>
<script>
import vBread from "@/components/shop/common/bread.vue"
export default {
    data(){
        return{
            seckill_list:[],
            seckill_info:{},
            goods_list:[],
            fontSkill:'开始',
            total_data:0, // 总条数
            page_size:10,
            current_page:1,
            hour:0,
            min:0,
            secs:0,
            intvalobj:null,
        }
    },
    components:{
        vBread,
    },created(){
        this.getdata();
        this.starttime();
    },
    methods:{
        toplay(id){
        // 下单
        this.$axios.post('/api/api/jwt/seckill/saved',{id:id});
        this.$router.push("/shop/good/info/"+id);

        },
        current_change:function(e){
            this.current_page = e;
            this.getdata();
        },
       async  getdata(){
           const res =await this.$axios.post("/api/api/jwt/seckill/shopdata");
           this.seckill_list = res.data.seckill_list;
           this.seckill_info = res.data.seckill_info;
           this.goods_list   = res.data.seckill_goods
        },
        starttime(){
            var that = this;
                //定时器
            if(that.intvalobj !=null){
                clearInterval(this.intvalobj);
            }
            that.intvalobj = setInterval(()=>{
                        //定时器go 
                let start = that.seckill_info.start;
                let end   = that.seckill_info.end;
                let timestamp = Date.parse(new Date()) /1000 ;            
                if(start> timestamp){
                            //未开始
                    let sec = start-timestamp;
                    this.hour = Math.floor(sec/3600);
                    this.min = Math.floor((sec-(this.hour*3600))/60);
                    this.secs = sec-(this.hour*60+this.min)*60;
                    this.fontSkill = '开始';
                }else if(end >timestamp){
                    let sec2 = end-timestamp;
                    this.hour = Math.floor(sec2/3600);
                    this.min = Math.floor((sec2-(this.hour*3600))/60);
                    this.secs = sec2-(this.hour*60+this.min)*60;
                    this.fontSkill = '结束';
                }else{
                    this.hour = 0;
                    this.min = 0;
                    this.secs = 0;
                    clearInterval(this.intvalobj);
                }
            },1000);
        },
    }
}
</script>
<style lang="scss" scoped>
.width_center_1200 {
    width: 1200px;
    float: left;
}
.goods_list{
    .goods_list_item{
        float: left;
        width: 224px;
        height: 364px;
        box-sizing: border-box;
        margin: 0 20px 20px 0;
        dl{
            border: 1px solid #efefef;
            box-sizing: border-box;
            width: 224px;
            height: 364px;
            -webkit-transition: all .2s linear;
            transition: all .2s linear;
            .el-image{
                width: 180px;
                height: 180px;
                margin:30px auto 25px auto;
                display: block;
            }
        }
        dl dt img{
            width: 180px;
            height: 180px;
            margin:30px auto 25px auto;
            display: block;
        }
        dl dd{
            font-size: 14px;
        }
        dl dd.title{
            color: #000;
            height: 36px;
            text-align: center;
            padding: 0 15px;
            overflow: hidden;
        }
        dl dd.price {
            color: #e01d20;
            line-height: 50px;
            text-align: center;
            padding: 0 15px;
            font-size: 20px;
            overflow: hidden;
        }
        dl dd span:first-child{
            box-sizing: border-box;
            border-right: 1px solid #efefef;
        }
        dl dd span:first-child:hover{
            color:#fff;
            background: #ca151e;
        }
        dl dd span{
            width: 50%;
            display: block;
            border-top: 1px solid #efefef;
            float: left;
            line-height: 41px;
            text-align: center;
        }
    }
    .goods_list_item:nth-child(5n){
        margin-right: 0;
    }
    
    .goods_list_item:hover dl{
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin-top:-3px;
    }
}
.goods_where{
    background: #eee;
    ul li{
        float: left;
        line-height: 50px;
        text-align: center;
        width: 300px;
        font-size: 18px;
        span{
            font-size: 12px;
            margin-left: 15px;
            font-weight: normal;
        }
        font{
            border: 1px solid #666;
            border-radius: 6px;
            line-height: 35px;
            font-size: 12px;
            padding: 3px 6px;
            margin-left: 15px;
        }
    }
    ul li.red{
        background: #ca151e;
        color:#fff;
    }
}

</style>