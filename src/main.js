// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from '@/auth'
import i18n from '@/i18n'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)

axios.defaults.baseURL = 'http://localhost:8080/api'

axios.interceptors.response.use(undefined, (err) => {
  if (err.response.status === 400) {
    return Promise.reject(err)
  }

  if (err.response.status === 401) {
    return Promise.reject(err)
  }

  if (err.response.status === 403) {
    return Promise.reject(err)
  }

  if (err.response.status === 404) {
    return Promise.reject(err)
  }
})

router.beforeEach((to, from, next) => {
  // if user is logged in and wants to visit 'Login' or 'Register', redirect to 'Feed'
  if ((to.name === 'Login' || to.name === 'Register') && store.getters.userPresent()) {
    next({name: 'Feed'})
  } else {
    // if user is not logged in and wants to see the notification page, redirect to 'Login'
    if (to.name === 'NotificationView' && !store.getters.userPresent()) {
      next({name: 'Login'})
    } else {
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
  i18n
})
