(function () {
  'use strict';

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

  var _fails = function (exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var _descriptors = !_fails(function () {
    return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
  });

  var _isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var _anObject = function (it) {
    if (!_isObject(it)) throw TypeError(it + ' is not an object!');
    return it;
  };

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _global = createCommonjsModule(function (module) {
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math
    ? window : typeof self != 'undefined' && self.Math == Math ? self
    // eslint-disable-next-line no-new-func
    : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
  });

  var document = _global.document;
  // typeof document.createElement is 'object' in old IE
  var is = _isObject(document) && _isObject(document.createElement);
  var _domCreate = function (it) {
    return is ? document.createElement(it) : {};
  };

  var _ie8DomDefine = !_descriptors && !_fails(function () {
    return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
  });

  // 7.1.1 ToPrimitive(input [, PreferredType])

  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var _toPrimitive$1 = function (it, S) {
    if (!_isObject(it)) return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var dP = Object.defineProperty;

  var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
    _anObject(O);
    P = _toPrimitive$1(P, true);
    _anObject(Attributes);
    if (_ie8DomDefine) try {
      return dP(O, P, Attributes);
    } catch (e) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var _objectDp = {
  	f: f
  };

  // 21.2.5.3 get RegExp.prototype.flags

  var _flags = function () {
    var that = _anObject(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  // 21.2.5.3 get RegExp.prototype.flags()
  if (_descriptors && /./g.flags != 'g') _objectDp.f(RegExp.prototype, 'flags', {
    configurable: true,
    get: _flags
  });

  var _propertyDesc = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var _hide = _descriptors ? function (object, key, value) {
    return _objectDp.f(object, key, _propertyDesc(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var hasOwnProperty = {}.hasOwnProperty;
  var _has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var id$1 = 0;
  var px = Math.random();
  var _uid = function (key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id$1 + px).toString(36));
  };

  var _core = createCommonjsModule(function (module) {
  var core = module.exports = { version: '2.6.2' };
  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
  });
  var _core_1 = _core.version;

  var _redefine = createCommonjsModule(function (module) {
  var SRC = _uid('src');
  var TO_STRING = 'toString';
  var $toString = Function[TO_STRING];
  var TPL = ('' + $toString).split(TO_STRING);

  _core.inspectSource = function (it) {
    return $toString.call(it);
  };

  (module.exports = function (O, key, val, safe) {
    var isFunction = typeof val == 'function';
    if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
    if (O[key] === val) return;
    if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
    if (O === _global) {
      O[key] = val;
    } else if (!safe) {
      delete O[key];
      _hide(O, key, val);
    } else if (O[key]) {
      O[key] = val;
    } else {
      _hide(O, key, val);
    }
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, TO_STRING, function toString() {
    return typeof this == 'function' && this[SRC] || $toString.call(this);
  });
  });

  var TO_STRING = 'toString';
  var $toString = /./[TO_STRING];

  var define = function (fn) {
    _redefine(RegExp.prototype, TO_STRING, fn, true);
  };

  // 21.2.5.14 RegExp.prototype.toString()
  if (_fails(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
    define(function toString() {
      var R = _anObject(this);
      return '/'.concat(R.source, '/',
        'flags' in R ? R.flags : !_descriptors && R instanceof RegExp ? _flags.call(R) : undefined);
    });
  // FF44- RegExp#toString has a wrong name
  } else if ($toString.name != TO_STRING) {
    define(function toString() {
      return $toString.call(this);
    });
  }

  /**
   * @namespace variables
   */

  /**
   * 判断变量是否是object
   * @memberOf variables
   * @function isObject
   * @param {*} obj
   */
  function isObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
  }
  /**
   * 判断object是否是空的
   * @memberOf variables
   * @function isEmptyObject
   * @param {object} obj
   */


  function isEmptyObject(obj) {
    for (var key in obj) {
      return false;
    }

    return true;
  }
  /**
   * 检验变量是否有正确的值
   * @memberOf variables
   * @function isCorrect
   * @param {*} variable - 被检验的变量
   * @param {boolean} [notBezero=false] - 是否不允许变量等于零
   */


  function isCorrect(variable, notBezero) {
    var result = true;

    if (typeof variable === "string" && (variable === "" || variable === "undefined" || variable === "null" || variable === "NaN" || variable === "Infinity")) {
      result = false;
    } else if (typeof variable === "number" && (isNaN(variable) || !isFinite(variable) || notBezero && variable === 0)) {
      result = false;
    } else if (variable === null) {
      result = false;
    } else if (typeof variable === "undefined") {
      result = false;
    } else if (isObject(variable)) {
      if (isEmptyObject(variable)) {
        result = false;
      }
    } else if (Array.isArray(variable)) {
      if (variable.length === 0) {
        result = false;
      }
    }

    return result;
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

  function fn1(x) {
    return x + 1;
  }

  function fn2(x) {
    return x + 2;
  }

  function fn3(x) {
    return x + 3;
  }

  function fn4(x) {
    return x + 4;
  }

  var newFn = compose(fn1, fn2, fn3, fn4);
  var m = Observable.of(3);
  var m1 = map(function (x) {
    return x * 2;
  })(m);
  console.log(m1);

}());
//# sourceMappingURL=example.js.map
