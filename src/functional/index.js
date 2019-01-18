/**
 * @namespace functional
 */

import Observable from "./observables/observable";

/**
 * 将多个函数组合成一个新的函数
 * @memberof functional
 * @param {function} functions - 要合成的函数，多个函数用逗号分割（至少两个）
 * e.g. const composeFunction = compose(fn1, fn2, fn3);
 * @returns {function} composeFunction
 */
function compose() {
  if (arguments.length < 2) {
    throw new RangeError("You can't have less than two functions");
  }

  const _arguments = arguments;
  return function(x) {
    let currValue = x;
    const fnArr = _arguments;
    const len = _arguments.length;
    let i = len - 1;
    for (i; i > 0; i--) {
      currValue = fnArr[i](currValue);
    }
    return fnArr[0](currValue);
  };
}

/**
 * 函数柯里化
 * @memberof functional
 * @param {function} fn - 要被柯里化的函数
 * @returns {function} curriedFunction
*/
function curry(fn) {
  const _argLen = fn.length;
  let _argArr = [];
  const handle = function () {
    const _args = [].slice.call(arguments);
    if ((_argArr.length + _args.length) === _argLen) {
      _argArr = _argArr.concat(_args);
      return fn(..._argArr);
    } else {
      _argArr = _argArr.concat(_args);
      return handle
    }
  }
  return handle;
}

/**
 * 将原本的函子转变成新函子
 * 柯里化 map :: f(a -> b) -> Functor m
 * @memberof functional
 * @method map
 * @param {function} f - 加工函子value的函数
 * @param {functor} m - 原本的函子
 * @returns {functor}
*/
const map = curry(function(f, m) {
  return m.map(f);
});

/**
 * 取出函子里的值
 * 柯里化 maybe :: b -> f(a -> b) -> Functor m -> b
 * @memberof functional
 * @method maybe
 * @param {*} x - 如果函子没有正确的值就会提供的默认值
 * @param {function} f - 取出函子里的数据的函数
 * @param {functor} m - 函子
*/
const maybe = curry(function(x, f, m) {
  return m.isNothing() ? x : f(m.value);
});

export { compose, curry, map, maybe, Observable };
