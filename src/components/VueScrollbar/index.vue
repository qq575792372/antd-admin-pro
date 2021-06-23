<template>
  <vue-scroll :ops="scrollOptions">
    <slot />
  </vue-scroll>
</template>

<script>
import VueScroll from "vuescroll";
export default {
  components: { VueScroll },
  props: {
    options: {
      require: false,
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      scrollOptions: {
        vuescroll: {
          wheelScrollDuration: 300 // 滚动动画延迟
        },
        scrollPanel: {
          easing: "easeInOutQuint" // 滚动动画
        },
        // 滚动条背景配置
        rail: {},
        // 滚动条滑块配置
        bar: {
          onlyShowBarOnScroll: false,
          showDelay: 1000,
          background: "#909399",
          opacity: 0.5
        }
      }
    };
  },
  created() {
    this.initOptions();
  },
  methods: {
    initOptions() {
      this.scrollOptions = { ...this.scrollOptions, ...this.options };
      console.log(" this.scrollOptions ", this.scrollOptions);
    }
  }
};
</script>
