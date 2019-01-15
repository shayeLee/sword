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
 * 判断函数是否是Promise对象
 * @memberOf variables
 * @param {function} fn - 被判断的函数
 */


function isPromise(fn) {
  return isCorrect(fn) && typeof fn.then === "function";
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
 * array object 深拷贝
 * @memberOf variables
 * @function cloneDeep
 * @param {object|array} target - 被拷贝的对象
 */


function cloneDeep(target) {
  var _isObject = isObject(target);

  var _isArray = Array.isArray(target);

  if (_isObject || _isArray) {
    var newObj = {};

    for (var key in target) {
      newObj[key] = cloneDeep(target[key]);
    }

    return newObj;
  }

  return target;
}

export { isObject, isEmptyObject, isPromise, isCorrect, cloneDeep };
