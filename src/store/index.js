import Vue from 'vue'
import Vuex from 'vuex'
import { getRes } from '../api/api';
import  frontRoutes  from '@/router/frontRoutes'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 左侧菜单栏数据 (前端路由表)
        menuItems: frontRoutes,
        role: 1
    },
    mutations: {
        SET_MENUS(state, items) {
          state.menuItems = [...items]
        },
        SET_ROLE(state, role){
            state.role = role
        }
    },
    actions: {
        getAnyscMenu({commit},role){
            getRes({roleId: role}).then(res => {
                let menuItems = res.data.menuItems
                commit('SET_MENUS',menuItems)
            }).catch(err => {
                console.log('get res fail',err)
            })
        },
        getRole({commit},role){
          commit('SET_ROLE',role)
        }
    }

})

export default store
