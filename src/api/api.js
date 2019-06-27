/**
 * api接口统一管理
 */
import { get, post } from './http'

/**
 * 登录
 */
export const getLogin = (username,password) => post('/getLogin', {username,password})

