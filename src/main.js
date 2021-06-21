import Vue from "vue";

// import normalize
import "normalize.css/normalize.css"; // A modern alternative to CSS resets

// import ant-design-vue
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

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

// use ant-design-vue
Vue.use(Antd);

// set vue-meta-info
Vue.use(MetaInfo);

//设置为false以阻止vue在启动时生成生产提示。
Vue.config.productionTip = false;

// create vue
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
