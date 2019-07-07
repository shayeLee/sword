/**
 * @namespace bomTool
 */

import { isCorrect } from '../src/index';

class BrowserDetect {

  dataBrowser = [
    {
      // UC浏览器
      string: navigator.userAgent,
      subString: 'UBrowser',
      identity: 'UBrowser',
      versionSearch: 'Chrome'
    },
    {
      // 欧朋浏览器
      string: navigator.userAgent,
      subString: 'OPR',
      identity: 'OPR',
      versionSearch: 'Chrome'
    },
    {
      // Maxthon 遨游浏览器
      string: navigator.userAgent,
      subString: 'Maxthon',
      identity: 'Maxthon',
      versionSearch: 'Chrome'
    },
    {
      // 搜狗浏览器
      string: navigator.userAgent,
      subString: 'MetaSr',
      identity: 'MetaSr',
      versionSearch: 'Chrome'
    },
    {
      // 猎豹浏览器
      string: navigator.userAgent,
      subString: 'LBBROWSER',
      identity: 'LBBROWSER',
      versionSearch: 'Chrome'
    },
    {
      // Edge
      string: navigator.userAgent,
      subString: 'Edge',
      identity: 'Edge',
      versionSearch: 'Chrome'
    },
    {
      // QQ浏览器
      string: navigator.userAgent,
      subString: 'QQBrowser',
      identity: 'QQBrowser',
      versionSearch: 'Chrome'
    },
    {
      // 百度浏览器
      string: navigator.userAgent,
      subString: 'BIDUBrowser',
      identity: 'BIDUBrowser',
      versionSearch: 'Chrome'
    },
    {
      string: navigator.userAgent,
      subString: 'Chrome',
      identity: 'Chrome',
    },
    {
      string: navigator.userAgent,
      subString: 'Apple',
      identity: 'Safari',
      versionSearch: 'Version'
    },
    {
      string: navigator.userAgent,
      subString: 'Firefox',
      identity: 'Firefox'
    },
    {
      // IE11之前的版本
      string: navigator.userAgent,
      subString: 'MSIE',
      identity: 'IE',
      versionSearch: 'MSIE'
    },
    {
      string: navigator.userAgent,
      subString: 'Gecko',
      identity: 'Mozilla',
      versionSearch: 'rv'
    }
  ];
  dataEngine = [
    {
      string: navigator.userAgent,
      subString: 'Trident/',
      identity: 'Trident'
    },
    {
      string: navigator.userAgent,
      subString: 'WebKit/',
      identity: 'WebKit'
    },
    {
      string: navigator.userAgent,
      subString: 'Gecko/',
      identity: 'Gecko'
    }
  ];
  dataOS = [
    {
      string: navigator.platform,
      subString: 'Win',
      identity: 'Windows'
    },
    {
      string: navigator.platform,
      subString: 'Mac',
      identity: 'OSX'
    },
    {
      string: navigator.platform,
      subString: 'iPhone',
      identity: 'iOS'
    },
    {
      string: navigator.platform,
      subString: 'Linux',
      identity: 'Linux'
    }
  ];

  searchOS() {
    for (let i = 0; i < this.dataOS.length; i++) {
      let dataString = this.dataOS[i].string;
      if (!isCorrect(dataString)) return;
      if (dataString.indexOf(this.dataOS[i].subString) > -1) {
        if (navigator.userAgent.indexOf('Android') > -1) {
          return 'Android'
        } else if (
          navigator.userAgent.indexOf('iPhone') > -1 ||
          navigator.userAgent.indexOf('iPad') > -1
        ) {
          return 'iOS'
        }
        return this.dataOS[i].identity;
      }
    }
  }

  searchBrowser() {
    for (let i = 0; i < this.dataBrowser.length; i++) {
      let dataString = this.dataBrowser[i].string;
      if (!isCorrect(dataString)) return;
      if (dataString.indexOf(this.dataBrowser[i].subString) > -1) {
        this.browserVersionSearchString = this.dataBrowser[i].versionSearch || this.dataBrowser[i].identity;
        return this.dataBrowser[i].identity;
      }
    }
  }

  searchBrowserVersion(dataString) {
    let index = dataString.indexOf(this.browserVersionSearchString);
    if (index === -1) return;
    const versionMatchArr = dataString.match(new RegExp(`${this.browserVersionSearchString}(\/*)[0-9\.]*(?=\s*)`));
    if (!isCorrect(versionMatchArr)) return;
    return versionMatchArr[0].replace(/[^\.\d]/g, '');
  }

  searchRenderingEngine() {
    for (let i = 0; i < this.dataEngine.length; i++) {
      let dataString = this.dataEngine[i].string;
      if (!isCorrect(dataString)) return;
      if (dataString.indexOf(this.dataEngine[i].subString) > -1) {
        this.renderingEngineVersionSearchString = this.dataEngine[i].identity;
        return this.dataEngine[i].identity;
      }
    }
  }

  searchRenderingEngineVersion(dataString) {
    let index = dataString.indexOf(this.renderingEngineVersionSearchString);
    if (index === -1) return;
    const versionMatchArr = dataString.match(new RegExp(`${this.renderingEngineVersionSearchString}(\/*)[0-9\.]*(?=\s*)`));
    if (!isCorrect(versionMatchArr)) return;
    return versionMatchArr[0].replace(/[^\.\d]/g, '');
  }

  OS = this.searchOS() || 'An unknown OS';

  browser = this.searchBrowser() || 'An unknown browser';

  browserVersion = this.searchBrowserVersion(navigator.userAgent) || this.searchBrowserVersion(navigator.appVersion) || 'an unknown browserVersion';

  renderingEngine = this.searchRenderingEngine() || 'An unknown renderingEngine';

  renderingEngineVersion = this.searchRenderingEngineVersion(navigator.userAgent) || this.searchRenderingEngineVersion(navigator.appVersion) || 'an unknown engineVersion';

}

const browserDetect = new BrowserDetect();

export default {
  OS: browserDetect.OS,
  browser: browserDetect.browser,
  browserVersion: browserDetect.browserVersion,
  renderingEngine: browserDetect.renderingEngine,
  renderingEngineVersion: browserDetect.renderingEngineVersion
};