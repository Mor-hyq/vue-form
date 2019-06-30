import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

Vue.config.productionTip = false
// 总线
Vue.prototype.$bus = new Vue();
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
