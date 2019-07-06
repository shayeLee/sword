import { getWindowSize } from '../src/index';

window.addEventListener('load', function () {
  console.log('获取窗口尺寸：', getWindowSize());
  console.log('获取窗口宽度：', getWindowSize('width'));
  console.log('获取窗口高度：', getWindowSize('height'));
});