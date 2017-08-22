import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import app from './modules/app'
import config from './modules/config'
import getters from './getters';
Vue.use(Vuex)

const store =  new Vuex.Store({
  modules: {
    user,
    app,
    config
  },
  getters
})

export default store
