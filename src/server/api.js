/**
 * api接口统一管理
 */
import { post } from './http'

export const getLogin = (username,password) => post('/login', {username,password})
