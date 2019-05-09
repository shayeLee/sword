/**
 * @namespace strTool
 */

import { isCorrect } from "./variables";

/**
 * 把URL查询参数转换为object
 * @memberOf strTool
 * @function query2obj
 * @param {string} query - url问号后面的查询参数  e.g. ?id=66597&type=2&stuNum=1
 * @returns {object}
 */
function query2obj(query) {
  if (!isCorrect(query)) return {};

  const queryItems = query.slice(1).split("&");
  const queryMap = {};
  queryItems.forEach(item => {
    if (!isCorrect(item)) return;

    const itemArr = item.split("="),
      key = itemArr[0],
      value = itemArr[1];
    queryMap[key] = value;
  });

  return queryMap;
}

function lowercase2capitalize(string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
}

export { query2obj, lowercase2capitalize }
