<template>
  <!-- <div class="app-wrapper">
    <Sidebar />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <Navbar />
      </div>
      <AppMain />
    </div>
  </div> -->

  <a-layout class="app-wrapper">
    <a-layout-sider :trigger="null" collapsible>
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
    }
  },
  data() {
    return {
      collapsed: true
    };
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
  min-height: 50px;
}
</style>
