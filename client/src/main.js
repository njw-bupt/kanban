import Vue from 'vue';
import VueRouter from 'vue-router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import {api} from './api/index.js'
import routes from './routes';
import App from './App.vue';


Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Antd);

Vue.prototype.$api = api;

const router = new VueRouter({routes});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
