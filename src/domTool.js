/**
 * @namespace domTool
 */

const domTool = {
  /**
   * 获取dom元素距离指定定位父元素顶部的高度
   * @memberof domTool
   * @function getElementTop
   * @param {element} element - 目标元素
   * @param {element} [target=document.documentElement] - 指定定位父元素，默认为document.documentElement
   * @returns {number} elementTop
   */
  getElementTop: function(element, target) {
    let actualTop = element.offsetTop;
    let current = element.offsetParent;
    const _target = target ? target : document.documentElement;

    while (!(current === null || current === _target)) {
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }

    return actualTop;
  },

  /**
   * 获取dom元素距离指定定位父元素左边的宽度
   * @memberof domTool
   * @function getElementLeft
   * @param {element} element - 目标元素
   * @param {element} [target=document.documentElement] - 指定定位父元素，默认为document.documentElement
   * @returns {number} elementLeft
   */
  getElementLeft: function(element, target) {
    let actualLeft = element.offsetLeft;
    let current = element.offsetParent;
    const _target = target ? target : document.documentElement;

    while (!(current === null || current === _target)) {
      actualLeft += current.offsetLeft;
      current = current.offsetParent;
    }

    return actualLeft;
  }
};

export default domTool;
