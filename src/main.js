import Vue from 'vue'
import App from './App.vue'
import 'element-theme-dark';
import ElementUI from 'element-ui'
import router from './router'
import instance from './utils/axios.js'
import i18n from './i18n/i18n'


Vue.config.productionTip = false

//全局组件
import GL_Component from '@/utils/globalComponents'

Vue.use(GL_Component);

Vue.use(ElementUI)
Vue.prototype.$axios = instance



Vue.use(i18n)

window.vm = new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
