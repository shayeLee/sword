/**
 * @namespace objTool
 */

import { isCorrect } from "./variables";

/**
 * 将object转换为URL查询参数
 * @memberOf objTool
 * @function obj2query
 * @param {object} obj - 要转换为查询参数的object
 * @returns {string} - URL查询参数
 */
function obj2query(obj) {
  if (!isCorrect(obj)) return "";

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
export { obj2query }