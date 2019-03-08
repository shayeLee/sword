'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('core-js/modules/es6.promise');

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

exports.getImgBase64 = getImgBase64;
