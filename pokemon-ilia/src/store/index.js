import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})


Vue.use(vuexI18n.plugin, store);


export default store;
