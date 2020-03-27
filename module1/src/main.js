import Vue from 'vue'
import App from './App.vue'
import router from './router'
import singleSpaVue from 'single-spa-vue';

Vue.config.productionTip = false

import Vuex from 'vuex'

Vue.use(Vuex)

let options = {
  el: `#${require('../manifest').name}`,
  router,
  store: new Vuex.Store({}), // 1. 先做个空store挂载全局的this.$store上
  render: h => h(App),
  created() {
    this.$store = this.store // 2. 再用props传来的this.store对空store进行替换
  },
}

const vueLifeCycles = singleSpaVue({
  Vue,
  appOptions: options
})

Vue.config.productionTip = false

// 启动 
export const bootstrap = (props) => {
  return vueLifeCycles.bootstrap(props);
};

// 挂载
export const mount = (props) => {
  return vueLifeCycles.mount(props);
};

// 卸载
export const unmount = (props) => {
  return vueLifeCycles.unmount(props);
};
