/**
 * @namespace fileTool
 */
const fileTool = {
  /**
   * 获取图片的base64字符串
   * @memberof fileTool
   * @param {image} img
   * @returns {promise}
  */
  getImgBase64: function (img) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        resolve(reader.result);
      });
      reader.readAsDataURL(img);
    });
  }
};
export default fileTool;