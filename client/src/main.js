// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from './plugins/vuetify' // path to vuetify export
import {sync} from 'vuex-router-sync'
import store from '../src/store/store'
import vueYoutube from 'vue-youtube-embed'

Vue.use(vueYoutube)
Vue.config.productionTip = false

const opts = {}

/* eslint-disable no-new */
new Vue({
  vuetify,
  vueYoutube,
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


