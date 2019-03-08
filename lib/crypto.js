'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('core-js/modules/es6.function.name');
var base64 = _interopDefault(require('crypto-js/enc-base64'));
var md5 = _interopDefault(require('crypto-js/md5'));
var utf8 = _interopDefault(require('crypto-js/enc-utf8'));
var hmacSHA1 = _interopDefault(require('crypto-js/hmac-sha1'));

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

exports.randomCode = randomCode;
exports.generateUploadParams = generateUploadParams;
