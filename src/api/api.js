/**
 * api接口统一管理
 */
import {get,post,put,deleteAxios} from '@/utils/http'
const COMMON_URL = '/commonResource/'
const PRODUCT_URL = '/productResource/'
const RETAIL_URL = '/retailResource/'
const VENDOR_URL = '/vendorResource/'
const ORDER_URL  ='/orderResource/'

/**
 * 登录接口
 */
export const login = (userName,passWord) => post('/loginResource/login',userName,passWord)

/**
 * 获取页面菜单权限接口
 */
export const getRes = (role) => get('/loginResource/menu',role)

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

export const getProductFilter = () => get(PRODUCT_URL + 'searchData','')

/**
 * 零售商管理相关的接口
 */
export const putSaveAudit = (id,isUsed) => put(RETAIL_URL + 'saveaudit',id,isUsed)

export const postAuditInfo = (id) => post(RETAIL_URL + 'auditinfo',id)

export const postApplylist = (params)=> post(RETAIL_URL + 'applylist',params)

export const postAuditedlist = (params)=> post(RETAIL_URL + 'auditedlist',params)

export const postRetaildetail = (params)=> post(RETAIL_URL + 'retaildetail',params)

export const postFailedlist = (params) => post(RETAIL_URL + 'failedlist',params)


/**
 * 厂商管理相关的接口
 */
export const postVendorList = (params) => post(VENDOR_URL + 'vendorList',params)  //厂商列表

export const postVendorDetail = (params) => post(VENDOR_URL + 'vendorDetail',params)  //厂商详情


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

export const postProductsaletop = (paramas)=>post('/statisticsResource/productsaletop',paramas)

export const postProductaccesstop = (paramas)=>post('/statisticsResource/productaccesstop',paramas)

export const postVendorsaletop = (paramas)=>post('/statisticsResource/vendorsaletop',paramas)

export const postCooperationtop = (paramas)=>post('/statisticsResource/cooperationtop',paramas)


