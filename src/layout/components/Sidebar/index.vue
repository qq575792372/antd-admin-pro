<template>
  <div class="sidebar-container">
    <!-- logo -->
    <Logo v-if="showLogo" :collapse="isCollapsed" />
    <div class="sidebar-scroll">
      <a-menu
        mode="inline"
        theme="dark"
        :selected-keys="currentSelectMenu"
        :open-keys="openKeys"
        @click="menuClick"
        @openChange="onOpenChange"
      >
        <template v-for="item in sidebarRoutes">
          <!-- 非hidden的菜单渲染 -->
          <template v-if="!item.hidden">
            <!-- 只包含一个children子菜单 -->
            <template
              v-if="
                hasOneShowingChild(item.children, item) &&
                  (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
                  !item.alwaysShow
              "
            >
              <a-menu-item
                v-if="onlyOneChild.meta && onlyOneChild.meta.title"
                :key="resolvePath(onlyOneChild.path, item)"
              >
                <app-link :to="resolvePath(onlyOneChild.path, item)">
                  <a-icon
                    :type="
                      (onlyOneChild.meta && onlyOneChild.meta.icon) ||
                        (item.meta && item.meta.icon)
                    "
                  />
                  <span>{{ onlyOneChild.meta.title }}</span>
                </app-link>
              </a-menu-item>
            </template>
            <!-- children子菜单有多层 -->
            <sub-menu
              v-else
              :menu-info="item"
              :key="item.path"
              :base-path="item.path"
            />
          </template>
        </template>
      </a-menu>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import path from "path";
import { isExternal } from "@/utils/validate";
import FixiOSBug from "./FixiOSBug";
// 导入组件
import Logo from "./Logo";
import AppLink from "./Link";
import SubMenu from "./subMenu";
import BScroll from "better-scroll";

export default {
  mixins: [FixiOSBug],
  components: { SubMenu, AppLink, Logo },
  data() {
    // 在此声明，不然会菜单递归渲染报错
    this.onlyOneChild = null;
    return {
      isCollapsed: false,
      openKeys: []
    };
  },
  computed: {
    ...mapGetters(["sidebar", "sidebarRoutes"]),
    currentSelectMenu() {
      return [this.$route.path];
    },
    // 是否展示logo
    showLogo() {
      return true;
    }
  },
  created() {
    console.log(111, this.sidebarRoutes);
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.betterScroll, {});
    });
  },
  methods: {
    // 点击菜单触发事件
    menuClick({ item, key, keyPath }) {
      // length为1则说明没有子菜单
      keyPath.length === 1 ? (this.openKeys = []) : "";
    },
    // 子菜单展开/关闭的回调
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      );
      this.openKeys = openKeys
        ? openKeys
        : latestOpenKey
        ? [latestOpenKey]
        : [];
    },
    // 包含子级
    hasOneShowingChild(children = [], parent) {
      if (!children) {
        children = [];
      }
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
    // 转换路径
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
<style lang="less">
.sidebar-container {
  .sidebar-scroll {
    height: calc(100vh - 50px);
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
  }
}
</style>
