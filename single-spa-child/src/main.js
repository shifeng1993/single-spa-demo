import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import singleSpaVue from 'single-spa-vue';

let options = {
  el: '#vue',
  router,
  store,
  render: h => h(App)
}

const vueLifeCycles = singleSpaVue({
  Vue,
  appOptions: options
})

Vue.config.productionTip = false

export const bootstrap = vueLifeCycles.bootstrap; // 启动 
export const mount = vueLifeCycles.mount;     // 挂载
export const unmount = vueLifeCycles.unmount; // 卸载


