import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./api/http";

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
// 检查性能-配合Vue Performance Devtool插件使用
// 生产上最好关闭
Vue.config.performance = true;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
