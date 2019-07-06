(function () {
  'use strict';

  /**
   * @namespace arrTool
   */

  /**
   * @namespace dateTool
   */

  // import { isCorrect } from "./variables";
  /**
   * 获取浏览器窗口尺寸（不包含滚动条）
   * @memberof domTool
   * @param {string} [prop=null] - 指定属性 width 或者 height
   */


  function getWindowSize() {
    var prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var width = document.documentElement.clientWidth || window.innerWidth;
    var height = document.documentElement.clientHeight || window.innerHeight;
    var sizeObj = {
      width: width,
      height: height
    };
    if (prop === 'width' || prop === 'height') return sizeObj[prop];
    return sizeObj;
  }

  /**
   * @namespace fileTool
   */

  /**
   * @namespace variables
   */

  /**
   * @namespace objTool
   */

  /**
   * @namespace strTool
   */

  /**
   * @namespace animate
   */

  /**
   * @namespace functional
   */

  window.addEventListener('load', function () {
    console.log('获取窗口尺寸：', getWindowSize());
    console.log('获取窗口宽度：', getWindowSize('width'));
    console.log('获取窗口高度：', getWindowSize('height'));
  });

}());
//# sourceMappingURL=example.js.map
