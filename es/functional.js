import { isCorrect } from '../variables.js';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var Observable =
/*#__PURE__*/
function () {
  function Observable(value) {
    _classCallCheck(this, Observable);

    this.value = value;
  }
  /**
   * 根据入参函数创建一个新的函子
   * @param {function} f - 处理函子值的函数
   * @returns {functor} 返回一个新的函子
   */


  _createClass(Observable, [{
    key: "map",
    value: function map(f) {
      return isCorrect(this.value) ? new Observable(f(this.value)) : new Observable(null);
    }
    /**
     * 函子是否有正确的值
     * @returns {boolean}
     */

  }, {
    key: "isNothing",
    value: function isNothing() {
      return !isCorrect(this.value);
    }
  }]);

  return Observable;
}();
/**
 * 创建函子
 * @param {*} value - 函子的值
 * @returns {functor}
 */


Observable.of = function (value) {
  return new Observable(value);
};

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

  var _arguments = arguments;
  return function (x) {
    var currValue = x;
    var fnArr = _arguments;
    var len = _arguments.length;
    var i = len - 1;

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
  var _argLen = fn.length;
  var _argArr = [];

  var handle = function handle() {
    var _args = [].slice.call(arguments);

    if (_argArr.length + _args.length === _argLen) {
      _argArr = _argArr.concat(_args);
      return fn.apply(void 0, _toConsumableArray(_argArr));
    } else {
      _argArr = _argArr.concat(_args);
      return handle;
    }
  };

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


var map = curry(function (f, m) {
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

var maybe = curry(function (x, f, m) {
  return m.isNothing() ? x : f(m.value);
});

export { compose, curry, map, maybe, Observable };
