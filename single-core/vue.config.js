/*
 * @Description: 
 * @Author: shifeng
 * @Email: shifeng199307@gmail.com
 * @Date: 2020-03-06 22:46:35
 */
module.exports = {
  devServer: {
    open: true,
    port: 8080,
    https: false,
    hotOnly: false,
    // 将任何未知请求 (没有匹配到静态文件的请求) 代理到该字段指向的地方 
    proxy: {
      '/vueChild': {
        target: 'http://127.0.0.1:3000',
        // ws: true,
        changeOrigin: true,
        pathRewrite: {'^/vueChild' : '/'}
      }
    },
    // proxy: null,
    before: app => {
    }
  }
}