import Vue from "vue";
import VueRouter from "vue-router";

// 防止点击同一个路由时候报错
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};

// use vue-router
Vue.use(VueRouter);

/* Layout */
import Layout from "@/layout";

// constantRoutes
const constantRoutes = [
  // tags-view刷新页面中间件
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: resolve => require(["@/views/redirect"], resolve)
      }
    ]
  },

  // 登录
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },

  // 错误页面
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },

  {
    path: "/401",
    component: () => import("@/views/401"),
    hidden: true
  },

  // 默认路由跳转到首页
  {
    path: "/",
    redirect: "/dashboard/index",
    component: Layout
  },

  // 首页
  {
    path: "/dashboard",
    component: Layout,
    redirect: "/dashboard/index",
    meta: {
      title: "首页",
      icon: "el-icon-s-home"
    },
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", affix: true }
      }
    ]
  }

  // 404 page must be placed at the end !!!
  // 如果有权限菜单，需要写在权限路由加载后的最后面，不然刷新页面会404
  // { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new VueRouter({
    mode: "history", // 使用history模式，需要设置base路径
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
  // 防止退出后再登录，再次加载权限菜单会有重复的路由
  router.options.routes = constantRoutes;
}

export default router;
