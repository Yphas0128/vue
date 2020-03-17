// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import axios from 'axios'
//import MyHttpServer from  '@/plugins/http.js'
import qs from 'qs'
import ElementUI from 'element-ui'
import { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
import store from "@/store/index"
import axios from 'axios'
import '@/assets/fonts/iconfont.css' // 阿里图标
Vue.prototype.$axios = axios

//Vue.use(new VueSocketIO({
   //debug:true,
   //connection:'http://118.25.79.235:8078',
//}));

axios.interceptors.request.use(config=>{
  //在所有请求头部添加token值
  const token =  store.getters.getToken;
  if(token){
      config.headers.Authorization = token;
  }
  return config;
},
error=>{
  return Promise.reject(error);
})


//拦截
// 
axios.interceptors.response.use(
  response=>{

    var token = response.headers.authorization
    if (token) {
        // 如果 header 中存在 token，那么触发 refreshToken 方法，替换本地的 token
        store.dispatch('refreshToken', token)
    }
    return response;
  },
  error => {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            //this.$store.commit("del_token");
            router.replace({
              path: "/login",
              query: { redirect: router.currentRoute.fullPath } //登录成功后跳入浏览的当前页面
            });
            break;
            case 402:
              Message.error("Error : " + error.response.data.msg);
            break;
        }
      }
      return Promise.reject(error.response.data);
    }
);


router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    //localStorage.getItem('token')
    if (store.getters.getToken) {
        next();
    } else {
      next({
        path: "/login"
      });
    }
  } else {
    next();
  }
});



Vue.use(ElementUI)
//Vue.use(MyHttpServer)
//Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
//axios.defaults.timeout = 5000;                        //响应时间
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';        //配置请求头
//axios.defaults.baseURL = '';   //配置接口地址
Vue.prototype.qs = qs           //全局注册，使用方法为:this.qs

Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
