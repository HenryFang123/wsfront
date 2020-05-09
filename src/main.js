import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import Axios from 'axios'
import Qs from 'qs'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/index.js'
import 'assets/css/icon.css';
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(VueResource);

Vue.config.productionTip = false;
Vue.http.options.emulateJSON = true;

Vue.prototype.$axios = Axios;
Vue.prototype.qs = Qs;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
