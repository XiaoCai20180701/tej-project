/**
 * frontRoutes前端路由表，当不需要在菜单中显示时，设置 meta: {refreshShow: false}
 * */
const frontRoutes = [
  {
    name: 'ProductManagementPage', // 要跳转的路由名称 不是路径
    // size: 18, // icon大小
    type: 'icon-gongnengdingyi', // icon类型
    text: '商品管理', // 文本内容,
    meta: {
      requireAuth: true,
      title: '商品管理'
    }
  },
  {
    name: 'AddClassificationPage',
    type: '', // icon类型
    text: '新增商品分类', // 文本内容,
    meta: {
      refreshShow: false,
      title: '新增商品分类'
    }
  },
  {
    name: 'AddProductPage',
    type: '', // icon类型
    text: '新增商品', // 文本内容,
    meta: {
      refreshShow: false,
      title: '新增商品'
    }
  },
  {
    name: 'EditProductPage',
    path: '/EditProductPage',
    type: '', // icon类型
    text: '编辑商品', // 文本内容,
    meta: {
      refreshShow: false,
      title: '编辑商品'
    }
  },
  {
    text: '商家管理',
    type: 'icon-icon_zhanghao',
    meta: {
      requireAuth: false
    },
    children: [
      {
        type: '',
        name: 'UnCheckedPage',
        text: '待审核'
      },
      {
        type: '',
        name: 'CheckedPage',
        text: '已通过'
      },
      
      {
        type: '',
        name: 'NotPassPage',
        text: '未通过'
      },
    
    ]
  },
  {
    type: '',
    name: 'CheckedDetailPage',
    text: '商家管理详情',
    meta: {
      refreshShow: false
    }
  },
  {
    type: '',
    name: 'AuditStatusPage',
    text: '审核详情',
    meta: {
      refreshShow: false
    }
  },
  {
    text: '厂家管理',
    type: 'icon-yuanquyunwei',
    meta: {
      requireAuth: false
    },
    children: [
      {
        type: '',
        name: 'UnCheckedVendorPage',
        text: '待审核'
      },
      {
        type: '',
        name: 'CheckedVendorPage',
        text: '已通过'
      },
      {
        type: '',
        name: 'NotPassVendorPage',
        text: '未通过'
      },
    ]
  },
  {
    type: '',
    name: 'CheckedVendorDetailPage',
    text: '厂家详情',
    meta: {
      refreshShow: false
    }
  },
  {
    type: '',
    name: 'EditVendorPage',
    text: '修改厂家信息',
    meta: {
      refreshShow: false
    }
  },
  {
    text: '订单管理',
    type: 'icon-shiyongwendang',
    meta: {
      requireAuth: false
    },
    children: [
      {
        type: '',
        name: 'NonPayment',
        text: '待付款'
      },
      {
        text: '待发货',
        type: '',
        name: 'Unshipped'
      },
      {
        text: '已发货',
        type: '',
        name: 'Shipped'
      },
      {
        text: '待收货',
        type: '',
        name: 'WaittingPage'
      },
      {
        text: '待评价',
        type: '',
        name: 'EvaluatedPage'
      },
      {
        text: '退换货',
        type: '',
        name: 'ChangingRefundingPage'
      },
      {
        text: '售后处理',
        type: 'ios-paper',
        name: 'AfterProcessing'
      },
      {
        text: '全部订单',
        type: '',
        name: 'AllOrder'
      }
    ]
  },
  {
    type: '',
    name: 'OrderDetailPage',
    text: '订单详情',
    meta: {
      refreshShow: false
    }
  },
  {
    name: 'DataManagementPage',
    type: 'icon-tubiao-zhuzhuangtu',
    text: '数据管理',
    meta: {
      requireAuth: true
    }
  },
  {
    name: 'AccountManagementPage',
    type: 'icon-shujuwajue',
    text: '账户管理',
    meta: {
      requireAuth: true,
    },
  },
  {
    name: 'AccountDetailPage',
    type: '',
    text: '账户详情',
    meta: {
      refreshShow: false
    }
  },
  {
    name: 'AccountAddPage',
    type: '',
    text: '添加账户',
    meta: {
      refreshShow: false
    }
  },
  {
    name: 'AccountCenterPage',
    type: '',
    text: '个人中心',
    meta: {
      refreshShow: false
    }
  },
  {
    type: 'icon-gaojingkongxin',
    text: '投诉管理',
    meta: {
      requireAuth: false
    },
    children: [
      {
        name: 'PlatformPage',
        type: '',
        text: '平台问题',
      },
      {
        name: 'ProductPage',
        type: '',
        text: '商品问题',
      },
      {
        name: 'ServicePage',
        type: '',
        text: '服务投诉',
      }
    ]
  },
  {
    name: 'FrontManagementPage',
    type: 'icon-shebeizhuangtai',
    text: '前台管理',
    meta: {
      requireAuth: true
    }
  },
  {
    text: '营销管理',
    type: 'icon-youhui',
    meta: {
      requireAuth: false
    },
    children: [
      {
        name: 'MarketingCouponPage',
        type: '',
        text: '优惠劵',
      },
      {
        name: 'MarketingDiscountPage',
        type: '',
        text: '折扣',
      }
    ]
  },
  {
    name: 'AddCoupon',
    type: '',
    text: '添加优惠劵',
    meta: {
      refreshShow: false
    }
  },
  {
    name: 'AddDiscount',
    type: '',
    text: '添加折扣',
    meta: {
      refreshShow: false
    }
  },
  {
    name: 'CouponDetail',
    type: '',
    text: '优惠劵详情',
    meta: {
      refreshShow: false
    }
  },
  {
    name: 'LogisticsListPage',
    type: 'icon-ditu',
    text: '物流管理',
    meta: {
      requireAuth: false
    },
  },
  {
    name: 'AddLogistics',
    type: 'icon-ditu',
    text: '新增运费模板',
    meta: {
      refreshShow: false
    }
  },
  {
    name: 'EditLogistics',
    type: 'icon-ditu',
    text: '修改运费模板',
    meta: {
      refreshShow: false
    }
  },
  {
    name: 'AdministrationPage',
    type: 'icon-zuzhiqunzu',
    text: '行政管理',
    meta: {
      requireAuth: true
    }
  },
]

export default frontRoutes
