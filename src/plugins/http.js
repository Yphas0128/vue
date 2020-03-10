//axios 插件
//插件模块
import axios from 'axios'
const MyHttpServer = {}

 
MyHttpServer.install =  (Vue) => {

    Vue.prototype.$axios = axios
    //基准url
    //axios.defaults.baseURL ='http://rpc.com/api/'
    // 4. 添加实例方法
    //请求是带



}
export default  MyHttpServer