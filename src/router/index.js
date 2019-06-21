import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import Layout from '@/layout/layout'

Vue.use(Router)

/**
 * alwaysShow: true           if set true, will always show the root menu, whatever its child routes length
 *                            if not set alwaysShow, only more than ont route under the children
 *                            it will becomes nested mode, otherwise not show the root menu
 * alwaysShow: true           如果设置为true,它将总是现在在根目录。如果不设置的话，当它只有1个子路由的时候，会把
 *                            它的唯一子路由放到跟目录上来，而不显示它自己本身。
 */

export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    hidden: true,
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/homepage'),
        meta: {title: '首页'}
      }
    ]
  },
  {
    path: '/',
    hidden: true,
    component: Layout,
    redirect: '/app_user',
    children: [
      {
        path: 'app_user',
        name: 'app_user',
        component: () => import('@/views/app_user'),
        meta: {title: '用户管理'}
      }
    ]
  },
  {
    path: '/',
    hidden: true,
    component: Layout,
    redirect: '/Train',
    children: [
      {
        path: 'Train',
        name: 'Train',
        component: () => import('@/views/Route_type/Train'),
        meta: {title: '直达系列'}
      }
    ]
  },
  {
    path: '/',
    hidden: true,
    component: Layout,
    redirect: '/Train_Transfer',
    children: [
      {
        path: 'Train_Transfer',
        name: 'Train_Transfer',
        component: () => import('@/views/Route_type/Train_Transfer'),
        meta: {title: '中转系列'}
      }
    ]
  },
  {
    path: '/',
    hidden: true,
    component: Layout,
    redirect: '/Automobile',
    children: [
      {
        path: 'Automobile',
        name: 'Automobile',
        component: () => import('@/views/Route_type/Automobile'),
        meta: {title: '巴车数据'}
      }
    ]
  },
  {
    path: '/',
    hidden: true,
    component: Layout,
    redirect: '/Aircraft',
    children: [
      {
        path: 'Aircraft',
        name: 'Aircraft',
        component: () => import('@/views/Route_type/Aircraft'),
        meta: {title: '航班数据'}
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    meta: {
      icon: 'tickets',
      title: '个人中心'
    },
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/user/profile'),
        meta: {icon: 'warning', title: '个人中心'}
      },
      {
        path: 'avatar',
        name: 'Avatar',
        component: () => import('@/views/user/profile'),
        meta: {icon: 'warning', title: '修改头像'}
      }
    ]
  },
  {
    path: '/introduction',
    component: Layout,
    redirect: '/introduction/index',
    // alwaysShow: true,
    meta: {
      icon: 'svg-aperture',
      title: '简述'
    },
    children: [
      {
        path: 'index',
        name: 'Introduction',
        component: () => import('@/views/introduction/index'),
        meta: {icon: 'question', title: '简述'}
      }
    ]
  },
  {
    path: '/custom-component',
    component: Layout,
    meta: {
      icon: 'question',
      title: '自定义组件'
    },
    redirect: '/custom-component/index',
    children: [
      {
        path: 'index',
        name: 'CustomComponent',
        component: () => import('@/views/custom-component/index'),
        meta: {icon: 'warning', title: '自定义组件'}
      }
    ]
  }
]

export default new Router({
  // mode: 'history',  require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    alwaysShow: true,
    meta: {
      title: '表格',
      icon: 'edit'
    },
    children: [
      {
        path: 'export-excel',
        name: '导出表格',
        component: () => import('@/views/excel/export-excel'),
        meta: {icon: 'arrow-left', title: 'exportExcel'}
      },
      {
        path: 'upload-excel',
        name: '上传表格',
        component: () => import('@/views/excel/upload-excel'),
        meta: {icon: 'minus', title: 'uploadExcel'}
      }
    ]
  },
  {
    path: '/clipboard',
    component: Layout,
    redirect: 'index',
    meta: {
      icon: 'document',
      title: '剪切板'
    },
    children: [
      {
        path: 'index',
        name: 'clipBoard',
        component: () => import('@/views/clipboard'),
        meta: {title: '剪切板示例', icon: 'document'}
      }
    ]
  }
]