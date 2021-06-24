<template>
  <a-layout class="app-wrapper">
    <a-layout-sider v-model="isCollapse" :trigger="null" collapsible>
      <Sidebar />
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <Navbar />
      </a-layout-header>
      <a-layout-content>
        <AppMain />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { Navbar, Sidebar, AppMain } from "./components";
export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    fixedHeader() {
      return false;
    },
    isCollapse() {
      return !this.$store.getters.sidebar.opened;
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
  height: 100%;
  width: 100%;
}
.main-container {
  margin-left: 210px;
}
.ant-layout-header {
  background: #fff;
  min-height: 60px;
}
</style>
