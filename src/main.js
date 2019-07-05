import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import iview from 'iview'
import { Message } from 'iview'
import VueRouter from 'vue-router'
import router from '@/router/index'
import 'iview/dist/styles/iview.css'
import store from './store'
import axios from 'axios'
import './utils/permission'
import md5 from 'js-md5'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(iview)

Vue.prototype.$axios = axios
Vue.prototype.$md5 = md5
Vue.prototype.$Message = Message

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
