import Vue from 'vue';
import VueRouter from 'vue-router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import echarts from 'echarts';
import {api} from './api/index.js'
import routes from './routes';
import App from './App.vue';


Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Antd);

Vue.prototype.$echarts = echarts
Vue.prototype.$api = api;

const router = new VueRouter({mode: 'history', routes});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
