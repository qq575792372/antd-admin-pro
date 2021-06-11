/**
 * @param {string} url
 * @returns {Object}
 */
function param2Obj(url) {
  const search = decodeURIComponent(url.split("?")[1]).replace(/\+/g, " ");
  if (!search) {
    return {};
  }
  const obj = {};
  const searchArr = search.split("&");
  searchArr.forEach(v => {
    const index = v.indexOf("=");
    if (index !== -1) {
      const name = v.substring(0, index);
      const val = v.substring(index + 1, v.length);
      obj[name] = val;
    }
  });
  return obj;
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
function deepClone(source) {
  if (!source && typeof source !== "object") {
    throw new Error("error arguments", "deepClone");
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === "object") {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}

/**
 * 获得日期Date字符串，默认为当前日期
 */
function getDefaultDate(date = new Date(), separator = "-") {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return [year, month, day].map(digit).join(separator);
}
/**
 * 获得日期DateTime字符串，默认为当前时间
 */
function getDefaultDateTime(date = new Date(), separator = "-") {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  return (
    [year, month, day].map(digit).join(separator) +
    " " +
    [hour, minute, second].map(digit).join(":")
  );
}
/**
 * 获得加减天数后的日期
 * @param {Date} date 可以为空，默认当前日期；也可以指定任意日期Date
 * @param {Number} num 加减天数的数量，用-1和+1天表示
 * @returns 返回加减天数后的日期Date
 */
function getDiffDate(date = new Date(), num = +1) {
  date.setDate(date.getDate() + num);
  return date;
}
/**
 * 数字前补齐零
 */
function digit(value) {
  value = value.toString();
  return value[1] ? value : "0" + value;
}

module.exports = {
  param2Obj,
  deepClone,
  getDefaultDate,
  getDefaultDateTime,
  digit,
  getDiffDate
};
