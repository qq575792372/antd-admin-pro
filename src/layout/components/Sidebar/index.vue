<template>
  <div class="sidebar-container" :class="{ 'has-logo': showLogo }">
    <!-- logo -->
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <div class="sidebar-scroll">
      <vue-scrollbar>
        <a-menu
          mode="inline"
          theme="dark"
          :selectedKeys="currentSelectMenu"
          :openKeys="openKeys"
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
                    (!onlyOneChild.children ||
                      onlyOneChild.noShowingChildren) &&
                    !item.alwaysShow
                "
              >
                <a-menu-item
                  v-if="onlyOneChild.meta && onlyOneChild.meta.title"
                  :key="resolvePath(onlyOneChild.path, item)"
                >
                  <app-link :to="resolvePath(onlyOneChild.path, item)">
                    <a-icon
                      v-if="
                        (onlyOneChild.meta && onlyOneChild.meta.icon) ||
                          (item.meta && item.meta.icon)
                      "
                      :type="
                        (onlyOneChild.meta && onlyOneChild.meta.icon) ||
                          (item.meta && item.meta.icon)
                      "
                    />
                    <span>
                      {{ onlyOneChild.meta.title }}
                    </span>
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
      </vue-scrollbar>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import path from "path";
import { isExternal } from "@/utils/validate";
import FixiOSBug from "./FixiOSBug";

// 导入组件
import VueScrollbar from "@/components/VueScrollbar";
import Logo from "./Logo";
import AppLink from "./Link";
import SubMenu from "./subMenu";
import { match } from "assert";

export default {
  mixins: [FixiOSBug],
  components: { VueScrollbar, SubMenu, AppLink, Logo },
  data() {
    // 在此声明，不然会菜单递归渲染报错
    this.onlyOneChild = null;
    return {
      openKeys: []
    };
  },
  computed: {
    ...mapGetters(["sidebar", "sidebarRoutes"]),
    // 当前菜单选择的
    currentSelectMenu() {
      return [this.$route.path];
    },
    // 是否展示logo
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    // 是否折叠菜单
    isCollapse() {
      return !this.$store.getters.sidebar.opened;
    },
    // root菜单列表
    rootMenuKeys() {
      let rootKeys = [];
      this.sidebarRoutes
        .filter(item => !item.hidden && item.path !== "/")
        .map(item => {
          rootKeys.push(item.path);
        });
      return rootKeys;
    }
  },
  watch: {
    // 监听路由的变化
    $route(to, from) {
      this.initOpenKeys();
    }
  },
  created() {
    this.initOpenKeys();
  },
  mounted() {},
  methods: {
    /**
     * 初始化菜单，默认打开并选中当前路由对应的菜单
     */
    initOpenKeys() {
      const openKeysArr = this.$route.path.split("/");
      openKeysArr.shift();
      openKeysArr.pop();
      this.openKeys = [];
      openKeysArr.forEach((item, index) => {
        let path = item;
        if (index == 0) {
          path = "/" + item;
        }
        this.openKeys.push(path);
      });
    },
    /**
     * 点击菜单触发事件
     */
    menuClick({ item, key, keyPath }) {
      // length为1则说明没有子菜单
      keyPath.length === 1 ? (this.openKeys = []) : "";
    },
    /**
     * 子菜单展开/关闭的回调
     */
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      );
      if (this.rootMenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    /**
     * 判断是否包含多个子级菜单
     */
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
    /**
     * 转换路径
     */
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
    height: calc(100vh - 60px);
    overflow: hidden;
  }
}
</style>
