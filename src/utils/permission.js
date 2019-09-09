import router from '@/router'
import store from '@/store'
import {menusToRoutes} from '@/utils'
import {getRes} from '@/api/api'
import frontRoutes from '@/router/frontRoutes'

// 是否有菜单数据
let hasMenus = false
router.beforeEach(async (to, from, next) => {
  console.log('to 到哪里去',to)
  console.log('from 从哪里来',from)
    if (sessionStorage.getItem('token')) {
      console.log('token')
      // next()
        if (to.path === '/login') {
            next({path: '/'})
        } else {
            if (hasMenus) {
                next()
            } else {
                try {
                    // 这里可以用 await 配合请求后台数据来生成路由
                //    const routes = menusToRoutes(store.state.menuItems)
                  const routes = menusToRoutes(frontRoutes)
                    // 动态添加路由
                    router.addRoutes(routes)
                    hasMenus = true
                    next({path: to.path || '/'})
                } catch (error) {
                    next('/login')
                }
            }
        }
    } else {
        hasMenus = false
        if (to.path === '/login') {
            next()
        } else {
            next('/login')
        }
    }
})
