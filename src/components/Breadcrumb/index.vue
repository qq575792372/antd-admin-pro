<template>
  <a-breadcrumb class="app-breadcrumb" separator="/">
    <a-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
      <span
        v-if="item.redirect === 'noredirect' || index == levelList.length - 1"
        class="no-redirect"
      >
        {{ item.meta.title }}
      </span>
      <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>
<script>
import pathToRegexp from "path-to-regexp";

export default {
  data() {
    return {
      levelList: null
    };
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith("/redirect/")) {
        return;
      }
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(
        item => item.meta && item.meta.title
      );
      const first = matched[0];

      // 如果当前路由是非首页，则面包屑最开始追加首页的链接
      if (!this.isDashboard(first)) {
        matched = [
          { path: "/dashboard/index", meta: { title: "首页" } }
        ].concat(matched);
      } else {
        // 如果当前路由是首页，则面包屑只保留一个首页链接
        matched = [{ path: "/dashboard/index", meta: { title: "首页" } }];
      }
      // 匹配出来的路由链接列表
      this.levelList = matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    isDashboard(route) {
      const name = route && route.name;
      if (!name) return false;
      return (
        name.trim().toLocaleLowerCase() === "dashboard".toLocaleLowerCase()
      );
    },
    pathCompile(path) {
      const { params } = this.$route;
      var toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    handleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(this.pathCompile(path));
    }
  }
};
</script>
<style lang="less" scoped>
.app-breadcrumb {
  &.ant-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 60px;
    margin-left: 8px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
}
</style>
