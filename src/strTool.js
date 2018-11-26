import variables from "./variables";

/**
 * @namespace strTool
*/
const strTool = {
  /**
   * 把URL查询参数转换为object
   * @memberOf strTool
   * @function query2obj
   * @param {string} query - url问号后面的查询参数 e.g. ?id=66597&type=2&stuNum=1
   * @returns {object}
  */
  query2obj: function (query) {
    if (!variables.isCorrect(query)) return {};

    const queryItems = query.slice(1).split("&");
    const queryMap = {};
    queryItems.forEach(item => {
      if (!variables.isCorrect(item)) return;

      const itemArr = item.split("="),
        key = itemArr[0],
        value = itemArr[1];
      queryMap[key] = value;
    });

    return queryMap;
  }
};
export default strTool;