/*
 * @Description: 
 * @Author: shifeng
 * @Email: shifeng199307@gmail.com
 * @Date: 2020-03-07 21:02:56
 */
module.exports = {
  plugins: {
    'postcss-selector-namespace': {
      namespace(css) {
        return '#vue'
      }
    }
  }
}