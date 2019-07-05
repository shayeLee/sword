/**
 * @namespace functional
 */

/**
 * 函数防抖
 * @memberof functional
 * @param {function} func
 * @param {number} delay
 * @returns {function}
 */
function debounce(func, delay) {
    let timeout;
    return function(e) {
        clearTimeout(timeout);
        let context = this,
            args = arguments;
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, delay);
    };
}

/**
 * 函数节流
 * @memberof functional
 * @param {function} func
 * @param {number} threshold
 * @returns {function}
 */
function throttle(func, threshold) {
    let timeout;
    let start = new Date();
    let _threshold = threshold || 160;
    return function() {
        let context = this,
            args = arguments,
            curr = new Date() - 0;

        clearTimeout(timeout);
        if (curr - start >= _threshold) {
            func.apply(context, args);
            start = curr;
        } else {
            //让方法在脱离事件后也能执行一次
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, _threshold);
        }
    };
}

export { debounce, throttle }