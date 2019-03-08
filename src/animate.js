/**
 * @namespace animate
 */

/**
 * js动画引擎
 * @memberof animate
 * @param {function} cb - 逐帧回调函数
*/
function rAF(cb) {
  var rAF =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(cb) {
      window.setTimeout(cb, 1000 / 60);
    };
  return rAF(cb);
}

export { rAF }
