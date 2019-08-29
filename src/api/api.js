/**
 * api接口统一管理
 */
import {get, post, put, deleteAxios} from '@/utils/http'

const LOGIN_URL = '/loginResource/'
const PRODUCT_URL = '/productResource/'
const RETAIL_URL = '/retailResource/'
const VENDOR_URL = '/vendorResource/'
const ORDER_URL = '/orderResource/'
const USER_URL = '/userResource/'
const STATISTICS_URL = '/statisticsResource/'
const COMPLAINT_URL = '/complainResource/'
const FRONT_URL = '/frontResource/'
const MARKETING_URL = '/marketingResource/'


/**
 * 登录接口
 */
export const login = (userName, passWord) => post(LOGIN_URL + 'login', userName, passWord)  //平台用户登录

export const vendorLogin = (userName, passWord) => post(LOGIN_URL + 'login-vendor', userName, passWord)  //厂家用户登录

export const postLogout = (userId) => post(LOGIN_URL + 'logout', userId)  //退出登录

export const postCode = (mobile) => post(LOGIN_URL + 'getcode',mobile) //获取忘记密码验证码

/**
 * 获取页面菜单权限接口
 */
export const getRes = (roleId,menuType) => post('/loginResource/menu', roleId,menuType)  //菜单权限

/**
 * 上传图片接口
 */
export const uploadFile = (params) => get('/fileResource/uploadimg', params)

/**
 * 获取厂家列表接口
 */
export const getVendorList = () => get(PRODUCT_URL + 'vendorList', '')

/**
 * 商品管理相关的接口
 */
export const addParentType = (params) => post(PRODUCT_URL + 'addParentType', params)

export const deleteType = (params) => deleteAxios(PRODUCT_URL + 'deleteType', params)

export const getColorList = () => get(PRODUCT_URL + 'getColorList', '')

export const getClassificationlist = () => get(PRODUCT_URL + 'classificationList', '')

export const getProductList = (params) => post(PRODUCT_URL + 'productList', params)

export const addColor = (productColor) => post(PRODUCT_URL + 'addColor', productColor)

export const deleteColor = (colorId) => deleteAxios(PRODUCT_URL + 'deleteColor', colorId)

export const addSize = (productId) => post(PRODUCT_URL + 'addSize', productId)

export const deleteSize = (sizeId) => deleteAxios(PRODUCT_URL + 'deleteSize', sizeId)

export const addProductWholesale = (params) => post(PRODUCT_URL + 'addProductWholesale', params)

export const deleteProductWholesale = (id) => deleteAxios(PRODUCT_URL + 'deleteProductWholesale', id)

export const postAddProduct = (params) => post(PRODUCT_URL + 'addProduct', params)

export const deleteProduct = (productId) => deleteAxios(PRODUCT_URL + 'deleteproduct', productId)

export const putProductDetail = (id) => put(PRODUCT_URL + 'modifyProductDetail', id)  //修改商品详情

export const getProductDetail = (id) => post(PRODUCT_URL + 'getProductDetail', id)

export const isShow = (id, isShow) => put(PRODUCT_URL + 'isShow', id, isShow)

export const getProductFilter = () => get(PRODUCT_URL + 'searchData')

export const postSpecByTypeId = (typeId) => post(PRODUCT_URL + 'specificationByTypeId', typeId)   //获取商品规格参数模板

export const postSpecificationByProductId = (productId) => post(PRODUCT_URL + 'getSpecificationByProductId',productId) //获取商品详细规格参数

/**
 * 零售商管理相关的接口
 */
export const putSaveAudit = (id, isUsed) => put(RETAIL_URL + 'saveaudit', id, isUsed)  //存储审核结果

export const postAuditInfo = (id) => post(RETAIL_URL + 'auditinfo', id)  //获取零售商审核信息

export const postApplylist = (params) => post(RETAIL_URL + 'applylist', params)

export const postRetaillist = (params) => post(RETAIL_URL + 'retaillist', params)  //零售商列表

export const postRetailDetail = (params) => post(RETAIL_URL + 'retaildetail', params)  //零售商详情

export const postFailedlist = (params) => post(RETAIL_URL + 'failedlist', params)

export const postRetailBillList = (params) => post(RETAIL_URL + 'bill', params) //零售商账单


/**
 * 厂家管理相关的接口
 */
export const postVendorList = (params) => post(VENDOR_URL + 'vendorList', params)  //厂家列表

export const postVendorDetail = (params) => post(VENDOR_URL + 'vendorDetail', params)  //厂家详情

export const postVendorInfo = (id) => post(VENDOR_URL + 'auditDetail', id) //获取厂家审核信息

export const putAuditIsUsed = (params) => put(VENDOR_URL + 'auditIsUsed', params) //厂家审核是否通过

export const postVendorBillList = (params) => post(VENDOR_URL + 'vendorBillList', params) //厂家账单


/**
 * 订单管理相关的接口
 */
export const postOrderDetail = (ordeId) => post(ORDER_URL + 'orderDetail', ordeId)  //订单详情

export const getHistoryList = () => post(ORDER_URL + 'historyList')  //获取历史记录列表

export const postOrderList = (params) => post(ORDER_URL + 'orderList', params)  //订单列表

export const putUpdateOrder = (params)=> put(ORDER_URL + 'updateOrder',params)  //修改订单信息（发货）（退货）（换货）

/**
 * 数据管理相关的接口
 */
export const getStationdata = (params) => post(STATISTICS_URL + 'stationdata', params)    //全站数据

export const postRanklist = (params) => post(STATISTICS_URL + 'ranklist', params)   //排行榜统一接口

export const getRankAllList = () => get(STATISTICS_URL + 'rankdetails')   //排行榜详情

/**
 * 账户管理相关的接口
 */
export const postUserList = (params) => post(USER_URL + 'userlist', params)   //账户列表

export const getRolelist = () => get(USER_URL + 'rolelist')  //角色列表

export const putEditUserStatus = (params) => put(USER_URL + 'edituserstatus', params)  //修改用户状态

export const postUserDetail = (params) => post(USER_URL + 'userdetail', params)  //用户详情

export const postAddUser = (params) => post(USER_URL + 'adduser', params) //新增用户

export const postEditPermissions = (params) => post(USER_URL + 'editpermissions', params) //修改角色权限

export const postRolePermissions = (params) => post(USER_URL + 'rolepermissions', params) //获取角色权限

export const postAddRole = (params) => post(USER_URL + 'addrole', params)  //新增角色

export const putModifyPassword = (params) => put(USER_URL + 'editpassword', params)  //修改密码

/**
 * 投诉管理相关的接口
 */
export const postComplainList = (params) => post(COMPLAINT_URL + 'complainList', params)  //获取投诉管理列表

export const postComplainSolveList = (params) => post(COMPLAINT_URL + 'complainSolveList', params) //获取投诉解决信息

export const postUpdateComplain = (params) => post(COMPLAINT_URL + 'updateComplain', params)  //修改投诉状态

/**
 * 前台管理相关的接口
 */
export const postFrontProductList = (params) => post(FRONT_URL + 'frontProductList', params) //获取前台管理商品列表

export const getFrontList = () => get(FRONT_URL + 'frontList')  //获取前台管理列表

export const putUpdateFront = (params)=> put( FRONT_URL+ 'updateFront', params) //修改前台管理信息

/**
 * 营销管理相关的接口
 */
export const postCouponList = (params)=> post(MARKETING_URL + 'couponlist',params)   //获取优惠券列表

export const postDiscountList = (params)=> post(MARKETING_URL + 'discountlist',params)  //获取折扣商品列表

export const postCouponDetails = (params)=> post(MARKETING_URL + 'coupondetails',params)  //获取优惠券详情


