<template>
  <div
    class="sidebar-logo-container"
    :class="{ collapse: collapse }"
    :style="{
      backgroundColor:
        sideTheme === 'theme-dark' ? variables.menuBg : variables.menuLightBg
    }"
  >
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <h1
          v-else
          class="sidebar-title"
          :style="{
            color:
              sideTheme === 'theme-dark'
                ? variables.sidebarTitle
                : variables.sidebarLightTitle
          }"
        >
          {{ title }}
        </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <h1
          class="sidebar-title"
          :style="{
            color:
              sideTheme === 'theme-dark'
                ? variables.sidebarTitle
                : variables.sidebarLightTitle
          }"
        >
          {{ title }}
        </h1>
      </router-link>
    </transition>
  </div>
</template>
<script>
import variables from "@/styles/variables.less";
import { sidebarTitle } from "@/settings";
export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: sidebarTitle,
      logo: require("../../../assets/logo.png")
    };
  },
  computed: {
    variables() {
      return variables;
    },
    sideTheme() {
      // return this.$store.state.settings.sideTheme;
      return "theme-dark";
    }
  }
};
</script>

<style lang="less" scoped>
.sidebarLogoFade-enter-active,
.sidebarLogoFade-leave-active {
  transition: width 0.3s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-active {
  width: 80px;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #001529;
  text-align: center;
  overflow: hidden;

  .sidebar-logo-link {
    height: 100%;
    width: 100%;
    display: inline-block;

    .sidebar-logo {
      max-width: 32px;
      max-height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
