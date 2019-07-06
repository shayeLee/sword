// import { isCorrect } from "./variables";

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
  let actualTop = element.offsetTop;
  let current = element.offsetParent;
  const _target = target ? target : document.documentElement;

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
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent;
  const _target = target ? target : document.documentElement;

  while (!(current === null || current === _target)) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }

  return actualLeft;
}

/**
 * 获取PC浏览器滚动条宽度
 * @memberof domTool
 */
function getScrollBarWidth() {
  const testElement = document.createElement('div');
  testElement.style.visibility = 'hidden';
  testElement.style.position = 'fixed';
  testElement.style.top = '0';
  testElement.style.left = '0';
  testElement.style.zIndex = '-1';
  testElement.style.width = '50px';
  testElement.style.height = '50px';
  testElement.style.overflowY = 'auto';
  testElement.innerHTML = '<div id="test-scroll-bar-body" style="height: 100px;"></div>';
  document.body.appendChild(testElement);
  const innerWidth = document.getElementById('test-scroll-bar-body').clientWidth;
  document.body.removeChild(testElement);
  return 50 - innerWidth;
}

/**
 * 获取浏览器窗口尺寸（不包含滚动条）
 * @memberof domTool
 * @param {string} [prop=null] - 指定属性 width 或者 height
 */
function getWindowSize(prop = null) {
  const width = document.documentElement.clientWidth || window.innerWidth;
  const height = document.documentElement.clientHeight || window.innerHeight;
  const sizeObj = { width, height };
  if (
    prop === 'width' ||
    prop === 'height'
  ) return sizeObj[prop];
  return sizeObj;
}

export { getElementTop, getElementLeft, getWindowSize, getScrollBarWidth };
