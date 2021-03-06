import { isCorrect } from './variables.js';

/**
 * @namespace objTool
 */
/**
 * 将object转换为URL查询参数
 * @memberOf objTool
 * @function obj2query
 * @param {object} obj - 要转换为查询参数的object
 * @returns {string} - URL查询参数
 */

function obj2query(obj) {
  if (!isCorrect(obj)) return "";
  var query = "";

  for (var key in obj) {
    if (query === "") {
      query += "".concat(key, "=").concat(obj[key]);
    } else {
      query += "&".concat(key, "=").concat(obj[key]);
    }
  }

  return "?".concat(query);
}

export { obj2query };
