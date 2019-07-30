const frontRoutes = [
  {
    name: 'ProductManagementPage', // 要跳转的路由名称 不是路径
    // size: 18, // icon大小
    type: 'md-home', // icon类型
    text: '商品管理', // 文本内容,
    meta: {
      requireAuth: true
    }
  },
  {
    name: 'AddClassificationPage',
    type: 'md-home', // icon类型
    text: '新增商品分类', // 文本内容,
    meta: {
      requireAuth: false
    }
  },
  {
    name: 'AddProductPage',
    type: 'md-home', // icon类型
    text: '新增商品', // 文本内容,
    meta: {
      requireAuth: false
    }
  },
  {
    name: 'EditProductPage',
    type: 'md-home', // icon类型
    text: '编辑商品', // 文本内容,
    meta: {
      requireAuth: false
    }
  },
  {
    text: '零售商管理',
    type: 'ios-paper',
    meta: {
      requireAuth: false
    },
    children: [{
      type: 'ios-grid',
      name: 'CheckedPage',
      text: '已审核'
    },
      {
        type: 'ios-grid',
        name: 'CheckedDetailPage',
        text: '零售商详情'
      },
      {
        type: 'ios-grid',
        name: 'UnCheckedPage',
        text: '待审核'
      },
      {
        type: 'ios-grid',
        name: 'NotPassPage',
        text: '未通过'
      },
      {
        type: 'ios-grid',
        name: 'AuditStatusPage',
        text: '审核详情'
      }
    ]
  },
  {
    text: '厂商管理',
    type: 'ios-paper',
    meta: {
      requireAuth: false
    },
    children: [{
      type: 'ios-grid',
      name: 'CheckedVendorPage',
      text: '已审核'
    },
      {
        type: 'ios-grid',
        name: 'CheckedVendorDetailPage',
        text: '厂商详情'
      },
      {
        type: 'ios-grid',
        name: 'UnCheckedVendorPage',
        text: '待审核'
      },
      {
        type: 'ios-grid',
        name: 'NotPassVendorPage',
        text: '未通过'
      },
      {
        type: 'ios-grid',
        name: 'VendorManagementPage',
        text: '全部厂商'
      }
    ]
  },
  {
    text: '订单管理',
    type: 'ios-paper',
    meta: {
      requireAuth: false
    },
    children: [
      {
        type: 'ios-grid',
        name: 'NonPayment',
        text: '未付款'
      },
      {
        type: 'ios-grid',
        name: 'OrderDetailPage',
        text: '订单详情'
      },
      {
        text: '未发货',
        type: 'ios-paper',
        name: 'Unshipped'
      },
      {
        text: '已发货',
        type: 'ios-paper',
        name: 'Shipped'
      },
      {
        text: '售后处理',
        type: 'ios-paper',
        name: 'AfterProcessing'
      },
      {
        text: '全部订单',
        type: 'ios-paper',
        name: 'AllOrder'
      }
    ]
  },
  {
    name: 'DataManagementPage',
    type: 'md-home',
    text: '数据管理',
    meta: {
      requireAuth: true
    }
  },
  {
    name: 'AccountManagementPage',
    type: 'md-home',
    text: '账户管理',
    meta: {
      requireAuth: true
    }
  },
  {
    name: 'AccountDetailPage',
    type: 'md-home',
    text: '账户详情',
    meta: {
      requireAuth: true
    }
  },
  {
    name: 'AccountAddPage',
    type: 'md-home',
    text: '添加账户',
    meta: {
      requireAuth: true
    }
  }
]

export default frontRoutes
