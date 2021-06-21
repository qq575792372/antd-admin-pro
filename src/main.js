import Vue from "vue";

// import ant-design-vue
import Antd from "ant-design-vue";
import 'ant-design-vue/dist/antd.css';

// import global index.less
import "@/styles/index.less";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/icons"; // icon
import "./permission"; // permission control

// use ant-design-vue
Vue.use(Antd);

// vue config
Vue.config.productionTip = false;

// create vue
new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
