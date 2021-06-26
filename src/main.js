import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;
// 检查性能-配合Vue Performance Devtool插件使用
// 生产上最好关闭
Vue.config.performance = true;

new Vue({
  render: h => h(App),
}).$mount('#app')
