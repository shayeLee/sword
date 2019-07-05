(function () {
  'use strict';

  /**
   * @namespace arrTool
   */

  /**
   * @namespace dateTool
   */

  /**
   * @namespace variables
   */

  /**
   * 获取document尺寸（不包含滚动条）
   * @memberof domTool
   * @param {string} [prop=null] - 指定属性 width 或者 height
   */


  function getDocumentSize() {
    var prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var width = document.documentElement.clientWidth || document.body.clientWidth;
    var height = document.documentElement.clientHeight || document.body.clientHeight;
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

  console.log('获取尺寸对象：', getDocumentSize());
  console.log('只获取宽度：', getDocumentSize('width'));

}());
//# sourceMappingURL=example.js.map
