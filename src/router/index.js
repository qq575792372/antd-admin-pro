import Vue from "vue";
import VueRouter from "vue-router";

// 解决点击路由太快异步报错的问题
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};

// use vue-router
Vue.use(VueRouter);

/* Layout */
import Layout from "@/layout";

// constantRoutes
const constantRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard/index",
  },
  {
    path: "/dashboard",
    component: Layout,
    retirect: "/dashboard/index",
    meta: {
      title: "首页",
    },
    children: [
      {
        path: "index",
        meta: {
          title: "首页",
        },
        component: () => import("@/views/dashboard/index.vue"),
      },
    ],
  },

  {
    path: "/table",
    component: Layout,
    retirect: "/table/index",
    children: [
      {
        path: "index",
        meta: {
          title: "表格",
        },
        component: () => import("@/views/table/index.vue"),
      },
    ],
  },

  // 404 page must be placed at the end !!!
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

const router = new VueRouter({
  mode: "history", // hash or history
  base: "/", // 路径访问加前缀的时候需要配置，需和vue.config.js中publicPath配置一样
  routes: constantRoutes,
});

// reset router
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
  // 防止退出后再登录，再次加载权限菜单会有重复的路由
  router.options.routes = constantRoutes;
}
export default router;
