import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import iview from 'iview'
import { Message, Modal } from 'iview'
import VueRouter from 'vue-router'
import router from '@/router/index'
import 'iview/dist/styles/iview.css'
import store from './store'
import axios from 'axios'
import './utils/permission'
import md5 from 'js-md5'
import filter from '@/utils/filter'
import Moment from 'moment'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(iview)
Vue.use(VueAwesomeSwiper)

Vue.prototype.$axios = axios
Vue.prototype.$md5 = md5
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal
Vue.prototype.$Moment = Moment

//注册过滤器
for (const key in filter) {
  if (filter.hasOwnProperty(key)) {
    const element = filter[key]
    Vue.filter(key, element)
  }
}


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
