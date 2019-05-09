'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var variables_js = require('./variables.js');

/**
 * @namespace strTool
 */
/**
 * 把URL查询参数转换为object
 * @memberOf strTool
 * @function query2obj
 * @param {string} query - url问号后面的查询参数  e.g. ?id=66597&type=2&stuNum=1
 * @returns {object}
 */

function query2obj(query) {
  if (!variables_js.isCorrect(query)) return {};
  var queryItems = query.slice(1).split("&");
  var queryMap = {};
  queryItems.forEach(function (item) {
    if (!variables_js.isCorrect(item)) return;
    var itemArr = item.split("="),
        key = itemArr[0],
        value = itemArr[1];
    queryMap[key] = value;
  });
  return queryMap;
}

function lowercase2capitalize(string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
}

exports.query2obj = query2obj;
exports.lowercase2capitalize = lowercase2capitalize;
