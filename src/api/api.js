/**
 * api接口统一管理
 */
import {get,post,put,deleteAxios} from '@/utils/http'
const COMMON_URL = '/commonResource/'
const PRODUCT_URL = '/productResource/'
const RETAIL_URL = '/retailResource/'
const VENDOR_URL = '/vendorResource/'
const ORDER_URL  ='/orderResource/'
const USER_URL = '/userResource/'

/**
 * 登录接口
 */
export const login = (userName,passWord) => post('/loginResource/login',userName,passWord)

/**
 * 获取页面菜单权限接口
 */
export const getRes = (roleId) => post('/loginResource/menu',roleId)

/**
 * 上传图片接口
 */
export const uploadFile = (params) => get('/fileResource/uploadimg',params)

/**
 * 获取厂商列表接口
 */
export const getVendorList = () => get(COMMON_URL + 'vendorlist','')

/**
 * 商品管理相关的接口
 */
export const addParentType = (params) => post(PRODUCT_URL + 'addParentType',params)

export const deleteType = (typeParentId) => deleteAxios(PRODUCT_URL + 'deleteType',typeParentId)

 export const getColorList = ()=> get(PRODUCT_URL + 'getColorList','')

export const getClassificationlist = ()=> get(PRODUCT_URL + 'classificationList','')

export const getProductList = (params) => post(PRODUCT_URL + 'productList',params)

export const addColor = (productColor) => post(PRODUCT_URL + 'addColor',productColor)

export const deleteColor = (colorId) => deleteAxios(PRODUCT_URL + 'deleteColor',colorId)

export const addSize = (productId) => post(PRODUCT_URL + 'addSize',productId)

export const deleteSize = (sizeId) => deleteAxios(PRODUCT_URL + 'deleteSize',sizeId)

export const addProductWholesale = (params) => post(PRODUCT_URL + 'addProductWholesale',params)

export const deleteProductWholesale = (id) => deleteAxios(PRODUCT_URL + 'deleteProductWholesale',id)

export const postAddProduct = (params) => post(PRODUCT_URL + 'addProduct',params)

export const deleteProduct = (productId) => deleteAxios(PRODUCT_URL + 'deleteproduct',productId)

export const putProductDetail = (id) => put(PRODUCT_URL + 'modifyProductDetail',id)

export const getProductDetail = (id) => post(PRODUCT_URL + 'getProductDetail',id)

export const isShow = (id,isShow) => put(PRODUCT_URL + 'isShow',id,isShow)

export const getProductFilter = () => get(PRODUCT_URL + 'searchData')

/**
 * 零售商管理相关的接口
 */
export const putSaveAudit = (id,isUsed) => put(RETAIL_URL + 'saveaudit',id,isUsed)  //存储审核结果

export const postAuditInfo = (id) => post(RETAIL_URL + 'auditinfo',id)  //获取零售商审核信息

export const postApplylist = (params)=> post(RETAIL_URL + 'applylist',params)

export const postRetaillist = (params)=> post(RETAIL_URL + 'retaillist',params)  //零售商列表

export const postRetailDetail = (params)=> post(RETAIL_URL + 'retaildetail',params)  //零售商详情

export const postFailedlist = (params) => post(RETAIL_URL + 'failedlist',params)


/**
 * 厂商管理相关的接口
 */
export const postVendorList = (params) => post(VENDOR_URL + 'vendorList',params)  //厂商列表

export const postVendorDetail = (params) => post(VENDOR_URL + 'vendorDetail',params)  //厂商详情

export const postVendorInfo = (id) => post(RETAIL_URL + 'auditinfo',id) //获取厂商审核信息  //TODO 接口名称需要修改


/**
 * 订单管理相关的接口
 */
export const postOrderDetail = (ordeId) => post(ORDER_URL + 'orderDetail',ordeId)  //订单详情

export const getHistoryList = () => get(ORDER_URL + 'historyList')  //获取历史记录列表

export const postOrderList = (params) => post(ORDER_URL + 'orderList',params)  //订单列表

/**
 * 数据管理相关的接口
 */
export const getStationdata = ()=>get('/statisticsResource/stationdata','')

export const postProductsaletop = (params)=>post('/statisticsResource/productsaletop',params)

export const postProductaccesstop = (params)=>post('/statisticsResource/productaccesstop',params)

export const postVendorsaletop = (params)=>post('/statisticsResource/vendorsaletop',params)

export const postCooperationtop = (params)=>post('/statisticsResource/cooperationtop',params)

/**
 * 账户管理相关的接口
 */
export const  postUserList = (params) => post(USER_URL + 'userlist',params)   //账户列表

export const getRolelist = () => get(USER_URL + 'rolelist')  //角色列表

export const  putEditUserStatus = (params) => put(USER_URL + 'edituserstatus',params)  //修改用户状态
