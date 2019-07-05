import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const commonRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue')
  },
  {path: '/', redirect: '/login'},
]

// 需要通过后台数据来生成的组件(与前端路由映射)
export const asyncRoutes = {
  'CommodityManagement': {
    path: 'CommodityManagement',
    name: 'CommodityManagement',
    component: () => import('@/pages/CommodityManagement.vue')
  },
  'NonPayment': {
    path: 'NonPayment',
    name: 'NonPayment',
    component: () => import('@/pages/OrderManagement/NonPayment.vue')
  },
  'Unshipped': {
    path: 'Unshipped',
    name: 'Unshipped',
    component: () => import('@/pages/OrderManagement/Unshipped.vue')
  },
  'Shipped': {
    path: 'Shipped',
    name: 'Shipped',
    component: () => import('@/pages/OrderManagement/Shipped.vue')
  },
  'AfterProcessing': {
    path: 'AfterProcessing',
    name: 'AfterProcessing',
    component: () => import('@/pages/OrderManagement/AfterProcessing.vue')
  },
  'AllOrder': {
  path: 'AllOrder',
    name: 'AllOrder',
    component: () => import('@/pages/OrderManagement/AllOrder.vue')
},
  'password': {
    path: 'password',
    name: 'password',
    component: () => import('../pages/Password.vue')
  }
}

const createRouter = () => new Router({
  routes: commonRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
