// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import Router from 'vue-router'
import router from './router'
import store from "./store";
import './assets/css/index.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/font/iconfont.js'
import './assets/font/iconfont1.js'
import './assets/font/iconfont2.js'
import './assets/font/iconfont3.js'

Vue.use(Vuex)
Vue.use(Router)
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:new Router(router),
  store:new Vuex.Store(store),
  components: { App },
  template: '<App/>'
})
