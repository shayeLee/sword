/**
 * @namespace crypto
 */

import base64 from "crypto-js/enc-base64";
import md5 from "crypto-js/md5";
import utf8 from "crypto-js/enc-utf8";
import hmacSHA1 from "crypto-js/hmac-sha1";

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

function generateOSSKey(name) {
  const time = new Date();
  const rootPath = `live/tms/${time.getFullYear()}/${time.getMonth() +
    1}/${time.getDate()}/`;
  return `${rootPath}${md5(name)}-${name}`;
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
  const policy = base64.stringify(
    utf8.parse(
      JSON.stringify({
        expiration: "2020-01-01T12:00:00.000Z",
        conditions: [["content-length-range", 0, 41943040]]
      })
    )
  );

  return {
    key: generateOSSKey(file.name),
    OSSAccessKeyId: id,
    policy,
    Signature: base64.stringify(hmacSHA1(policy, secret)),
    success_action_status: "200"
  };
}
export { randomCode, generateUploadParams, generateOSSKey }
