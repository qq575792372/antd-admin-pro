<template>
  <div class="app-container">
    首页
    <a-button type="primary" @click="detailModal = true">
      Open Modal with async logic
    </a-button>

    <a-tree
      checkable
      :selected-keys="selectKeys"
      :tree-data="treeData"
    />

    <a-modal
      title="Title"
      :centered="true"
      :visible="detailModal"
      @ok="detailModal = false"
      @cancel="detailModal = false"
    >
      <p>水电费水电费水电费</p>
    </a-modal>
  </div>
</template>

<script>
import { login } from "@/api/user.js";

export default {
  name: "home",
  data() {
    return {
      // 列表查询分页
      list: [],
      listLoading: false,
      listTotal: 0,
      listQuery: {
        title: "",
        pageNo: 1,
        pageSize: 10,
      },

      // 详情弹框
      detailModal: false,
      detailObj: {},

      selectKeys: ["1", "1-1", "1-3"],
      treeData: [
        {
          key: "1",
          title: "菜单权限",
          children: [
            {
              key: "1-1",
              title: "用户管理",
            },
            {
              key: "1-2",
              title: "部门管理",
            },
            {
              key: "1-3",
              title: "权限管理",
            },
          ],
        },
      ],
    };
  },
  created() {
    // this.handleLogin()
  },
  methods: {
    handleLogin() {
      login({
        username: "admin",
        password: "123456",
      })
        .then((res) => {
          if (res) {
            // success, do somethings
          } else {
            this.$message({
              type: "error",
              message: "操作失败",
            });
          }
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: "操作失败",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.app-container {
}
</style>
