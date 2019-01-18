/**
 * @class Observable
 */

import { isCorrect } from "../../variables";

class Observable {
  constructor(value) {
    this.value = value;
  }

  /**
   * 根据入参函数创建一个新的函子
   * @param {function} f - 处理函子值的函数
   * @returns {functor} 返回一个新的函子
   */
  map(f) {
    return isCorrect(this.value) ? new Observable(f(this.value)) : new Observable(null);
  }

  /**
   * 函子是否有正确的值
   * @returns {boolean}
   */
  isNothing() {
    return !isCorrect(this.value);
  }
}

/**
 * 创建函子
 * @param {*} value - 函子的值
 * @returns {functor}
 */
Observable.of = function(value) {
  return new Observable(value);
};

export default Observable;
