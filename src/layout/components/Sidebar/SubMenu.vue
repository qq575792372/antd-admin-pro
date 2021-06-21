<template>
  <a-sub-menu ref="subMenu" :key="resolvePath(item.path)">
      费大幅度发
    <!-- <template slot="title">
      <item
        v-if="item.meta"
        :icon="item.meta && item.meta.icon"
        :title="item.meta.title"
      />
    </template>
    <sub-menu
      v-for="child in item.children"
      :key="child.path"
      :is-nest="true"
      :item="child"
      :base-path="resolvePath(child.path)"
      class="nest-menu"
    /> -->
  </a-sub-menu>
</template>
<script>
import Item from "./Item";
import path from "path";
import { isExternal } from "@/utils/validate";
export default {
  components: { Item },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  methods: {
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    }
  }
};
</script>
