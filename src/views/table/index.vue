<template>
  <div class="app-container">
    <!-- 表格 -->
    <div class="scroll-container" ref="bsScroll">
      <vue-scrollbar :options="scrollbarOptions">
        <div class="scroll-inner" v-for="(item, index) in 3" :key="index">
          {{ index }}
        </div>
      </vue-scrollbar>
    </div>
  </div>
</template>

<script>
import VueScrollbar from "@/components/VueScrollbar";

export default {
  components: { VueScrollbar },
  data() {
    return {
      scrollbarOptions: {
        // maxHeight: 100
      }
    };
  },
  created() {},
  mounted() {}
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
