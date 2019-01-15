import 'core-js/modules/es6.function.name';
import base64 from 'crypto-js/enc-base64';
import md5 from 'crypto-js/md5';
import utf8 from 'crypto-js/enc-utf8';
import hmacSHA1 from 'crypto-js/hmac-sha1';
import 'core-js/modules/es6.promise';
import 'core-js/modules/es6.regexp.to-string';
import 'core-js/modules/web.dom.iterable';
import 'core-js/modules/es6.regexp.split';

/**
 * @namespace arrTool
 */

/**
 * 枚举flags数组所有元素之和反向求解
 * @memberof arrTool
 * @function enumFlagsThrustReverser
 * @param {number} sum - 枚举flags数组所有元素之和
 * @returns {array} enumFlags - 枚举flags数组
 */
function enumFlagsThrustReverser(sum) {
  if (sum === 1) return [1];
  var code = 1;
  var subjectCodeArr = [];

  while (code <= sum) {
    if ((code & sum) === code) {
      subjectCodeArr.push(code);
    }

    code *= 2;
  }

  return subjectCodeArr;
}

/**
 * 生成指定长度的随机码
 * @memberof crypto
 * @function randomCode
 * @param {number} length - 随机码的长度，必须大于零
 * @returns {string}
 */

function randomCode(length) {
  if (length <= 0) return null;
  var len = length;
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var maxPos = chars.length;
  var code = "";

  for (var i = 0; i < len; i++) {
    code += chars.charAt(Math.floor(Math.random() * maxPos));
  }

  return code;
}

function _generateOSSKey(name) {
  var time = new Date();
  var rootPath = "live/tms/".concat(time.getFullYear(), "/").concat(time.getMonth() + 1, "/").concat(time.getDate(), "/");
  return "".concat(rootPath).concat(md5(name), "-").concat(name);
}
/**
 * 生成OSS文件上传表单参数
 * @memberof crypto
 * @function generateUploadParams
 * @param {file} file - 上传的文件
 * @param {string} id - OSSAccessKeyId
 * @param {string} secret - OSSAccessKeySecret
 * @returns {object}
 */


function generateUploadParams(file, id, secret) {
  var policy = base64.stringify(utf8.parse(JSON.stringify({
    expiration: "2020-01-01T12:00:00.000Z",
    conditions: [["content-length-range", 0, 41943040]]
  })));
  return {
    key: _generateOSSKey(file.name),
    OSSAccessKeyId: id,
    policy: policy,
    Signature: base64.stringify(hmacSHA1(policy, secret)),
    success_action_status: "200"
  };
}

/**
 * @namespace dateTool
 */

/**
 * 将时间对象转换为时间字符串
 * @memberOf dateTool
 * @function time2str
 * @param {date} date - 时间对象
 * @param {string} type - 时间字符串类型
 * e.g. "date-time" => 2016-5-31 10:25:10
 * e.g. "date" => 2016-5-31
 * e.g. "month-day" => 5-31
 * e.g. "time" => 10:30
 * e.g. "china-date" => 2016年5月31日
 * e.g. "week" => 周一（5月31日）
 * @returns {string} 时间字符串
 */
function time2str(date, type) {
  var _date = date;
  if (typeof _date === "number") date = new Date(_date);
  var weekdayMap = {
    1: "周一",
    2: "周二",
    3: "周三",
    4: "周四",
    5: "周五",
    6: "周六",
    0: "周天"
  };
  var weekday = weekdayMap[date.getDay()];
  var day = date.getDate().toString();
  if (day.length === 1) day = "0" + day;
  var mou = (date.getMonth() + 1).toString();
  if (mou.length === 1) mou = "0" + mou;
  var yea = date.getFullYear().toString();
  var hou = date.getHours().toString();
  if (hou.length === 1) hou = "0" + hou;
  var min = date.getMinutes().toString();
  if (min.length === 1) min = "0" + min;
  var sen = date.getSeconds().toString();
  if (sen.length === 1) sen = "0" + sen;

  if (type === "date-time") {
    return yea + "-" + mou + "-" + day + " " + hou + ":" + min + ":" + sen;
  } else if (type === "date") {
    return yea + "-" + mou + "-" + day;
  } else if (type === "month-day") {
    return mou + "-" + day;
  } else if (type === "time") {
    return hou + ":" + min;
  } else if (type === "china-date") {
    return yea + "年" + mou + "月" + day + "日";
  } else if (type === "week") {
    return weekday + "(" + mou + "月" + day + "日)";
  }
}
/**
 * 将时间字符串转换为时间对象
 * @memberOf dateTool
 * @function str2time
 * @param {string} strTime - 时间字符串
 * e.g. "2017-02-13 10:02:58"
 * e.g. "2017-02-13"
 * e.g. "9:10"
 */


function str2time(strTime) {
  // new Date(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);
  strTime = strTime.trim();

  var _type;

  if (strTime.indexOf("-") > -1 && strTime.indexOf(":") > -1) {
    _type = "dateTime";
  } else if (strTime.indexOf("-") > -1 && strTime.indexOf(":") < 0) {
    _type = "date";
  } else if (strTime.indexOf("-") < 0 && strTime.indexOf(":") > -1) {
    _type = "time";
  }

  var arr;
  var date;
  var time;
  var dateArr;
  var year;
  var month;
  var day;
  var timeArr;
  var hour;
  var minutes;
  var seconds;

  if (_type === "dateTime") {
    arr = strTime.split(" ");
    date = arr[0];
    dateArr = date.split("-");
    year = dateArr[0];
    month = dateArr[1];
    day = dateArr[2];
    time = arr[1];
    timeArr = time.split(":");
    hour = timeArr[0];
    minutes = timeArr[1];
    seconds = timeArr.length > 2 ? timeArr[2] : 0;
    return new Date(year, month - 1, day, hour, minutes, seconds);
  } else if (_type === "date") {
    date = strTime;
    dateArr = date.split("-");
    year = dateArr[0];
    month = dateArr[1];
    day = dateArr[2];
    return new Date(year, month - 1, day);
  } else if (_type === "time") {
    date = new Date();
    year = date.getFullYear();
    month = date.getMonth();
    day = date.getDate();
    time = strTime;
    timeArr = time.split(":");
    hour = timeArr[0];
    minutes = timeArr[1];
    seconds = timeArr.length > 2 ? timeArr[2] : 0;
    return new Date(year, month - 1, day, hour, minutes, seconds);
  }
}

/**
 * @namespace domTool
 */

/**
 * 获取dom元素距离指定定位父元素顶部的高度
 * @memberof domTool
 * @function getElementTop
 * @param {element} element - 目标元素
 * @param {element} [target=document.documentElement] - 指定定位父元素，默认为document.documentElement
 * @returns {number} elementTop
 */
function getElementTop(element, target) {
  var actualTop = element.offsetTop;
  var current = element.offsetParent;

  var _target = target ? target : document.documentElement;

  while (!(current === null || current === _target)) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }

  return actualTop;
}
/**
 * 获取dom元素距离指定定位父元素左边的宽度
 * @memberof domTool
 * @function getElementLeft
 * @param {element} element - 目标元素
 * @param {element} [target=document.documentElement] - 指定定位父元素，默认为document.documentElement
 * @returns {number} elementLeft
 */


function getElementLeft(element, target) {
  var actualLeft = element.offsetLeft;
  var current = element.offsetParent;

  var _target = target ? target : document.documentElement;

  while (!(current === null || current === _target)) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }

  return actualLeft;
}

/**
 * @namespace fileTool
 */

/**
 * 获取图片的base64字符串
 * @memberof fileTool
 * @param {image} img
 * @returns {promise}
 */
function getImgBase64(img) {
  return new Promise(function (resolve) {
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      resolve(reader.result);
    });
    reader.readAsDataURL(img);
  });
}

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

export { enumFlagsThrustReverser, randomCode, generateUploadParams, time2str, str2time, getElementTop, getElementLeft, getImgBase64, obj2query, query2obj, isObject, isEmptyObject, isPromise, isCorrect, cloneDeep };
