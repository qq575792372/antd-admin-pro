import Vue from "vue";

// import normalize
import "normalize.css/normalize.css"; // A modern alternative to CSS resets

// import ant-design-vue
import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.css";
// 使用自定义主题覆盖默认的
import "@/styles/ant-variables.less";

// import global index.less
import "@/styles/index.less";

import App from "./App.vue";
import router from "./router";
import store from "./store";

// import icons and permission
import "@/icons";
import "./permission";

// import vue-meta-info
import MetaInfo from "vue-meta-info";

// import vuescroll
// import VueScroll from "vuescroll";

// use ant-design-vue
Vue.use(Antd);
// use vue-meta-info
Vue.use(MetaInfo);
// use vuescroll
// Vue.use(VueScroll);

//设置为false以阻止vue在启动时生成生产提示。
Vue.config.productionTip = false;

// create vue
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
