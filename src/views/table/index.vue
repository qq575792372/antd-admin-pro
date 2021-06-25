<template>
  <div class="app-container">
    <!-- header -->
    <div class="header-container">
      <div class="search-box">
        <a-input
          v-model="listQuery.name"
          placeholder="名称"
          allowClear
          style="width:180px;"
        />
        <a-select
          v-model="listQuery.type"
          placeholder="状态"
          style="width:180px;"
          allowClear
        >
          <a-select-option value="1">禁用</a-select-option>
          <a-select-option value="2">启用</a-select-option>
        </a-select>
        &nbsp;&nbsp;
        <a-button type="primary" @click="queryData">
          查询
        </a-button>
        <a-button type="default">
          重置
        </a-button>
      </div>
    </div>
    <!-- main -->
    <div class="main-container">
      <div class="table-box">
        <a-table :dataSource="list" :loading="listLoading" size="middle">
          <a-table-column key="id" title="ID编号" data-index="id" />
          <a-table-column key="name" title="名称">
            <template slot-scope="row">
              {{ row.name }}
            </template>
          </a-table-column>
          <a-table-column key="action" title="操作">
            <template slot-scope="row">
              <a-button type="primary" size="small">
                编辑
              </a-button>
              &nbsp;
              <a-button type="danger" size="small">
                删除
              </a-button>
            </template>
          </a-table-column>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 列表分页
      list: [],
      listTotal: 0,
      listLoading: false,
      listQuery: {
        name: "",
        type: undefined,
        pageNo: 1,
        pageSize: 10
      }
    };
  },
  created() {
    this.queryData();
  },
  methods: {
    /**
     * 查询列表
     */
    queryData() {
      this.listLoading = true;
      for (let i = 0; i < 20; i++) {
        this.list.push({
          id: i,
          name: "名称" + i
        });
      }
      setTimeout(() => {
        this.listLoading = false;
      }, 300);
    }
  }
};
</script>

<style lang="less" scoped>
.app-container {
  .header-container {
    .search-box {
      .ant-input-affix-wrapper,
      .ant-select,
      .ant-btn {
        margin-right: 10px;
      }
    }
  }
  .main-container {
    margin-top: 14px;
  }
}
</style>
