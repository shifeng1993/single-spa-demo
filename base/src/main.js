import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'

import bootstrap from './single.config.js'; // 主入口渲染之前先执行

Vue.use(Antd);

Vue.config.productionTip = false
axios.get('/manifests.json').then(({data}) => {
  window.WORK_SPACE_MANIFEST = data;
  bootstrap(data);

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
});

