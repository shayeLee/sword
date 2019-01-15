import 'core-js/modules/web.dom.iterable';
import 'core-js/modules/es6.regexp.split';
import 'core-js/modules/es6.regexp.to-string';

/**
 * @namespace variables
 */

/**
 * 判断变量是否是object
 * @memberOf variables
 * @function isObject
 * @param {*} obj
 */
function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
/**
 * 判断object是否是空的
 * @memberOf variables
 * @function isEmptyObject
 * @param {object} obj
 */


function isEmptyObject(obj) {
  for (var key in obj) {
    return false;
  }

  return true;
}
/**
 * 检验变量是否有正确的值
 * @memberOf variables
 * @function isCorrect
 * @param {*} variable - 被检验的变量
 * @param {boolean} [notBezero=false] - 是否不允许变量等于零
 */


function isCorrect(variable, notBezero) {
  var result = true;

  if (typeof variable === "string" && (variable === "" || variable === "undefined" || variable === "null" || variable === "NaN" || variable === "Infinity")) {
    result = false;
  } else if (typeof variable === "number" && (isNaN(variable) || !isFinite(variable) || notBezero && variable === 0)) {
    result = false;
  } else if (variable === null) {
    result = false;
  } else if (typeof variable === "undefined") {
    result = false;
  } else if (isObject(variable)) {
    if (isEmptyObject(variable)) {
      result = false;
    }
  } else if (Array.isArray(variable)) {
    if (variable.length === 0) {
      result = false;
    }
  }

  return result;
}

/**
 * 把URL查询参数转换为object
 * @memberOf strTool
 * @function query2obj
 * @param {string} query - url问号后面的查询参数  e.g. ?id=66597&type=2&stuNum=1
 * @returns {object}
 */

function query2obj(query) {
  if (!isCorrect(query)) return {};
  var queryItems = query.slice(1).split("&");
  var queryMap = {};
  queryItems.forEach(function (item) {
    if (!isCorrect(item)) return;
    var itemArr = item.split("="),
        key = itemArr[0],
        value = itemArr[1];
    queryMap[key] = value;
  });
  return queryMap;
}

export { query2obj };
