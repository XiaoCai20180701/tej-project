/**
 * api接口统一管理
 */
import {get,post,put,deleteAxios} from '@/utils/http'
const COMMON_URL = '/commonResource/'
const PRODUCT_URL = '/productResource/'
const RETAIL_URL = '/retailResource/'

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

// export const editClassification = (params)=> post(PRODUCT_URL + 'editclassification',params)

export const getClassificationlist = ()=> get(PRODUCT_URL + 'classificationlist','')

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

export const getProductFilter = () => get(PRODUCT_URL + 'screendata','')

/**
 * 零售商管理相关的接口
 */
export const saveAudit = (id,isUsed) => put(RETAIL_URL + 'saveaudit',id,isUsed)

export const getAuditInfo = (id) => post(RETAIL_URL + 'auditinfo',id)

export const getApplylist = (params)=> post(RETAIL_URL + 'applylist',params)

export const getAuditedlist = (params)=> post(RETAIL_URL + 'auditedlist',params)

export const getRetaildetail = (params)=> post(RETAIL_URL + 'retaildetail',params)

/**
 * 数据管理相关的接口
 */
export const getStationdata = ()=>get('/statisticsResource/stationdata','')

export const postProductsaletop = (paramas)=>post('/statisticsResource/productsaletop',paramas)

export const postProductaccesstop = (paramas)=>post('/statisticsResource/productaccesstop',paramas)

export const postVendorsaletop = (paramas)=>post('/statisticsResource/vendorsaletop',paramas)

export const postCooperationtop = (paramas)=>post('/statisticsResource/cooperationtop',paramas)


