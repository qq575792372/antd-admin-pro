<template>
  <div class="app-container">
    this a page
    <a-button @click="handleClick">切换路由</a-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    handleClick() {
      this.$router.push({
        path: "/member/memberLevel"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.scroll-container {
  height: 500px;
  overflow: hidden;
  border: solid 1px red;

  .scroll-inner {
    background: #ddd;
    margin: 3px;
    padding: 6px 12px;
  }
}
</style>
