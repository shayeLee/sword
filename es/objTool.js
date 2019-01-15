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
