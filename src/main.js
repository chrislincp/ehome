// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css'
import { getToken } from './utils/auth';
// Vue.config.productionTip = false

Vue.use(ElementUI)
/* eslint-disable no-new */


router.beforeEach((to, from, next) => {
  NProgress.start()
  to.path == '/login' ? store.dispatch('LogOut') : ''

  // let routes = router.options.routes
  if (!getToken() && to.path != '/login') {
    next({ path: '/login' })
    NProgress.done()
  } else {
    if (!store.getters.user.ID) {
      store.dispatch('GetInfo')
    }else {

    }
    next()
  }
})

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});



new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
