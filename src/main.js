import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import scroll from 'vue-seamless-scroll'
import axios from 'axios'
Vue.prototype.$http = axios;



Vue.config.productionTip = false
import './plugins/vant.js'
Vue.use(ElementUI)
Vue.use(scroll)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
