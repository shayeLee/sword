/**
 * @namespace arrTool
 */

/**
 * 枚举flags数组所有元素之和反向求解
 * @memberof arrTool
 * @function enumFlagsThrustReverser
 * @param {number} sum - 枚举flags数组所有元素之和
 * @returns {array} enumFlags - 枚举flags数组
 */
function enumFlagsThrustReverser(sum) {
  if (sum === 1) return [1];
  var code = 1;
  var subjectCodeArr = [];

  while (code <= sum) {
    if ((code & sum) === code) {
      subjectCodeArr.push(code);
    }

    code *= 2;
  }

  return subjectCodeArr;
}

export { enumFlagsThrustReverser };
