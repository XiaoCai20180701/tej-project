import Vue from 'vue'
import Router from 'vue-router'
import EditProductPage from '@/pages/ProductManagement/EditProductPage.vue'
import AuditStatusPage from '@/components/vendorRetail/AuditStatusPage.vue'

Vue.use(Router)

const commonRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue')
  },
  // {
  //   path: '/',
  //   redirect: {
  //     name: 'login'
  //   }
  // },
]

// 需要通过后台数据来生成的组件(与前端路由映射)
export const asyncRoutes = {
  'ProductManagementPage': {
    path: '/ProductManagementPage',
    name: 'ProductManagementPage',
    meta: {
      requireAuth: true,
      breadcrumb:[
        {
          title:'商品管理',
          to:'/ProductManagementPage'
        },
      ]
    },
    component: () => import('@/pages/ProductManagement/ProductManagementPage.vue')
  },
  'AddClassificationPage': {
    path: '/AddClassificationPage',
    name: 'AddClassificationPage',
    meta: {
      breadcrumb:[
        {
          title:'商品管理',
          to:'/ProductManagementPage'
        },
        {
          title:'新增分类',
          to:'/AddClassificationPage'
        }
      ]
    },
    component: () => import('@/pages/ProductManagement/AddClassificationPage.vue')
  },
  'AddProductPage': {
    path: '/AddProductPage',
    name: 'AddProductPage',
    meta: {
      breadcrumb:[
        {
          title:'商品管理',
          to:'/ProductManagementPage'
        },
        {
          title:'新增商品',
          to:'/AddProductPage'
        }
      ],
    },
    component: () => import('@/pages/ProductManagement/AddProductPage.vue')
  },
  'EditProductPage': {
    path: '/EditProductPage/:productId/:isEdit',
    name: 'EditProductPage',
    meta: {
      breadcrumb:[
        {
          title:'商品管理',
          to:'/ProductManagementPage'
        },
        {
          title:'编辑商品信息',
          to:'/EditProductPage'
        }
      ]
    },
    component: EditProductPage
  },
  'OrderDetailPage': {
    path: '/OrderDetailPage/:orderId/:page/:pageSize',
    name: 'OrderDetailPage',
    meta: {
      breadcrumb:[
        {
          title:'订单管理',
          to:'/...'
        },
        {
          title:'订单详情',
          to:'/OrderDetailPage'
        }
      ]
    },
    component: () => import('@/pages/OrderManagement/OrderDetailPage.vue')
  },
  'NonPayment': {
    path: '/NonPayment',
    name: 'NonPayment',
    meta: {
      breadcrumb:[
        {
          title:'订单管理',
          to:'/NonPayment'
        },
        {
          title:'未付款',
          to:'/NonPayment'
        }
      ]
    },
    component: () => import('@/pages/OrderManagement/NonPayment.vue')
  },
  'Unshipped': {
    path: '/Unshipped',
    name: 'Unshipped',
    meta: {
      breadcrumb:[
        {
          title:'订单管理',
          to:'/Unshipped'
        },
        {
          title:'未发货',
          to:'/Unshipped'
        }
      ],
    },
    component: () => import('@/pages/OrderManagement/Unshipped.vue')
  },
  'Shipped': {
    path: '/Shipped',
    name: 'Shipped',
    meta: {
      breadcrumb:[
        {
          title:'订单管理',
          to:'/Shipped'
        },
        {
          title:'已发货',
          to:'/Shipped'
        }
      ]
    },
    component: () => import('@/pages/OrderManagement/Shipped.vue')
  },
  'AfterProcessing': {
    path: '/AfterProcessing',
    name: 'AfterProcessing',
    meta: {
      breadcrumb:[
        {
          title:'订单管理',
          to:'/AfterProcessing'
        },
        {
          title:'售后处理',
          to:'/AfterProcessing'
        }
      ]
    },
    component: () => import('@/pages/OrderManagement/AfterProcessing.vue')
  },
  'AllOrder': {
  path: '/AllOrder',
    name: 'AllOrder',
    component: () => import('@/pages/OrderManagement/AllOrder.vue')
},
  'UnCheckedVendorPage': {
    path: '/UnCheckedVendorPage',
    name: 'UnCheckedVendorPage',
    meta: {
      breadcrumb:[
        {
          title:'厂家管理',
          to:'/UnCheckedVendorPage'
        },
        {
          title:'待审核',
          to:'/UnCheckedVendorPage'
        }
      ]
    },
    component: () => import('@/pages/VendorManagement/UnCheckedVendorPage.vue')
  },
  'NotPassVendorPage': {
    path: '/NotPassVendorPage',
    name: 'NotPassVendorPage',
    meta: {
      breadcrumb:[
        {
          title:'厂家管理',
          to:'/NotPassVendorPage'
        },
        {
          title:'未通过',
          to:'/NotPassVendorPage'
        }
      ]
    },
    component: () => import('@/pages/VendorManagement/NotPassVendorPage.vue')
  },
  'CheckedVendorPage': {
    path: '/CheckedVendorPage',
    name: 'CheckedVendorPage',
    meta: {
      breadcrumb:[
        {
          title:'厂家管理',
          to:'/CheckedVendorPage'
        },
        {
          title:'已通过',
          to:'/CheckedVendorPage'
        }
      ]
    },
    component: () => import('@/pages/VendorManagement/CheckedVendorPage.vue')
  },
  'CheckedVendorDetailPage': {
    path: '/CheckedVendorDetailPage/:vendorId',
    name: 'CheckedVendorDetailPage',
    meta: {
      breadcrumb:[
        {
          title:'厂家管理',
          to:'/CheckedVendorPage'
        },
        {
          title:'已通过',
          to:'/CheckedVendorPage'
        },
        {
          title:'厂家详情',
          to:'/CheckedVendorDetailPage'
        }
      ]
    },
    component: () => import('@/pages/VendorManagement/CheckedVendorDetailPage.vue')
  },
  'DataManagementPage': {
    path: '/DataManagementPage',
    name: 'DataManagementPage',
    meta: {
     breadcrumb:[
       {
         title:'数据管理',
         to:'/DataManagementPage'
       }
     ]
   },
    component: () => import('@/pages/DataManagement/DataManagementPage.vue')
  },
  'AccountManagementPage': {
    path: '/AccountManagementPage',
    name: 'AccountManagementPage',
    meta: {
      breadcrumb:[
        {
          title:'账户管理',
          to:'/AccountManagementPage'
        }
      ]
    },
    component: () => import('@/pages/AccountManagement/AccountManagementPage.vue')
  },
  'AccountDetailPage': {
    path: '/AccountDetailPage/:userId/:isDetail',
    name: 'AccountDetailPage',
    meta: {
      breadcrumb:[
        {
          title:'账户管理',
          to:'/AccountManagementPage'
        },
        {
          title:'账户详情',
          to:'/AccountDetailPage'
        }
      ],
    },
    component: () => import('@/pages/AccountManagement/AccountDetailPage.vue')
  },
  'AccountAddPage': {
    path: '/AccountAddPage',
    name: 'AccountAddPage',
    meta: {
      breadcrumb:[
        {
          title:'账户管理',
          to:'/AccountManagementPage'
        },
        {
          title:'添加账户',
          to:'/AccountAddPage'
        }
      ],
    },
    component: () => import('@/pages/AccountManagement/AccountAddPage.vue')
  },
  'AccountCenterPage': {
    path: '/AccountCenterPage/:userId/:isDetail',
    name: 'AccountCenterPage',
    meta: {
      breadcrumb:[
        // {
        //   title:'账户管理',
        //   to:'/AccountManagementPage'
        // },
        {
          title:'个人中心',
          to:'/AccountCenterPage'
        }
      ],
    },
    component: () => import('@/pages/AccountManagement/AccountCenterPage.vue')
  },
  'CheckedPage': {
    path: '/CheckedPage',
    name: 'CheckedPage',
    meta: {
      breadcrumb:[
        {
          title:'商家管理',
          to:'/CheckedVendorPage'
        },
        {
          title:'已通过',
          to:'/CheckedVendorPage'
        }
      ]
    },
    component: () => import('@/pages/RetailManagement/CheckedPage.vue')
  },
  'CheckedDetailPage': {
    path: '/CheckedDetailPage/:retailId',
    name: 'CheckedDetailPage',
    meta: {
      breadcrumb:[
        {
          title:'商家管理',
          to:'/CheckedVendorPage'
        },
        {
          title:'已通过',
          to:'/CheckedVendorPage'
        },
        {
          title:'商家详情',
          to:'/CheckedVendorDetailPage'
        }
      ]
    },
    component: () => import('@/pages/RetailManagement/CheckedDetailPage.vue')
  },
  'UnCheckedPage': {
    path: '/UnCheckedPage',
    name: 'UnCheckedPage',
    meta: {
      breadcrumb:[
        {
          title:'商家管理',
          to:'/UnCheckedPage'
        },
        {
          title:'待审核',
          to:'/UnCheckedPage'
        },
      ]
    },
    component: () => import('@/pages/RetailManagement/UnCheckedPage.vue')
  },
  'NotPassPage': {
    path: '/NotPassPage',
    name: 'NotPassPage',
    meta: {
      breadcrumb:[
        {
          title:'商家管理',
          to:'/NotPassPage'
        },
        {
          title:'未通过',
          to:'/NotPassPage'
        },
      ]
    },
    component: () => import('@/pages/RetailManagement/NotPassPage.vue')
  },
  'AuditStatusPage': {
    path: '/AuditStatusPage/:id/:isVendor/:isAudit',
    name: 'AuditStatusPage',
    meta: {
      breadcrumb:[
        {
          title:'商家管理',
          to:'/UnCheckedPage.'
        },
        {
          title:'待审核',
          to:'/UnCheckedPage'
        },
        {
          title:'审核页面',
          to:'/AuditStatusPage'
        },
      ]
    },
    component: AuditStatusPage
  },
  'PlatformPage': {
    path: '/PlatformPage',
    name: 'PlatformPage',
    meta: {
      breadcrumb:[
        {
          title:'投诉管理',
          to:'/PlatformPage'
        },
        {
          title:'平台问题',
          to:'/PlatformPage'
        },
      ]
    },
    component: () => import('@/pages/ComplaintManagement/PlatformPage.vue')
  },
  'ProductPage': {
    path: '/ProductPage',
    name: 'ProductPage',
    meta: {
      breadcrumb:[
        {
          title:'投诉管理',
          to:'/ProductPage'
        },
        {
          title:'商品问题',
          to:'/ProductPage'
        }
      ]
    },
    component: () => import('@/pages/ComplaintManagement/ProductPage.vue')
  },
  'ServicePage': {
    path: '/ServicePage',
    name: 'ServicePage',
    meta: {
      breadcrumb:[
        {
          title:'投诉管理',
          to:'/ServicePage'
        },
        {
          title:'服务投诉',
          to:'/ServicePage'
        }
      ]
    },
    component: () => import('@/pages/ComplaintManagement/ServicePage.vue')
  },
  'FrontManagementPage': {
    path: '/FrontManagementPage',
    name: 'FrontManagementPage',
    meta: {
      breadcrumb:[
        {
          title:'前台管理',
          to:'/FrontManagementPage'
        }
      ]
    },
    component: () => import('@/pages/FrontManagement/FrontManagementPage.vue')
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
