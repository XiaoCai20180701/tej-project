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
  }
]

export default frontRoutes
