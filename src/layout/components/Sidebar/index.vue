<template>
  <div class="sidebar-container">
    <!-- logo -->
    <!-- <Logo v-if="showLogo" :collapse="collapsed" /> -->
    <a-menu mode="inline" theme="dark" :inline-collapsed="collapsed">
      <template v-for="(route, index) in sidebarRoutes">
        <!-- 非hidden的菜单渲染 -->
        <template v-if="!route.hidden">
          <!-- 只包含一层 -->
          <template
            v-if="
              hasOneShowingChild(route.children, route) &&
                (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
                !route.alwaysShow
            "
          >
            <a-menu-item
              v-if="onlyOneChild.meta && onlyOneChild.meta.title"
              :key="resolvePath(onlyOneChild.path, route)"
            >
              <item
                :icon="
                  onlyOneChild.meta.icon || (route.meta && route.meta.icon)
                "
                :title="onlyOneChild.meta.title"
              />
              {{ text }}
            </a-menu-item>
          </template>

          <!-- 多层子级 -->
          <sub-menu
            v-else
            :menu-info="route"
            :key="route.path"
            :base-path="route.path"
          />
        </template>
      </template>
    </a-menu>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
// import Logo from "./Logo";

import path from "path";
import { isExternal } from "@/utils/validate";
import Item from "./Item";
import AppLink from "./Link";
import FixiOSBug from "./FixiOSBug";

import { Menu } from "ant-design-vue";
const SubMenu = {
  name: "SubMenu",
  template: `
    <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon type="mail" /><span>{{ menuInfo.title }}</span>
        </span>
        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="!item.children" :key="item.key">
            <a-icon type="pie-chart" />
            <span>{{ item.title }}</span>
          </a-menu-item>
          <sub-menu v-else :key="item.key" :menu-info="item" />
        </template>
      </a-sub-menu>
  `,
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    menuInfo: Object,
    basePath: String
  }
};
export default {
  mixins: [FixiOSBug],
  components: { Item, AppLink, "sub-menu": SubMenu },
  
  data() {
    this.onlyOneChild = null;
    return {
      collapsed: false,
      showLogo: true,
      text: "10"
    };
  },
  computed: {
    ...mapGetters(["sidebar", "sidebarRoutes"])
  },
  created() {
    console.log(111, this.sidebarRoutes);
  },
  mounted() {},
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath, route) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(route.path)) {
        return route.path;
      }
      return path.resolve(route.path, routePath);
    }
  }
};
</script>
<style lang="less" scoped>
.sidebar-container {
  height: 100%;
}
</style>
