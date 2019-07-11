/**
 * api接口统一管理
 */
import {get,post,put,deleteAxios} from '@/utils/http'
const COMMON_URL = '/commonResource/'
const PRODUCT_URL = '/productResource/'

/**
 * 登录接口
 */
export const login = (username,password) => post('/loginResource/login',{username,password})

/**
 * 获取页面菜单权限接口
 */
export const getRes = (role) => get('/loginResource/menu',role)

/**
 * 获取厂商列表接口
 */
export const getVendorList = () => get(COMMON_URL + 'vendorlist','')

/**
 * 商品管理相关的接口
 */
export const editClassification = (params)=> post(PRODUCT_URL + 'editclassification',params)

export const getClassificationlist = ()=> get(PRODUCT_URL + 'classificationlist','')

export const getProductList = (params) => post(PRODUCT_URL + 'productList',params)

export const addProduct = (params) => post(PRODUCT_URL + 'addproduct',params)

export const deleteProduct = (productId) => deleteAxios(PRODUCT_URL + 'deleteproduct',productId)

export const modifyProductDetail = (id) => put(PRODUCT_URL + 'modifyProductDetail',id)

export const getProductDetail = (id) => post(PRODUCT_URL + 'getProductDetail',id)

export const isShow = (id,isShow) => put(PRODUCT_URL + 'isShow',{id,isShow})
