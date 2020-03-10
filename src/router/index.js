import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
//import Login from '@/components/Login'

import Login from '@/components/login/login'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component:()=> import(/* webpackChunkName: "home" */ '../components/home/home'),
      meta: {
        requireAuth: true,
      },
      //redirect: '/user',
      children: [
        {
          path:'/hook',
          component:()=>import(/* webpackChunkName: "userc" */ '../components/page/hook.vue'),
          meta: { title: '接口管理' }
        },
        {
          path:'/userc',
          component:()=>import(/* webpackChunkName: "userc" */ '../components/page/userc.vue'),
          meta: { title: '用户管理' }
        },
        {
          path:'/limit',
          component : () =>import(/* webpackChunkName: "limit" */ '../components/page/limit.vue'),
          meta: { title: '权限管理' }
        },
        {
          path:'/role',
          component : () =>import(/* webpackChunkName: "limit" */ '../components/page/role.vue'),
          meta: { title: '角色管理' }
        },
        {
          path:'/menu',
          component : () =>import(/* webpackChunkName: "limit" */ '../components/page/menu.vue'),
          meta: { title: '菜单管理' }
        },
        {
            path: '/table',
            component: () => import(/* webpackChunkName: "table" */ '../components/page/table.vue'),
            meta: { title: '基础表格' }
        },
        {
          path: '/dashboard',
          component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
          meta: { title: '系统首页' }
        },
        {
          path: '/404',
          component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
          meta: { title: '404' }
      },
      ]
    },
    {
      name:'login',
      path: '/login',
      component:Login
    },
    {
        path: '*',
        redirect: '/404'
    }
  ]
})
