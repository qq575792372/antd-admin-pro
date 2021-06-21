import router from "./router";
import store from "./store";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
// 引入异步路由菜单数据
import { asyncRouters } from "./router/asyncRouters";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login"]; // no redirect whitelist

// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  //拉取过权限路由菜单，不再添加
  if (store.getters.addRoutes.length > 0) {
    next();
  } else {
    // 权限路由
    const accessRoutes = await store.dispatch(
      "permission/generateRoutes",
      asyncRouters
    );
    // 追加个404页面，防止随意输入地址找不到
    accessRoutes.push({ path: "*", redirect: "/404", hidden: true });
    // 添加到路由链
    router.addRoutes(accessRoutes);
    next({ ...to, replace: true });
  }

  // end progress bar
  NProgress.done();
});

router.afterEach((to, from) => {
  // finish progress bar
  NProgress.done();
});
