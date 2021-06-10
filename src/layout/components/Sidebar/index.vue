<template>
  <div class="sidebar-container">
    <a-menu mode="inline" theme="dark">
      <!-- 只有一层 -->
      <a-menu-item key="1">
        <a-icon type="dashboard" />
        <span>首页</span>
      </a-menu-item>
      <!-- 包含子菜单 -->
      <a-sub-menu key="2">
        <template slot="title">
          <a-icon type="user" /><span>系统管理</span>
        </template>
        <a-menu-item key="2-1">
          <a-icon type="user" />
          <span>用户管理</span>
        </a-menu-item>
        <a-sub-menu key="2-2">
          <template slot="title">
            <a-icon type="user" />
            <span>部门管理</span>
          </template>
          <a-menu-item key="2-2-1">
            <a-icon type="user" />
            <span>添加部门</span>
          </a-menu-item>
          <a-menu-item key="2-2-1">
            <a-icon type="user" />
            <span>修改部门</span>
          </a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: ["mail"],
      openKeys: ["sub1"],
    };
  },
  watch: {
    openKeys(val) {
      console.log("openKeys", val);
    },
  },
  methods: {
    handleClick(e) {
      console.log("click", e);
    },
    titleClick(e) {
      console.log("titleClick", e);
    },
  },
};
</script>
<style lang="less" scoped>
.sidebar-container {
  transition: width 0.28s;
  width: 210px;
  background-color: #001529;
  height: 100%;
  position: fixed;
  top: 0;
  color: #fff;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
</style>