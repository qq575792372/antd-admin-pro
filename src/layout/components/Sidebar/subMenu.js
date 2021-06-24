import { Menu } from "ant-design-vue";
import path from "path";
import AppLink from "./Link";

// 函数式组件
const SubMenu = {
  template: `
    <a-sub-menu :key="menuInfo.path" v-bind="$props" v-on="$listeners">
      <span slot="title">
        <a-icon :type="menuInfo.meta && menuInfo.meta.icon" />
        <span>{{ menuInfo.meta.title }}</span>
      </span>
      <template v-for="item in menuInfo.children">
        <a-menu-item v-if="!item.children" :key="resolvePath(item.path)">
          <app-link :to="resolvePath(item.path)">
            <a-icon :type="item.meta && item.meta.icon" />
            <span>{{ item.meta.title }}</span>
          </app-link>
        </a-menu-item>
        <!-- 递归子菜单 -->
        <sub-menu
          v-else
          :key="item.path"
          :menu-info="item"
          :base-path="resolvePath(item.path)"
        />
      </template>
    </a-sub-menu>
  `,
  name: "SubMenu",
  // must add isSubMenu: true
  isSubMenu: true,
  components: { AppLink },
  props: {
    // mast need
    ...Menu.SubMenu.props,
    menuInfo: {
      type: Object,
      default: () => ({})
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  methods: {
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath);
    }
  }
};

export default SubMenu;
