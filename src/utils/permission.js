import router from '@/router'
import store from '@/store'
import {menusToRoutes} from '@/utils'
import {getRes} from '@/api/api'
import frontRoutes from '@/router/frontRoutes'

//全局钩子函数
//中间件  在请求和响应中间写几个处理的程序，每一个程序处理完成后，交给下一个中间件处理
//1.判断是否需要登录
// router.beforeEach((to, from, next) => {
//   console.log('进入每一个路由前！！！')
//   console.log('路由 to', to)  //到哪里去
//   console.log('路由 from', from) //从哪里来
//   //1.判断是否需要登录
//   if (to.meta.requireAuth) {
//     //需要登录
//     //2.判断是否登录，localStorage里有没有token
//     let checked = localStorage.getItem('token')
//     if (!checked) {  //没有登录,则需要登录
//       next('/login')
//     } else {
//       //动态生成路由
//       const routes = menusToRoutes(frontRoutes)
//       router.addRoutes(routes)
//       next({path: to.path || '/'})
//     }
//   } else {
//     next()
//   }
//
// })


// 是否有菜单数据
let hasMenus = false
router.beforeEach(async (to, from, next) => {
  console.log('to 到哪里去',to)
  console.log('from 从哪里来',from)
    if (localStorage.getItem('token')) {
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
