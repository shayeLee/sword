(function () {
  'use strict';

  /**
   * @namespace arrTool
   */

  /**
   * @namespace dateTool
   */

  // import { isCorrect } from "./variables";

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

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

  var createClass = _createClass;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = _defineProperty;

  var BrowserDetect =
  /*#__PURE__*/
  function () {
    function BrowserDetect() {
      classCallCheck(this, BrowserDetect);

      defineProperty(this, "dataBrowser", [{
        // UC浏览器
        string: navigator.userAgent,
        subString: 'UBrowser',
        identity: 'UBrowser',
        versionSearch: 'Chrome'
      }, {
        // 欧朋浏览器
        string: navigator.userAgent,
        subString: 'OPR',
        identity: 'OPR',
        versionSearch: 'Chrome'
      }, {
        // Maxthon 遨游浏览器
        string: navigator.userAgent,
        subString: 'Maxthon',
        identity: 'Maxthon',
        versionSearch: 'Chrome'
      }, {
        // 搜狗浏览器
        string: navigator.userAgent,
        subString: 'MetaSr',
        identity: 'MetaSr',
        versionSearch: 'Chrome'
      }, {
        // 猎豹浏览器
        string: navigator.userAgent,
        subString: 'LBBROWSER',
        identity: 'LBBROWSER',
        versionSearch: 'Chrome'
      }, {
        // Edge
        string: navigator.userAgent,
        subString: 'Edge',
        identity: 'Edge',
        versionSearch: 'Chrome'
      }, {
        // QQ浏览器
        string: navigator.userAgent,
        subString: 'QQBrowser',
        identity: 'QQBrowser',
        versionSearch: 'Chrome'
      }, {
        // 百度浏览器
        string: navigator.userAgent,
        subString: 'BIDUBrowser',
        identity: 'BIDUBrowser',
        versionSearch: 'Chrome'
      }, {
        string: navigator.userAgent,
        subString: 'Chrome',
        identity: 'Chrome'
      }, {
        string: navigator.userAgent,
        subString: 'Apple',
        identity: 'Safari',
        versionSearch: 'Version'
      }, {
        string: navigator.userAgent,
        subString: 'Firefox',
        identity: 'Firefox'
      }, {
        // IE11之前的版本
        string: navigator.userAgent,
        subString: 'MSIE',
        identity: 'IE',
        versionSearch: 'MSIE'
      }, {
        string: navigator.userAgent,
        subString: 'Gecko',
        identity: 'Mozilla',
        versionSearch: 'rv'
      }]);

      defineProperty(this, "dataEngine", [{
        string: navigator.userAgent,
        subString: 'Trident/',
        identity: 'Trident'
      }, {
        string: navigator.userAgent,
        subString: 'WebKit/',
        identity: 'WebKit'
      }, {
        string: navigator.userAgent,
        subString: 'Gecko/',
        identity: 'Gecko'
      }]);

      defineProperty(this, "dataOS", [{
        string: navigator.platform,
        subString: 'Win',
        identity: 'Windows'
      }, {
        string: navigator.platform,
        subString: 'Mac',
        identity: 'OSX'
      }, {
        string: navigator.platform,
        subString: 'iPhone',
        identity: 'iOS'
      }, {
        string: navigator.platform,
        subString: 'Linux',
        identity: 'Linux'
      }]);

      defineProperty(this, "OS", this.searchOS() || 'An unknown OS');

      defineProperty(this, "browser", this.searchBrowser() || 'An unknown browser');

      defineProperty(this, "browserVersion", this.searchBrowserVersion(navigator.userAgent) || this.searchBrowserVersion(navigator.appVersion) || 'an unknown browserVersion');

      defineProperty(this, "renderingEngine", this.searchRenderingEngine() || 'An unknown renderingEngine');

      defineProperty(this, "renderingEngineVersion", this.searchRenderingEngineVersion(navigator.userAgent) || this.searchRenderingEngineVersion(navigator.appVersion) || 'an unknown engineVersion');
    }

    createClass(BrowserDetect, [{
      key: "searchOS",
      value: function searchOS() {
        for (var i = 0; i < this.dataOS.length; i++) {
          var dataString = this.dataOS[i].string;
          if (!isCorrect(dataString)) return;

          if (dataString.indexOf(this.dataOS[i].subString) > -1) {
            if (navigator.userAgent.indexOf('Android') > -1) {
              return 'Android';
            } else if (navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1) {
              return 'iOS';
            }

            return this.dataOS[i].identity;
          }
        }
      }
    }, {
      key: "searchBrowser",
      value: function searchBrowser() {
        for (var i = 0; i < this.dataBrowser.length; i++) {
          var dataString = this.dataBrowser[i].string;
          if (!isCorrect(dataString)) return;

          if (dataString.indexOf(this.dataBrowser[i].subString) > -1) {
            this.browserVersionSearchString = this.dataBrowser[i].versionSearch || this.dataBrowser[i].identity;
            return this.dataBrowser[i].identity;
          }
        }
      }
    }, {
      key: "searchBrowserVersion",
      value: function searchBrowserVersion(dataString) {
        var index = dataString.indexOf(this.browserVersionSearchString);
        if (index === -1) return;
        var versionMatchArr = dataString.match(new RegExp("".concat(this.browserVersionSearchString, "(/*)[0-9.]*(?=s*)")));
        if (!isCorrect(versionMatchArr)) return;
        return versionMatchArr[0].replace(/[^\.\d]/g, '');
      }
    }, {
      key: "searchRenderingEngine",
      value: function searchRenderingEngine() {
        for (var i = 0; i < this.dataEngine.length; i++) {
          var dataString = this.dataEngine[i].string;
          if (!isCorrect(dataString)) return;

          if (dataString.indexOf(this.dataEngine[i].subString) > -1) {
            this.renderingEngineVersionSearchString = this.dataEngine[i].identity;
            return this.dataEngine[i].identity;
          }
        }
      }
    }, {
      key: "searchRenderingEngineVersion",
      value: function searchRenderingEngineVersion(dataString) {
        var index = dataString.indexOf(this.renderingEngineVersionSearchString);
        if (index === -1) return;
        var versionMatchArr = dataString.match(new RegExp("".concat(this.renderingEngineVersionSearchString, "(/*)[0-9.]*(?=s*)")));
        if (!isCorrect(versionMatchArr)) return;
        return versionMatchArr[0].replace(/[^\.\d]/g, '');
      }
    }]);

    return BrowserDetect;
  }();

  var browserDetect = new BrowserDetect();
  var browserNavigator = {
    OS: browserDetect.OS,
    browser: browserDetect.browser,
    browserVersion: browserDetect.browserVersion,
    renderingEngine: browserDetect.renderingEngine,
    renderingEngineVersion: browserDetect.renderingEngineVersion
  };

  /**
   * @namespace fileTool
   */

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

  console.log(navigator);
  console.log(browserNavigator);

}());
//# sourceMappingURL=example.js.map
