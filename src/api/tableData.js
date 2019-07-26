/**
 * 商品管理
 * */
export const productManagementTable = [
  {
    'title': '编号'
  },
  {
    'title': '商品类别'
  },
  {
    'title': '商品名称'
  },
  {
    'title': '零售价',
    'sortable': true
  },
  {
    'title': '库存',
    'sortable': true
  },
  {
    'title': '访问量',
    'sortable': true
  },
  {
    'title': '销量',
    'sortable': true
  },
  {
    'title': '厂商'
  },
  {
    title: '操作',
    slot: 'action',
  }
]

/**
* 零售商管理 => 已审核列表
* */
export const checkedRetailTable = [
  {
    'title': '编号'
  },
  {
    'title': '商家名称'
  },
  {
    'title': '所在省市'
  },
  {
    'title': '联系人'
  },
  {
    'title': '联系号码'
  },
  {
    'title': '成交订单数'
  },
  {
    'title': '总成交额'
  },
  {
    title: '操作',
    slot: 'action',
  }
]

/**
 * 零售商管理 => 待审核列表
 * */
export const unCheckedRetailTable = [
  {
    'title': '商家名称'
  },
  {
    'title': '所在省市'
  },
  {
    'title': '联系人'
  },
  {
    'title': '联系号码'
  },
  {
    'title': '经营许可证'
  },
  {
    'title': '生产环境'
  },
  {
    'title': '店铺商标'
  },
  {
    title: '操作',
    slot: 'action',
  }
]

/**
 * 零售商管理 => 未通过列表
 * */
export const notPassRetailTable = [
  {
    'title': '商家名称'
  },
  {
    'title': '所在省市'
  },
  {
    'title': '联系人'
  },
  {
    'title': '联系号码'
  },
  {
    'title': '未通过理由'
  },
  {
    title: '操作',
    slot: 'action',
  }
]

/**
 * 厂商、零售商管理 => 审核状态
 * 1:已审核  2:待审核 3:未通过
 * */
export const  auditType = {
  'checked': 1,
  'unChecked': 2,
  'notPass': 3,
}

/**
 * 厂商管理 => 已审核列表
 * */
export const checkedVendorTable = [
  {
    'title': '编号'
  },
  {
    'title': '商家名称'
  },
  {
    'title': '所在省市'
  },
  {
    'title': '联系人'
  },
  {
    'title': '联系号码'
  },
  {
    'title': '总销售额'
  },
  {
    'title': '总访问量'
  },
  {
    'title': '总商品数'
  },
  {
    title: '操作',
    slot: 'action',
  }
]

/**
 * 厂商管理 => 待审核列表
 * */
export const unCheckedVendorTable = [
  {
    'title': '厂家名称'
  },
  {
    'title': '所在省市'
  },
  {
    'title': '联系人'
  },
  {
    'title': '联系号码'
  },
  {
    'title': '生产许可证'
  },
  {
    'title': '生产环境'
  },
  {
    'title': '品牌商标'
  },
  {
    title: '操作',
    slot: 'action',
  }
]

/**
 * 厂商管理 => 未通过列表
 * */
export const notPassVendorTable = [
  {
    'title': '厂家名称'
  },
  {
    'title': '所在省市'
  },
  {
    'title': '联系人'
  },
  {
    'title': '联系号码'
  },
  {
    'title': '未通过理由'
  },
  {
    title: '操作',
    slot: 'action',
  }
]

/**
 * 数据管理 => 全站销量前十商品排行榜
 * */
export const  productSaleTable = [
  {
    'title': '编号'
  },
  {
    'title': '商品名称'
  },
  {
    'title': '厂商'
  },
  {
    'title': '销量(件)'
  },
]

/**
 * 数据管理 => 全站访问量前十商品排行榜
 * */
export const  productAccessTable = [
  {
    'title': '编号'
  },
  {
    'title': '商品名称'
  },
  {
    'title': '厂商'
  },
  {
    'title': '访问量(次)'
  },
]

/**
 * 数据管理 => 全站销量前十厂商
 * */
export const  vendorSaleTable = [
  {
    'title': '编号'
  },
  {
    'title': '厂商'
  },
  {
    'title': '地区'
  },
  {
    'title': '销量(件)'
  },
]

/**
 * 数据管理 => 全站前十厂商、商家合作次数
 * */
export const  cooperationTable = [
  {
    'title': '编号'
  },
  {
    'title': '厂商'
  },
  {
    'title': '零售商'
  },
  {
    'title': '合作次数'
  },
]

/**
 * 账户管理 => 列表
 * */
export const accountTable = [
  {
    'title': '账户编号'
  },
  {
    'title': '账户昵称'
  },
  {
    'title': '默认角色'
  },
  {
    'title': '绑定手机号'
  },
  {
    'title': '备注信息'
  },
  {
    'title': '操作',
    'slot': 'action'
  }
]

/**
 * 订单管理 => 订单状态
 * 0:未付款  1:未发货  2:已收货 3:已发货 4:已评价 5:退换货
 * */
export const  orderType = {
  'nonPayment': 0,
  'unshipped': 1,
  'payment': 2,
  'shipped': 3,
  'evaluate': 4,
  'afterProcessing': 5
}
/**
 * 账户管理 => 角色
 * 1:管理员 2:产品运营 3:营销管理 4:售前售后 5:行政管理
 * */
export const  roleType = {
  'admin': 1,
  'productOperation': 2,
  'marketingManagement': 3,
  'preAfterSales': 4,
  'administrativeManagement': 5
}

/**
 * 账户管理 => 账户状态
 * 0:未启用 1:启用
 * */
export const  userStatusType = {
  'enable': 1,
  'disable': 0,
}

/**
 * 账户管理 => 菜单授权状态
 * 0:无权限 1:有权限
 * */
export const  authType = {
  'auth': 1,
  'noAuth': 0,
}



