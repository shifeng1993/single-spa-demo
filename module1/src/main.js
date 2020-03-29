import Vue from 'vue'
import App from './App.vue'
import router from './router'
import singleSpaVue from 'single-spa-vue';

Vue.config.productionTip = false

import Vuex from 'vuex'

Vue.use(Vuex)

const manifest = require('../manifest');

let vueLifeCycles, bootstrap, mount, unmount;

if (manifest.singleSpa) {
  let options = {
    el: `#${require('../manifest').name}`,
    router,
    store: new Vuex.Store({}), // 1. 先做个空store挂载全局的this.$store上
    render: h => h(App),
    created() {
      this.$store = this.store // 2. 再用props传来的this.store对空store进行替换
    },
  }

  vueLifeCycles = singleSpaVue({
    Vue,
    appOptions: options
  })

  bootstrap = (props) => {
    return vueLifeCycles && vueLifeCycles.bootstrap(props);
  };
  mount = (props) => {
    return vueLifeCycles && vueLifeCycles.mount(props);
  };
  unmount = (props) => {
    return vueLifeCycles && vueLifeCycles.unmount(props);
  };

} else {
  new Vue({
    router,
    store: new Vuex.Store({}), // 1. 先做个空store挂载全局的this.$store上
    render: h => h(App)
  }).$mount('#app')

}

export {
  bootstrap,
  mount,
  unmount
}
