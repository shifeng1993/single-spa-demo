/*
 * @Description: 
 * @Author: shifeng
 * @Email: shifeng199307@gmail.com
 * @Date: 2020-03-24 22:18:05
 */
const manifest = require('./manifest');

module.exports = {
  plugins: {
    'postcss-selector-namespace': {
      namespace(css) {
        return `#${manifest.name}`  // 样式隔离
      }
    }
  }
}