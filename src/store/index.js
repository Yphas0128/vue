import Vue from 'vue'
import Vuex from 'vuex'
//vuex 持久化
import VuexPersistence from 'vuex-persist'


const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

Vue.use(Vuex)

const state={  
    token:'',
    username:'',
};



const getters = {   //实时监听state值的变化(最新状态)
    getusername(state){
        return state.username;
    },
    getToken(state){
        return state.token;
    }
};



const mutations = {
   set_token(state,token){
      //  localStorage.setItem("token", 'Bearer ' +token);
        state.token = 'Bearer ' + token;
   },
   refresh_token(state,token){
    console.log(token,'b');
    state.token = token;
    console.log( state.token,'b');
   },
   set_username(state,name){
        state.username = name ;
   },
   clear_token(state){
        state.token = "";
   }
};


const actions = {
    refreshToken({commit},token) {
        console.log(token,'aa');
        
        commit('refresh_token',token);
    }

};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    plugins: [vuexLocal.plugin],
})

