import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


// Conexão com API
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_ROOT_API;

import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)


// Language Config i18n
import './i18n/index'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
