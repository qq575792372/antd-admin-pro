<template>
  <div class="navbar">
    <!-- 切换左侧菜单缩小模式 -->
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <!-- 面包屑导航 -->
    <breadcrumb class="breadcrumb-container" />

    <!-- 右侧个人登录信息 -->
    <div class="right-menu">
      <span class="avatar-title">张三</span>

      <a-dropdown
        class="avatar-container"
        :trigger="['hover']"
        placement="bottomCenter"
        overlayClassName="overlay-menu"
      >
        <span class="avatar-wrapper">
          <img src="../../assets/avatar.png" class="user-avatar" />
          <a-icon type="caret-down" class="user-down" />
        </span>
        <a-menu slot="overlay">
          <a-menu-item>
            <router-link to="/">
              首页
            </router-link>
          </a-menu-item>

          <a-menu-item>
            布局设置
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item @click="logout">
            退出登录
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";
import Breadcrumb from "@/components/Breadcrumb";

export default {
  components: {
    Hamburger,
    Breadcrumb
  },
  computed: {
    ...mapGetters(["sidebar"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      console.log("退出");
      this.$confirm({
        title: "提示",
        content: "确定退出当前登录账号吗？",
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 48px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    cursor: pointer;
    .avatar-title {
      font-size: 14px;
      color: #303133;
      position: relative;
      margin-right: 10px;
    }
    .avatar-container {
      margin-right: 20px;
      .user-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
      .user-down {
        position: relative;
        left: 5px;
        font-size: 12px;
      }
    }
  }
}
</style>
<style lang="less">
.overlay-menu {
  top: 52px !important;
}
</style>
