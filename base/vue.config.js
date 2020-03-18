/*
 * @Description: vue项目配置文件
 * @Author: shifeng
 * @Email: shifeng199307@gmail.com
 * @Date: 2020-03-17 23:31:42
 */
const webpack = require('webpack');
const manifests = require('./project.build')();

const baseManifest = manifests.find(item => item.base);

// 配置代理
const proxyMap = {};
manifests.forEach((i) => {
  if (!i.base) {
    let pathRewrite = {};
    pathRewrite[`^${i.path}`] = '/'
    proxyMap[`${i.path}`] = {
      target: 'http://' + baseManifest.host + ':' + i.port,
      changeOrigin: true,
      pathRewrite
    }
  }
})
console.log(proxyMap)
module.exports = {
  configureWebpack: {
    plugins: [
      // 全局变量挂到window上
      new webpack.DefinePlugin({
        'WORK_SPACE_MANIFEST': JSON.stringify(manifests)
      })
    ]
  },
  devServer: {
    open: true,
    host: baseManifest.host,
    port: baseManifest.port,
    https: false,
    hotOnly: false,
    // 将任何未知请求 (没有匹配到静态文件的请求) 代理到该字段指向的地方 
    proxy: Object.keys(proxyMap).length === 0 ? null : proxyMap,
    before: app => {
    }
  }
}
