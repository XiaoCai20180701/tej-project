import Vue from 'vue';
import Vuex from 'vuex';
//import mutations from './mutations';
//import actions from './actions'

Vue.use(Vuex);

const key = 'user'
const state = {
  token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
};

const mutations = {
  //修改token，并将token存入localStorage
  changeLogin(state, user) {
    state.token = user.token
    localStorage.setItem('token',user.token)
  }
}

const actions = {}
const store = new Vuex.Store({
  state,
  mutations,
  actions
});

export default store;
