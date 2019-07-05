/**
 * api接口统一管理
 */
import {get,post} from '@/utils/http'

/**
 * 登录接口
 */
export const login = (username,password) => post('/login',{username,password})

/**
 * 获取页面菜单权限接口
 */
export const getRes = (role) => get('/loginResource/menu',role)
