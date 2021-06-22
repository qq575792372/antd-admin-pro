<template functional>
  <a-sub-menu :key="props.menuInfo.key">
    <span slot="title">
      <svg-icon :icon-class="props.menuInfo.meta.icon" />
      <span>{{ props.menuInfo.meta && props.menuInfo.meta.title }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item v-if="!item.children" :key="item.name">
        <svg-icon :icon-class="props.menuInfo.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.key" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  props: ["menuInfo"]
};
</script>
