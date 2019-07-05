(function () {
  'use strict';

  /**
   * @namespace arrTool
   */

  /**
   * @namespace dateTool
   */
  /**
   * 获取当前周的每天的日期（共七天）
   * @memberof dateTool
  */


  function getCurrWeekDates() {
    var timeOfToday = Date.now();
    var weekOfToday = (new Date().getDay() + 7 - 1) % 7;
    return Array.from(new Array(7)).map(function (_, i) {
      var date = new Date(timeOfToday + (i - weekOfToday) * 1000 * 60 * 60 * 24);
      return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
    });
  }

  /**
   * @namespace domTool
   */

  /**
   * @namespace fileTool
   */

  /**
   * @namespace variables
   */

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

  console.log(getCurrWeekDates());

}());
//# sourceMappingURL=example.js.map
