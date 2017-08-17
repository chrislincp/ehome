import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'  //  登录
import Layout from '@/views/layout/Layout'  //  布局
import Home from '@/views/home'   //  首页
import User from '@/views/user'   //  个人中心

// 系统设置
import Config from '@/views/system/config'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      component: Login,
      name: '登录',
      hidden: true,
    },
    {
      path: '/',
      component: Layout,
      name: '首页',
      hidden: true,
      children: [
        {path: 'home', component: Home}
      ]
    },
    {
      path: '/',
      component: Layout,
      name: '个人中心',
      icon: 'fa fa-user-circle-o',
      noDropdown: true,
      children: [
        {path: 'user', component: User}
      ]
    },
    {
      path: '/system',
      name: '系统管理',
      component: Layout,
      icon: 'fa fa-cog',
      redirect: '/system/config',
      // noDropdown: true,
      children: [
        {path: 'config', component: Config, name: '系统设置'}
      ]
    }
  ]
})

export default router
