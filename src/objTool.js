import variables from "./variables";

/**
 * @namespace objTool
*/
const objTool = {
  /**
   * 将object转换为URL查询参数
   * @memberOf objTool
   * @function obj2query
   * @param {object} obj - 要转换为查询参数的object
   * @returns {string} - URL查询参数
  */
  obj2query: function (obj) {
    if (!variables.isCorrect(obj)) return "";

    let query = "";
    for (const key in obj) {
      if (query === "") {
        query += `${key}=${obj[key]}`;
      } else {
        query += `&${key}=${obj[key]}`;
      }
    }

    return `?${query}`;
  }
};
export default objTool;