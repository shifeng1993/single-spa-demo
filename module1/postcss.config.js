/*
 * @Description: 
 * @Author: shifeng
 * @Email: shifeng199307@gmail.com
 * @Date: 2020-03-24 22:18:05
 */
const manifest = require('./manifest');


const plugins = manifest.singleSpa ? {
  'postcss-selector-namespace': {
    namespace(css) {
      return `#${manifest.name}`  // 样式隔离
    }
  }
} : {}

module.exports = {
  plugins: plugins
}