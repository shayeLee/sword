'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('core-js/modules/es7.string.pad-start');
require('core-js/modules/es6.string.iterator');
require('core-js/modules/es6.array.from');
require('core-js/modules/es6.regexp.split');
require('core-js/modules/es6.regexp.to-string');

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
 * 获取当前周的每天的日期（共七天）
 * @memberof dateTool
*/


function getCurrWeekDates() {
  var timeOfToday = Date.now();
  var weekOfToday = (new Date().getDay() + 7 - 1) % 7;
  return Array.from(new Array(7)).map(function (_, i) {
    var date = new Date(timeOfToday + (i - weekOfToday) * 1000 * 60 * 60 * 24);
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
  });
}

exports.time2str = time2str;
exports.str2time = str2time;
exports.getCurrWeekDates = getCurrWeekDates;
