import Vue from 'vue'
import Router from 'vue-router'
import EditProductPage from '@/pages/ProductManagement/EditProductPage.vue'
import AuditStatusPage from '@/components/vendorRetail/AuditStatusPage.vue'

Vue.use(Router)

const commonRoutes = [
  {
    path: '/',
    component: () => import('../components/Login.vue'),
    redirect: '/ProductManagementPage'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue')
  },
  // {path: '/', redirect: '/ProductManagementPage'},
]

// 需要通过后台数据来生成的组件(与前端路由映射)
export const asyncRoutes = {
  'ProductManagementPage': {
    path: '/ProductManagementPage',
    name: 'ProductManagementPage',
    component: () => import('@/pages/ProductManagement/ProductManagementPage.vue')
  },
  'AddClassificationPage': {
    path: '/AddClassificationPage',
    name: 'AddClassificationPage',
    component: () => import('@/pages/ProductManagement/AddClassificationPage.vue')
  },
  'AddProductPage': {
    path: '/AddProductPage',
    name: 'AddProductPage',
    component: () => import('@/pages/ProductManagement/AddProductPage.vue')
  },
  'EditProductPage': {
    path: '/EditProductPage/:productId/:isEdit',
    name: 'EditProductPage',
    component: EditProductPage
  },
  'OrderDetailPage': {
    path: '/OrderDetailPage/:orderId/:page/:pageSize',
    name: 'OrderDetailPage',
    component: () => import('@/pages/OrderManagement/OrderDetailPage.vue')
  },
  'NonPayment': {
    path: '/NonPayment',
    name: 'NonPayment',
    component: () => import('@/pages/OrderManagement/NonPayment.vue')
  },
  'Unshipped': {
    path: '/Unshipped',
    name: 'Unshipped',
    component: () => import('@/pages/OrderManagement/Unshipped.vue')
  },
  'Shipped': {
    path: '/Shipped',
    name: 'Shipped',
    component: () => import('@/pages/OrderManagement/Shipped.vue')
  },
  'AfterProcessing': {
    path: '/AfterProcessing',
    name: 'AfterProcessing',
    component: () => import('@/pages/OrderManagement/AfterProcessing.vue')
  },
  'AllOrder': {
  path: '/AllOrder',
    name: 'AllOrder',
    component: () => import('@/pages/OrderManagement/AllOrder.vue')
},
  'VendorManagementPage': {
    path: '/VendorManagementPage',
    name: 'VendorManagementPage',
    component: () => import('@/pages/VendorManagement/VendorManagementPage.vue')
  },
  'UnCheckedVendorPage': {
    path: '/UnCheckedVendorPage',
    name: 'UnCheckedVendorPage',
    component: () => import('@/pages/VendorManagement/UnCheckedVendorPage.vue')
  },
  'NotPassVendorPage': {
    path: '/NotPassVendorPage',
    name: 'NotPassVendorPage',
    component: () => import('@/pages/VendorManagement/NotPassVendorPage.vue')
  },
  'CheckedVendorPage': {
    path: '/CheckedVendorPage',
    name: 'CheckedVendorPage',
    component: () => import('@/pages/VendorManagement/CheckedVendorPage.vue')
  },
  'CheckedVendorDetailPage': {
    path: '/CheckedVendorDetailPage/:vendorId',
    name: 'CheckedVendorDetailPage',
    component: () => import('@/pages/VendorManagement/CheckedVendorDetailPage.vue')
  },
  'DataManagementPage': {
    path: '/DataManagementPage',
    name: 'DataManagementPage',
    component: () => import('@/pages/DataManagement/DataManagementPage.vue')
  },
  'AccountManagementPage': {
    path: '/AccountManagementPage',
    name: 'AccountManagementPage',
    component: () => import('@/pages/AccountManagement/AccountManagementPage.vue')
  },
  'AccountDetailPage': {
    path: '/AccountDetailPage/:userId',
    name: 'AccountDetailPage',
    component: () => import('@/pages/AccountManagement/AccountDetailPage.vue')
  },
  'AccountAddPage': {
    path: '/AccountAddPage',
    name: 'AccountAddPage',
    component: () => import('@/pages/AccountManagement/AccountAddPage.vue')
  },
  'CheckedPage': {
    path: '/CheckedPage',
    name: 'CheckedPage',
    component: () => import('@/pages/RetailManagement/CheckedPage.vue')
  },
  'CheckedDetailPage': {
    path: '/CheckedDetailPage/:retailId',
    name: 'CheckedDetailPage',
    component: () => import('@/pages/RetailManagement/CheckedDetailPage.vue')
  },
  'UnCheckedPage': {
    path: '/UnCheckedPage',
    name: 'UnCheckedPage',
    component: () => import('@/pages/RetailManagement/UnCheckedPage.vue')
  },
  'NotPassPage': {
    path: '/NotPassPage',
    name: 'NotPassPage',
    component: () => import('@/pages/RetailManagement/NotPassPage.vue')
  },
  'AuditStatusPage': {
    path: '/AuditStatusPage/:id/:isVendor/:isAudit',
    name: 'AuditStatusPage',
    component: AuditStatusPage
  },
  'password': {
    path: 'password',
    name: 'password',
    component: () => import('../pages/Password.vue')
  }
}

const createRouter = () => new Router({
  routes: commonRoutes,
  // mode:"history"
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
