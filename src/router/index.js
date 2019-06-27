import Vue from 'vue'
import Router from 'vue-router'

const login = r => require.ensure([], () => r(require('@/pages/login')), 'login')
const layout = r => require.ensure([], () => r(require('@/components/layout/layout')), 'layout')
const hello = r => require.ensure([], () => r(require('@/components/helloWorld')), 'helloWorld')
const index = r => require.ensure([], () => r(require('@/pages/index')), 'index')

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: login
  },
  {
    path: '/manage',
    component: layout,
    name: '',
    children: [
      {
        path: '/hello',
        component: hello,
        meta: ['订单管理','hello']
      },
      {
        path: '/index',
        component: index,
        meta: ['订单管理','index']
      }
    ]
  },
]

// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     next()
//   } else {
//     let token = localStorage.getItem('token');
//
//     if (token === 'null' || token === '') {
//       next('/login')
//     } else {
//       next()
//     }
//   }
// })

export default new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production',
})
