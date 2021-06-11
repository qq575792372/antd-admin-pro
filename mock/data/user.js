const Mock = require("mockjs");
const util = require("../../utils");

// mock生成列表元数据
const mockData = Mock.mock({
  "list|35": [
    {
      id: "@guid()",
      realName: "@cname()",
    },
  ],
});

/**
 * 查询列表
 */
const getList = {
  url: "/api/user/getList",
  type: "get",
  response: (config) => {
    // 获取mock生成的元数据列表
    const list = mockData.list;
    // 获取查询参数
    const { pageNo, pageSize } = config.query;
    // 获取分页后的列表
    const records = list.filter((item, index) => index >= pageSize * (pageNo - 1) && index < pageSize * pageNo);
    // 组装返回的数据结构
    return {
      code: 0,
      data: {
        current: Number(pageNo),
        size: Number(pageSize),
        total: Number(list.length),
        records,
      },
      message: "ok",
      timestamp: Date.now(),
    };
  },
};
/**
 * 添加
 */
const addUser = {
  url: "api/user/add",
  type: "post",
  response: (config) => {
    // 获取mock生成的元数据列表
    const list = mockData.list;
    // 获取传参
    const params = config.body;
    // 添加数据
    list.unshift({
      id: Mock.Random.guid(),
      realName: params.realName,
    });
    // 组装返回的数据结构
    return {
      code: 0,
      data: "添加成功",
      message: "ok",
      timestamp: Date.now(),
    };
  },
};

/**
 * 编辑
 */
const updateUser = {
  url: "/api/user/update",
  type: "post",
  response: (config) => {
    // 获取mock生成的元数据列表
    const list = mockData.list;
    // 获取传参
    const params = config.body;
    list.some((item) => {
      if (item.id == params.id) {
        item.realName = params.realName;
        return true;
      }
    });
    // 组装返回的数据结构
    return {
      code: 0,
      data: "修改成功",
      message: "ok",
      timestamp: Date.now(),
    };
  },
};
/**
 * 根据id删除
 */
const deleteUser = {
  url: "/api/user/del",
  type: "get",
  response: (config) => {
    // 获取mock生成的元数据列表
    const list = mockData.list;
    // 获取查询参数
    const { id } = config.query;
    // 根据id删除元素
    list.map((item, index) => {
      if (item.id == id) {
        list.splice(index, 1);
      }
    });
    // 组装返回的数据结构
    return {
      code: 0,
      data: "删除成功",
      message: "ok",
      timestamp: Date.now(),
    };
  },
};
/**
 * 查询详情
 */
const getDetail = {
  url: "/api/user/getDetail",
  type: "post",
  response: (config) => {
    // 获取mock生成的元数据列表
    const list = mockData.list;
    // 获取查询参数
    const { id } = config.query;
    // 获取满足条件的记录
    const records = list.filter((item) => item.id == id);
    // 组装返回的数据结构
    return {
      code: 0,
      data: records[0],
      message: "ok",
      timestamp: Date.now(),
    };
  },
};
module.exports = [getList, addUser, updateUser, deleteUser, getDetail];
