<template>
  <a-layout :class="classObj" class="app-wrapper">
    <a-layout-sider
      class="side-layout"
      :class="{ 'fixed-sidebar': fixedSidebar }"
      v-model="isCollapse"
      :trigger="null"
      collapsible
    >
      <Sidebar />
    </a-layout-sider>
    <a-layout class="main-layout">
      <a-layout-header
        class="main-header"
        :class="{ 'fixed-header': fixedHeader }"
      >
        <Navbar />
      </a-layout-header>
      <a-layout-content class="main-content">
        <AppMain />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { mapGetters } from "vuex";
import { Navbar, Sidebar, AppMain } from "./components";
export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    ...mapGetters(["sidebar", "device"]),
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
    fixedSidebar() {
      return this.$store.state.settings.fixedSidebar;
    },
    isCollapse() {
      return !this.$store.getters.sidebar.opened;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  data() {
    return {};
  },
  created() {}
};
</script>
<style lang="less" scoped>
.app-wrapper {
  position: relative;
}
.main-layout {
  height: 100%;
  min-height: 0;
  position: relative;
  .main-header {
    padding: 0px;
    height: auto;
    min-height: auto;
  }
  .main-content {
    transition: all 0.2s;
  }
}

// 固定侧边栏
.fixed-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
// 固定侧边栏情况下，右侧内容部分宽度变化
.fixed-sidebar + .main-layout .main-content,
.fixed-sidebar + .main-layout .main-header {
  margin-left: 200px;
}
.hideSidebar .fixed-sidebar + .main-layout .main-content,
.hideSidebar .fixed-sidebar + .main-layout .main-header {
  margin-left: 80px;
}

// 固定顶部栏
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;
  width: calc(100% - 200px);
  transition: all 0.2s;
}
// 菜单展开和收缩时候顶部栏和content的位置
.hideSidebar .fixed-header {
  width: calc(100% - 80px);
}
.fixed-header + .main-content {
  padding-top: 60px;
}
</style>
