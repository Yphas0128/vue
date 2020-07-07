<template>
    <div class="chat">
        <!-- 缩小化 -->
        <div class="small_chat" @click="websocketInit();" >
            <i class="font iconfont chat_handle">&#xebaf;</i>
        </div>

         <!-- 好友界面 -->
        <div class="chat_friend_interface chat_shodow" v-show="!minimizes">
                            <!-- 好友界面头部 -->
            <div class="chat_friend_interface_head">
                <div class="head_top_info">
                    <span>羊皮卷
                      <!--  {{user_info.nickname||'加载中...'}}-->
                    </span>
                    <font :class="isOnline?'green':'red'"></font>
                    <i class="font iconfont chat_handle" @click="minimizes = true">&#xeb9b;</i>
                </div>
                <div class="chat_friend_interface_head_desc">
                    该用户很懒，没留下任何描述~
                </div>
            </div>
                   <!-- 分组好友和临时聊天列表Tab切换 -->
            <div class="chat_friend_interface_tab">
                <ul>
                    <li class="border_b_show">联系人<div class="border_b"></div></li>
                    <li >消息<div class="border_b"></div></li>
                </ul>
            </div>

                  <!-- 好友的内容块 -->
            <div class="chat_friend_interface_content">
                <dl class="chat_handle" >
                    <el-tree class="filter-tree" @node-click="handleNodeClick" :data="userinfos"  :props="defaultProps" default-expand-all  ref="tree">
                        
                   
                    </el-tree>
                </dl>
            </div>



                   <!-- 聊天界面 -->
            <div class="chat_interface" >
                <!-- 左侧显示聊天好友 -->
                   {{onChatIndex}}
                <div class="chat_interface_left">
                 
                    <dl :class="k==onChatIndex?'active':'active2'" @click="onChatclick(k)" v-for="(v,k) in onChat" :key="k">
                        <dt><img src="@/assets/img/default_avatar.png" alt=""></dt>
                        <dd>{{v.name||'-'}}</dd>
                        <dd class="close" @click="closeWin(onChat[onChatIndex])"><i class="icon iconfont">&#xebb2;</i></dd>
                    </dl>
                </div>


                 <div class="chat_interface_right">
                      <div class="chat_interface_right_top"><i class="icon iconfont chat_handle" @click="onChat = [];onChatIndex = 0;">&#xeb9b;</i></div>
                    <!-- 聊天内容 -->
                    <div class="chat_interface_right_content">
                        <div>
                            <el-scrollbar ref="myScrollbar">
                                <div  class="chat_interface_msg_item me" v-for="(v,k) in chat_msg" :key="k">
                                    <div class="chat_interface_msg_avatar">
                                         <img src='@/assets/img/default_avatar.png'   alt="">
                                    </div>    
                                    <div class="chat_interface_msg_time"> {{v.created_at||formatDateAuto('yyyy-MM-dd hh:mm:ss')}}</div>  
                                    <div class="chat_interface_msg">
                                        <div>{{v.msg}}</div>
                                    </div>
                                </div>                             
                            </el-scrollbar>
                        
                        </div>
                    </div>


                      <!-- 聊天输入框 -->
                    <div class="chat_interface_right_send">
                        <div class="chat_interface_right_send_tool">
                            <div class="tool_item chat_handle">
                            </div>
                            <div class="tool_item chat_handle">
                               <!-- <el-upload action="chatUpload" :headers="upload_headers" :show-file-list="false" :on-success="chatUpload" >
                                    <i class="icon iconfont">&#xebac;</i>
                                </el-upload>-->
                                <!-- <i class="icon iconfont">&#xebac;</i> -->
                            </div>
                            <div class="tool_item other_tool_item chat_handle" @click="$message.error('暂时未开放')"><i class="icon iconfont">&#xeb9d;</i>聊天记录</div>
                        </div>
                        <div class="chat_interface_right_send_text">
                            <textarea v-model="sendMsg['content']['content']"></textarea>
                        </div>
                        <div class="chat_interface_right_send_text_btn">
                            <button @click="send('text')">发送消息(E)</button>
                            <button @click="closeWin(onChat[onChatIndex])">关闭窗口(C)</button>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    </div>
</template>
<script>
import socket from "@/components/chat/socket.js";
export default {
    data(){
        return{
          insert:'',
          minimizes:true,
          //this.minimize,
          miniItems:true,
          //this.miniItem,
          music:"/music/chat.wav", // 播放音频地址
          upload_headers:{},
          page:1, // 聊天页码
          socketObj:null,
          isOnline:false, // 是否链接上socket
          isBind:false, // 是否已经绑定
          connect_info:{ // 用户信息，包括聊天好友信息
              user_id:0,
              to_user_id:0,
          }, 
          onChat:[],
          onChatIndex:0,
          sendMsg:{
              type:'text', // 类型
              content:{
                  content:'',// 聊天内容
              }, // 内容
          },
          user_info:{}, // 链接成功后获取到的用户信息
          chat_friend:{}, // 好友列表
          websocket:null,
          chat_msg:[],
          userinfos:[],
          defaultProps: {
            children: 'children',
            label: 'name'
          },
          src:'http://118.25.79.235:8078',
          socket:null
        }
      
    },
    created(){
    
        
    //     socket.on('connect', async () => {
    //         console.log('websocket connected: ' + socket.connected);
    //    });

        //this.websocketInit();
        this.getdata();
    },
    methods:{
        onChatclick(k){
            this.onChatIndex = k;
              this.getdata();
        },
        handleNodeClick(data) {
           this.onChat.push(data);
          /// this.websocketInit();
        
        },
        formatDateAuto(t){ 
            let yy = new Date().getFullYear();
            let mm = new Date().getMonth()+1;
            let dd = new Date().getDate();
            let hh = new Date().getHours();
            let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
            let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
            return yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
        },
        chatUpload(){







        },
        websocketInit(){
            let that = this;
            that.websocket = new WebSocket("ws://118.25.79.235:8078/ws/");

            //多个？
            that.websocket.onopen = function (event) {
                console.log("已建立 WebSocket 连接");
            };
            that.websocket.onmessage = function (event) {
                // 接收到 WebSocket 服务器返回消息时触发
                let data = JSON.parse(event.data);
                console.log(data);
                
                that.chat_msg.push(data);
            };
            that.websocket.onerror = function (event) {
                console.log("与 WebSocket 通信出错");
            };
            that.websocket.onclose = function (event) {
                console.log("断开 WebSocket 连接");
            };
            
        },
        send(){
           let content =  this.sendMsg.content.content;
           let touserid   = this.userinfos[this.onChatIndex]['id'];
           if(content!=""){
                const msg = content; // 防止xss
                const obj = {
                    username: touserid,
                    src: this.src,
                    img: '',
                    msg,
                    time: new Date(),
                };
                // 传递消息信息
                socket.emit('message', obj);


           }
        



           //console.log(content);
            //let touserid   = this.userinfos[this.onChatIndex]['id'];
            
            //发送消息
            // this.websocket.send('{"type":"text","to_user":"'+touserid+'","msg":"' +content + '"}') ;
            // console.log("send");
             

        },
       async getdata(){
            let index = this.onChatIndex;
            let id =  this.userinfos.length != 0?this.userinfos[index]['id']:0;
            const res = await this.$axios.post("/api/api/jwt/message/getdata",{id:id});
            this.chat_msg  = res.data.messages;
            this.userinfos = res.data.users;

        }
    }
}
</script>
<style lang="scss" scoped>
.chat_image{
    max-width: 200px;
    max-height: 200px;
}
.emoji_block{
    height: 170px;
    position: absolute;
    background: #fff;
    top: 150px;
    .el-scrollbar{
        height: 170px;
    }
}
.emoji_class{
    margin-right: 10px;
    padding-top: 10px;
    float: left;
}
.chat_interface{
    border-radius: 3px;
    .chat_interface_left{
        float: left;
        width: 200px;
        background: #333;
        height: 100%;
        border-radius: 3px 0 0 3px;
        dl{
            padding: 10px 0;
            clear: both;
            dt{
                width: 40px;
                height: 40px;
                img{
                    width: 100%;
                    height: 100%;
                }
                float: left;
                margin-right: 15px;
                margin-left: 15px;
            }
            dd{
                float: left;
                overflow: hidden;
                color:#999;
                line-height: 40px;
                height: 30px;
                width: 100px;
            }
            dd.close{
                float: right;
                width: 20px;
                height: 30px;
                margin-right: 5px;
                cursor:pointer;
                display: none;
            }
        }
        dl.active{
            background: #222;
            dd{
                color:#f56c6c;
            }
        }
        dl.active2{
            background: #333;
            dd{
                color:#fff;
            }
        }
        dl:nth-child(1).active{
            border-radius: 3px 0 0 0;
        }
        dl:hover dd.close{
            display: block;
            color:#fff;
        }
        dl:after{
            content:'';
            clear:both;
            display: block;
        }
    }
    .chat_interface_right{
        float: right;
        width: 600px;;
        .chat_interface_right_top{
            background: #efefef;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
            border-radius: 0 3px 0 0;
            i{
                float:right;
                margin-right: 15px;
            }
        }
        .chat_interface_right_content{
            height: 280px;
            padding-bottom: 15px;
            box-sizing: border-box;
            .el-scrollbar{
                height: 265px;
            }
            .chat_interface_msg_item{
                padding: 15px 0 0 15px;
                .chat_interface_msg_avatar{
                    background-color: #efefef;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    float: left;
                    margin-right: 15px;
                    img{
                        border-radius: 50%;
                        width: 100%;
                        height: 100%;
                    }
                }
                .chat_interface_msg_time{
                    font-size: 12px;
                    margin-top: 10px;
                    color:#666;
                    line-height: 20px;
                    span{
                        float: left;
                        font-size: 14px;
                        color:#333;
                        margin-right: 15px;
                        font-weight: bold;
                    }
                }
                .chat_interface_msg_time:after{
                    content:'';
                    display: block;
                    clear: both;
                }
                .chat_interface_msg{
                    font-size: 12px;
                    line-height: 20px;
                    padding: 5px 8px;
                    background: #efefef;
                    border-radius: 5px;
                    margin-top: 10px;
                    word-wrap:break-word;
                    // display:inline-block;
                    min-width: 140px;
                    max-width: 400px;
                    height: 100%;
                    margin-left: 52px;
                }
            }
            .me{
                .chat_interface_msg_avatar{
                    float: right;
                }
                .chat_interface_msg_time{
                    float: right;
                    span{
                        float: right;
                        margin-left: 20px;
                    }
                }
                .chat_interface_msg{
                    background: #67C23A;
                    color:#fff;
                    float: right;
                    clear:both;
                    margin-right: 65px;
                    text-align: right;
                }
            }
            .me:after{
                content:'';
                display: block;
                clear: both;
            }
        }
        .chat_interface_right_send{
            .chat_interface_right_send_tool{
                .tool_item{
                    line-height: 18px;
                    margin-left: 20px;
                    margin-top: 5px;
                    margin-bottom: 5px;
                    padding:4px 6px;
                    float: left;
                    border-radius: 3px;
                    i{
                        font-size: 18px;
                    }
                }
                .tool_item:hover{
                    background: #efefef;
                }
                .other_tool_item{
                    float:right;
                    margin-right: 15px;
                    font-size: 14px;
                    i{
                        margin-right: 10px;
                    }
                }
            }
            .chat_interface_right_send_tool:after{
                content:'';
                clear: both;
                display: block;
            }
            .chat_interface_right_send_text{
                height: 60px;
                textarea{
                    font-family:'微软雅黑',  Arial, sans-serif;
                    width: 100%;
                    height: 60px;
                    padding: 5px;
                    color:#666;
                    outline: none;
                    border:none;
                    box-sizing: border-box;
                }
            }
            .chat_interface_right_send_text_btn{
                button{
                    background: #fff;
                    border:1px solid #efefef;
                    border-radius: 3px;
                    float:right;
                    margin-right: 15px;
                    line-height: 25px;
                    margin-top: 5px;
                    outline: none;
                    cursor:pointer;
                }
                button:nth-child(1){
                    border: none;
                    background: #333;
                    color:#fff;
                }
                
            }
            border-top: 1px solid #efefef;
        }
    }
    width: 800px;
    height: 460px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 1005;
    position: fixed;
    left: 50%;
    top: 50%;
    background: #fff;
    transform: translate(-50%, -50%);    /* 50%为自身尺寸的一半 */
}
.chat_friend_interface_content{
    dl{
        padding: 15px 0 10px 0; 
        dt{
            width: 40px;
            height: 40px;
            display: blcok;
            float: left;
            margin-left: 15px;
            margin-right: 15px;
            img{
                border-radius: 50%;
                width: 100%;
                height: 100%;
            }
        }
        dd{
            float: left;
            width: 165px;
            line-height: 20px;
            height: 20px;
            font-size: 14px;
            display: block;
            position: relative;
            span{
                border-radius: 50%;
                background: #ca151e;
                color:#fff;
                width: 8px;
                height: 8px;
                position: absolute;
                right: 0px;
                z-index: 1001;
                top: -5px;
            }
        }
        dd.friend_new{
            color:#999;
            font-size: 12px;
            line-height: 16px;
            overflow: hidden;
            height: 16px;
            display: block;
        }
    }
    dl:hover{
        // background: #fcfcfc;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }
    dl:after{
        content:'';
        clear: both;
        display: block;
    }
}
.chat_friend_interface_tab{
    ul{
        border-bottom: 1px solid #efefef;
        li{
            float: left;
            width: 50%;
            text-align: center;
            line-height: 40px;
            color:#999;
            position: relative;
            .border_b{
                border-bottom: 1px solid #333;
                display: none;
                width: 80%;
                margin:0 auto;
                margin-bottom: -1px;
            }
        }
        li:hover{
            color: #333;
        }
        li.border_b_show{
            color:#333;
        }
        li.border_b_show .border_b{
            display: block;
        }
        
    }
    ul:after{
        content:'';
        clear: both;
        display: block;
    }
}
.small_chat{
    z-index: 1000;
    color:#ca151e;
    position: fixed;
    right: 40px;
    bottom: 90px;
    i{
        font-size: 50px;
    }
}
.chat_friend_interface{
    z-index: 1000;
    width: 260px;
    height: 520px;
    position: fixed;
    right: 0;
    bottom: 0;
    background: #fff;
    .chat_friend_interface_head{
        height: 80px;
        background: #333;
        color:#fff;
        .head_top_info{
            span{
                line-height: 50px;
                margin-left: 15px;
                float: left;
                height: 50;
                overflow: hidden;
                
            }
            font{
                float: left;    
                margin-top: 18px;  
                margin-left: 8px;  
            }
            i{
                float: right;
                line-height: 40px;
                margin-right: 10px;
            }
        }
        .head_top_info:after{
            content:'';
            clear: both;
            display: block;
        }
    }
    .chat_friend_interface_head_desc{
        font-size: 12px;
        color:#999;
        margin-left: 15px;
    }
}
.red{
    width: 12px;
    height: 12px;
    display: block;
    border-radius: 50%;
    background: #ca151e;
}
.green{
    width: 12px;
    height: 12px;
    display: block;
    border-radius: 50%;
    background: #67C23A;
}
.chat_shodow{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.chat_handle{
    cursor:pointer;
}

@font-face {
  font-family: 'iconfont';  /* project id 1617825 */
  src: url('//at.alicdn.com/t/font_1617825_5wjqc8ogtbk.eot');
  src: url('//at.alicdn.com/t/font_1617825_5wjqc8ogtbk.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1617825_5wjqc8ogtbk.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1617825_5wjqc8ogtbk.woff') format('woff'),
  url('//at.alicdn.com/t/font_1617825_5wjqc8ogtbk.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1617825_5wjqc8ogtbk.svg#iconfont') format('svg');
}
</style>