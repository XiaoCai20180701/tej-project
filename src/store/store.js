import Vue from 'vue'
import Vuex from 'vuex'
// import mutations from './mutations'
// import actions from './actions'
// import getters from './getters'
// import state from './state'
import { getLogin } from '@/api/api'

Vue.use(Vuex);

const key = 'user'

const state = {
  token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
  userInfo: {},
  menuList: []
}

const mutations = {
  //修改token，并将token存入localStorage
  changeLogin(state, user) {
    state.token = user.token
    localStorage.setItem('token',user.token)
  },
  GetMenuList(state,menuList){
    state.menuList = menuList
    console.log('mutations menuList',state.menuList)
  }
}

const actions = {
  async getMenuListData({commit},playload) {
    try {
      const res = await getLogin(playload.username,playload.password)
      commit('GetMenuList',res.data)
    }catch(err){
      console.log(err.message)
    }
  }
}
const store = new Vuex.Store({
  state,
  mutations,
  actions
});

export default store;
