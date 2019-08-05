/**
 * 商品管理
 * */
export const productManagementTable = [
  {
    'title': '编号',
    'key': 'id'
  },
  {
    'title': '商品类别',
    'key': 'typeName'
  },
  {
    'title': '商品名称',
    'key': 'name'
  },
  {
    'title': '零售价',
    'key': 'priceSale',
    'sortable': true
  },
  {
    'title': '库存',
    'key': 'inventory',
    'sortable': true
  },
  {
    'title': '访问量',
    'key': 'access',
    'sortable': true
  },
  {
    'title': '销量',
    'key': 'numberSale',
    'sortable': true
  },
  {
    'title': '厂商',
    'key': 'vendorName'
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
    'title': '编号',
    'key': 'id'
  },
  {
    'title': '商家名称',
    'key': 'name'
  },
  {
    'title': '所在省市',
    'key': 'city'
  },
  {
    'title': '联系人',
    'key': 'contact'
  },
  {
    'title': '联系号码',
    'key': 'mobile'
  },
  {
    'title': '成交订单数',
    'key': 'orderNum'
  },
  {
    'title': '总成交额',
    'key': 'orderMoney'
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
    'title': '商家名称',
    'key': 'name'
  },
  {
    'title': '所在省市',
    'key': 'city'
  },
  {
    'title': '联系人',
    'key': 'contact'
  },
  {
    'title': '联系号码',
    'key': 'mobile'
  },
  {
    'title': '经营许可证',
    'key': 'licenceImg'
  },
  {
    'title': '生产环境',
    'key': 'environmentImgList'
  },
  {
    'title': '店铺商标',
    'key': 'brandImg'
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
    'title': '商家名称',
    'key': 'name'
  },
  {
    'title': '所在省市',
    'key': 'city'
  },
  {
    'title': '联系人',
    'key': 'contact'
  },
  {
    'title': '联系号码',
    'key': 'mobile'
  },
  {
    'title': '未通过理由',
    'key': 'reason'
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
export const auditType = {
  'checked': 1,
  'unChecked': 2,
  'notPass': 3,
}

/**
 * 厂商管理 => 已审核列表
 * */
export const checkedVendorTable = [
  {
    'title': '编号',
    'key': 'id'
  },
  {
    'title': '商家名称',
    'key': 'name'
  },
  {
    'title': '所在省市',
    'key': 'city'
  },
  {
    'title': '联系人',
    'key': 'contact'
  },
  {
    'title': '联系号码',
    'key': 'mobile'
  },
  {
    'title': '总销售额',
    'key': 'orderMoney'
  },
  {
    'title': '总访问量',
    'key': 'orderNum'
  },
  {
    'title': '总商品数',
    'key': 'totalProductNumber'
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
    'title': '厂家名称',
    'key': 'name'
  },
  {
    'title': '所在省市',
    'key': 'city'
  },
  {
    'title': '联系人',
    'key': 'contact'
  },
  {
    'title': '联系号码',
    'key': 'mobile'
  },
  {
    'title': '生产许可证',
    'key': 'licenceImg',
    'slot': 'licenceImg'
  },
  {
    'title': '生产环境',
    'key': 'vendorEnvironmentImg',
    'slot': 'vendorEnvironmentImg'
  },
  {
    'title': '品牌商标',
    'key': 'trademarkImg',
    'slot': 'trademarkImg'
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
    'title': '厂家名称',
    'key': 'name'
  },
  {
    'title': '所在省市',
    'key': 'city'
  },
  {
    'title': '联系人',
    'key': 'contact'
  },
  {
    'title': '联系号码',
    'key': 'mobile'
  },
  {
    'title': '未通过理由',
    'key': 'reason'
  },
  {
    title: '操作',
    slot: 'action',
  }
]

/**
 * 数据管理 => 全站商品销售量
 * */
export const productSaleTable = [
  {
    'title': '编号',
    'key': 'productId'
  },
  {
    'title': '商品名称',
    'key': 'productName'
  },
  {
    'title': '厂商',
    'key': 'vendorName'
  },
  {
    'title': '销量(件)',
    'key': 'number'
  },
]

/**
 * 数据管理 => 全站商品访问量
 * */
export const productTrafficTable = [
  {
    'title': '商品编号',
    'key': 'productId'
  },
  {
    'title': '商品名称',
    'key': 'productName'
  },
  {
    'title': '厂商',
    'key': 'vendorName'
  },
  {
    'title': '地区',
    'key': 'city'
  },
  {
    'title': '访问量(次)',
    'key': 'number'
  },
]

/**
 * 数据管理 => 畅销厂商
 * */
export const vendorSaleTable = [
  {
    'title': '编号',
    'key': 'vendorId'
  },
  {
    'title': '厂商',
    'key': 'vendorName'
  },
  {
    'title': '地区',
    'key': 'city'
  },
  {
    'title': '销量(件)',
    'key': 'number'
  },
]

/**
 * 数据管理 => 厂商访问量
 * */
export const vendorTrafficTable = [
  {
    'title': '编号',
    'key': 'vendorId'
  },
  {
    'title': '厂商',
    'key': 'vendorName'
  },
  {
    'title': '地区',
    'key': 'city'
  },
  {
    'title': '销量(件)',
    'key': 'number'
  },
]


/**
 * 数据管理 => 全站前十厂商、商家合作次数(回头客)
 * */
export const cooperationTable = [
  {
    'title': '编号',
    'key': 'vendorId'
  },
  {
    'title': '厂商',
    'key': 'vendorName'
  },
  {
    'title': '零售商',
    'key': 'retailName'
  },
  {
    'title': '合作次数',
    'key': 'number'
  },
]

/**
 * 账户管理 => 列表
 * */
export const accountTable = [
  {
    'title': '账户编号',
    'key': 'userId'
  },
  {
    'title': '账户昵称',
    'key': 'userName'
  },
  {
    'title': '默认角色',
    'key': 'roleName'
  },
  {
    'title': '绑定手机号',
    'key': 'mobile'
  },
  {
    'title': '备注信息',
    'key': 'message'
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
export const orderType = {
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
export const roleType = {
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
export const userStatusType = {
  'enable': 1,
  'disable': 0,
}

/**
 * 账户管理 => 菜单授权状态
 * 0:无权限 1:有权限
 * */
export const authType = {
  'auth': 1,
  'noAuth': 0,
}

/**
 * 数据管理 => 排行榜统一
 * 1:商品销量 2:商品访问量 3.厂商销量 4.厂商、零售商合作排行
 * */
export const dataStatus = {
  'commoditySales': 1,
  'commodityTraffic': 2,
  'vendorSales': 3,
  'cooperation': 4
}

/**
 * 账单状态
 * 1:订单收入 2:提现 3.订货扣款 4.账号充值  5.余额提现
 * */
export const billTypeList = [
  {
    'id': 1,
    'name': '订单收入'
  },
  {
    'id': 2,
    'name': '提现'
  },
  {
    'id': 3,
    'name': '订货扣款'
  },
  {
    'id': 4,
    'name': '账号充值'
  },
  {
    'id': 5,
    'name': '余额提现'
  }
]
// {
//   'orderIncome': 1,
//   'withdrawal': 2,
//   'OrderDeductions': 3,
//   'accountsPrepaid': 4,
//   'balanceWithdrawal': 5
// }

