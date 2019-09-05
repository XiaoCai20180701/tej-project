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
    'title': '厂家',
    'key': 'vendorName'
  },
  {
    title: '操作',
    slot: 'action',
  }
]

/**
 * 商家管理 => 已审核列表
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
 * 商家管理 => 待审核列表
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
    'key': 'licenceImg',
    'slot': 'licenceImg'
  },
  {
    'title': '生产环境',
    'key': 'environmentImgList',
    'slot': 'environmentImgList'
  },
  {
    'title': '店铺商标',
    'key': 'brandImg',
    'slot': 'brandImg'
  },
  {
    title: '操作',
    slot: 'action',
  }
]

/**
 * 商家管理 => 未通过列表
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
 * 厂家、商家管理 => 审核状态
 * 1:已审核  2:待审核 3:未通过
 * */
export const auditType = {
  'checked': 1,
  'unChecked': 2,
  'notPass': 3,
}

/**
 * 厂家管理 => 已审核列表
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
 * 厂家管理 => 待审核列表
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
    'key': 'environmentImgList',
    'slot': 'environmentImgList'
  },
  {
    'title': '品牌商标',
    'key': 'brandImg',
    'slot': 'brandImg'
  },
  {
    title: '操作',
    slot: 'action',
  }
]

/**
 * 厂家管理 => 未通过列表
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
 * 厂家管理 => 厂家详情表格(平台)
 * */
export const vendorPlatformTable = [
  {
    'title': '编号',
    'key': 'productId'
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
    'title': '商品货号',
    'key': 'productNo'
  },
  {
    'title': '零售价',
    'key': 'priceSale'
  },
  {
    'title': '库存',
    'key': 'inventory'
  },
  {
    'title': '访问量',
    'key': 'access'
  },
  {
    'title': '销量',
    'key': 'numberSale'
  },
  {
    title: '操作',
    slot: 'action',
  }
]

/**
 * 厂家管理 => 厂家详情表格(厂家操作版)
 * */
export const vendorTable = [
  {
    'title': '商品货号',
    'key': 'productNo'
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
    'key': 'priceSale'
  },
  {
    'title': '库存',
    'key': 'inventory'
  },
  {
    'title': '访问量',
    'key': 'access'
  },
  {
    'title': '销量',
    'key': 'numberSale'
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
    'title': '厂家',
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
    'title': '厂家',
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
 * 数据管理 => 畅销厂家
 * */
export const vendorSaleTable = [
  {
    'title': '编号',
    'key': 'vendorId'
  },
  {
    'title': '厂家',
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
 * 数据管理 => 厂家访问量
 * */
export const vendorTrafficTable = [
  {
    'title': '编号',
    'key': 'vendorId'
  },
  {
    'title': '厂家',
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
 * 数据管理 => 全站前十厂家、商家合作次数(回头客)
 * */
export const cooperationTable = [
  {
    'title': '编号',
    'key': 'vendorId'
  },
  {
    'title': '厂家',
    'key': 'vendorName'
  },
  {
    'title': '商家',
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
 // 'payment': 2,
  'received': 2,
  'shipped': 3,
  'evaluate': 3,   //待评价页面
  'afterProcessing': 5,
  'agreeReturn': 6,
  'okReturn': 7,
  'Waitting': 2
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
 * 数据管理 => 全站数据
 * 1：全站访问量，2：全站销量，3：全站销售额
 * */
export const stationStatus = [
  {
    'name': 'stationTraffic',
    'status': 1
  },
  {
    'name': 'stationSales',
    'status': 2
  },
  {
    'name': 'stationPrice',
    'status': 3
  }
]

/**
 * 数据管理 => 排行榜统一
 * 平台版：1:商品销量前10 2:商品访问量前10 3.厂家销量前10 4.厂家、商家合作排行前10 5.厂家访问量前10
 * 厂家版：
 * */
export const dataStatus = {
  'commoditySales': 1,
  'commodityTraffic': 2,
  'vendorSales': 3,
  'cooperation': 4,
  'vendorTraffic': 5,
  'vendorProductSale': 6,
  'vendorProductTraffic': 7,
  'vendorUnShipped': 8
}

/**
 * 数据管理 => 商品销量
 * */
export const vendorProductSaleColumns = [
  {
    'title': '商品编号',
    'key': 'productId'
  },
  {
    'title': '商品名称',
    'key': 'productName'
  },
  {
    'title': '销量(件)',
    'key': 'number'
  },
  {
    'title': '销售额(元)',
    'key': 'salePrice'
  },
  {
    'title': '活动情况',
    'slot': 'action'
  },
]


export const vendorProductTrafficColumns = [
  {
    'title': '商品编号',
    'key': 'productId'
  },
  {
    'title': '商品名称',
    'key': 'productName'
  },
  {
    'title': '访问量(次)',
    'key': 'number'
  },
  {
    'title': '销售额(元)',
    'key': 'salePrice'
  },
  {
    'title': '活动情况',
    'slot': 'action'
  },
]

export const vendorUnShippedColumns = [
  {
    'title': '商品编号',
    'key': 'productId'
  },
  {
    'title': '商品名称',
    'key': 'productName'
  },
  {
    'title': '待发货总量',
    'key': 'number'
  },
  {
    'title': '销售额(元)',
    'key': 'salePrice'
  },
  {
    'title': '活动情况',
    'slot': 'action'
  },
]

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

/**
 * 新增商品
 * */
export const AddProductParams = {
  'typeChildId': '',
  'productName': '',
  'productNo': '',
  'productVendorId': null,
  'sizeList': [],  //sizeList有默认值，就不需要判断了
  'colorList': [],
  'inventory': null,
  'priceSale': null,
  'productWholesaleList': [],
  'mainPicture': [],
  'imgContent': '',
  'productShow': null
}

/**
 * 设置订单详情的面包屑
 * */
export const NonPaymentCrumb = [
  {
    title:'订单管理',
    to:'/NonPayment'
  },
  {
    title:'未付款',
    to:'/NonPayment'
  },
  {
    title:'订单详情',
    to:'/OrderDetailPage'
  }
]

export const UnshippedCrumb = [
  {
    title:'订单管理',
    to:'/Unshipped'
  },
  {
    title:'未发货',
    to:'/Unshipped'
  },
  {
    title:'订单详情',
    to:'/OrderDetailPage'
  }
]

export const ShippedCrumb = [
  {
    title:'订单管理',
    to:'/Shipped'
  },
  {
    title:'已发货',
    to:'/Shipped'
  },
  {
    title:'订单详情',
    to:'/OrderDetailPage'
  }
]

export const AfterProcessingCrumb = [
  {
    title:'订单管理',
    to:'/AfterProcessing'
  },
  {
    title:'售后处理',
    to:'/AfterProcessing'
  },
  {
    title:'订单详情',
    to:'/OrderDetailPage'
  }
]

export const UnCheckedVendorCrumb = [
  {
    title:'厂家管理',
    to:'/UnCheckedVendorPage'
  },
  {
    title:'待审核',
    to:'/UnCheckedVendorPage'
  },
  {
    title:'审核详情',
    to:'/...'
  }
]

export const NotPassVendorCrumb = [
  {
    title:'厂家管理',
    to:'/NotPassVendorPage'
  },
  {
    title:'未通过',
    to:'/NotPassVendorPage'
  },
  {
    title:'审核详情',
    to:'/...'
  }
]

export const  UnCheckedCrumb = [
  {
    title:'商家管理',
    to:'/UnCheckedPage'
  },
  {
    title:'待审核',
    to:'/UnCheckedPage'
  },
  {
    title:'审核详情',
    to:'/...'
  }
]

export const  NotPassCrumb = [
  {
    title:'商家管理',
    to:'/NotPassPage'
  },
  {
    title:'未通过',
    to:'/NotPassPage'
  },
  {
    title:'审核详情',
    to:'/...'
  }
]

/**
 * 投诉状态
 * */
export const complainStatus = {
  'processed': 1,
  'unprocessed': 0
}

/**
 * 投诉类型
 * */
export const complainType = {
  'platform': 0,
  'product': 1,
  'service': 2
}

/**
 * 前台管理商品列表
 * */
export const frontProductTable = [
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
    'key': 'priceSale'
  },
  {
    'title': '库存',
    'key': 'inventory'
  },
  {
    'title': '访问量',
    'key': 'access'
  },
  {
    'title': '销量',
    'key': 'numberSale'
  },
  {
    'title': '最低批发价',
    'key': 'minWholesale'
  },
  {
    'title': '最高批发价',
    'key': 'maxWholesale'
  },
  {
    'title': '状态',
    'key': 'addStatus',
    render: (h, params) => {
      let checked = params.row.addStatus === 0
      let status = checked ? '未添加':'已添加'
      return h('div', [
        h('Tag', {
          props: {
            color: checked ? 'orange': 'cyan',
          },
        },status)
      ]);
    }
  },
  {
    title: '操作',
    slot: 'action',
  }
]

/**
 * 前台管理商品列表
 * */
export const addStatus = {
  'added': 1,
  'notAdded': 0
}


/**
 * 营销管理 优惠券列表
 * */
export const CouponTable = [
  {
    type: 'selection',
    width: 60,
    align: 'center'
  },
  {
    title: '优惠劵名称',
    key: 'couponName'
  },
  {
    title: '使用门槛',
    key: 'couponThreshold'
  },
  {
    title: '优惠金额',
    key: 'couponPrice',
  },
  {
    title: '使用期限',
    key: 'endurance',
    render: (h, params) => {
      return h('div', [
        h('span',params.row.startTime),
        h('b','/'),
        h('span',params.row.endTime)
      ]);
    }
  },
  {
    title: '领取数量(张)',
    key: 'receiveNum',
  },
  {
    title: '使用数量(张)',
    key: 'useNum',
  },
  {
    title: '操作',
    slot: 'action',
  }
]
/**
 * 营销管理 优惠券详情商品列表
 * */
export const CouponDetailTable = [
  {
    title: '商品编号',
    key: 'productId'
  },
  {
    title: '商品名称',
    key: 'productName'
  },
  {
    title: '商品库存(件)',
    key: 'inventory',
  },
  {
    title: '活动期间销量(件)',
    key: 'saleNum'
  },
  {
    title: '使用次数(次)',
    key: 'useNum',
  },
]

/**
 * 营销管理 厂家折扣列表
 * */
export const DiscountTable = [
  {
    type: 'selection',
    width: 60,
    align: 'center'
  },
  {
    title: '商品编号',
    key: 'productId'
  },
  {
    title: '商品名称',
    key: 'productName'
  },
  {
    title: '折扣',
    key: 'discount',
  },
  {
    title: '使用期限',
    key: 'endurance',
    render: (h, params) => {
      return h('div', [
        h('span',params.row.startTime),
        h('b','/'),
        h('span',params.row.endTime)
      ]);
    }
  },
  {
    title: '能否与优惠券共用',
    key: 'shareStatus',
  },
  {
    title: '激活状态',
    slot: 'action',
    // render: (h, params) => {
    //   let checked =  params.row.activationStatus === '已激活'
    //   return h('div', [
    //     h('span', {
    //       style: {
    //         color: checked ? '#00818C': '#FF7903'
    //       }
    //     },params.row.activationStatus)
    //   ])
    // }
  }
]

/**
 * 平台版本 vendor：厂家操作版   platform：平台操作版
 * */
export const userType = {
  'vendor': 1,
  'platform': 2
}

/**
 * 订单支付方式
 * */
export const payType = ['支付宝','微信','银联']

/**
 * 营销管理 => 可用优惠券列表
 * */
export const  UsableCouponTable = [
  {
    title: '编号',
    key: 'productId'
  },
  {
    title: '商品名称',
    key: 'productName'
  },
  {
    title: '商品库存',
    key: 'inventory'
  },
  {
    title: '活动期间销量(件)',
    key: 'saleNum'
  },
  {
    title: '使用次数(次)',
    key: 'useNum'
  }
]

/**
 * 营销管理 => 新增优惠券(商品列表)
 * */
export const  UsableCouponProductTable = [
  {
    title: '编号',
    key: 'productId'
  },
  {
    title: '商品类别',
    key: 'productType'
  },
  {
    title: '商品名称',
    key: 'productName'
  },
  {
    title: '零售价',
    key: 'salePrice'
  },
  {
    title: '库存',
    key: 'inventory'
  },
  {
    title: '访问量',
    key: 'trafficNum'
  },
  {
    title: '销量',
    key: 'saleNum'
  },
  {
    title: '最低批发价',
    key: 'min'
  },
  {
    title: '最高批发价',
    key: 'max'
  },
  {
    title: '优惠券情况',
    slot: 'action'
  }
]

/**
 * 营销管理 => 新增折扣(商品列表)
 * */
export const  UsableDiscountProductTable = [
  {
    title: '编号',
    key: 'productId'
  },
  {
    title: '商品类别',
    key: 'productType'
  },
  {
    title: '商品名称',
    key: 'productName'
  },
  {
    title: '零售价',
    key: 'salePrice'
  },
  {
    title: '库存',
    key: 'inventory'
  },
  {
    title: '访问量',
    key: 'trafficNum'
  },
  {
    title: '销量',
    key: 'saleNum'
  },
  {
    title: '最低批发价',
    key: 'min'
  },
  {
    title: '最高批发价',
    key: 'max'
  },
  {
    title: '折扣情况',
    slot: 'action'
  }
]

/**
 * 营销管理 => 1.优惠券 2.折扣
 * */
export const activityType = {
  'coupon': 1,
  'discount': 2
}

/**
 * 营销管理 => 是否与优惠券共用  0：不共用  1：共用
 * */
export const shareType = {
  'notShare': 0,
  'share': 1
}
