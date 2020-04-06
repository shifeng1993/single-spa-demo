/*
 * @Description: vue项目配置文件
 * @Author: shifeng
 * @Email: shifeng199307@gmail.com
 * @Date: 2020-03-17 23:31:42
 */
const path = require('path');
const manifests = require('./project.build')();

const baseManifest = manifests.base;
const componentManifests = manifests.components;

// 配置代理
const proxyMap = {};

// dev下生成代理
if (process.env.NODE_ENV === 'development') {
  componentManifests.forEach((i) => {
    let pathRewrite = {};
    pathRewrite[`^${i.path}`] = '/'
    proxyMap[`${i.path}`] = {
      target: 'http://' + baseManifest.host + ':' + i.port,
      changeOrigin: true,
      pathRewrite
    }
  })
}

console.log(proxyMap)
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: path.join(__dirname, '../dist/'),
  assetsDir: 'baseModule/static',
  // chainWebpack: config => {
  //   config.externals(['vue', 'vue-router']);
  // },
  configureWebpack: {
    entry: {
      app: './src/main.js',
      store: './src/store/index.js'
    },
    output: {
      filename: 'baseModule/[name].[hash].js', // 输出文件名
      chunkFilename: 'baseModule/static/js/[name].[hash].js' // commonChunk 输出文件
    },
    plugins: [
    ]
  },
  productionSourceMap: false, // 生产环境的sourcemap
  devServer: {
    open: true,
    port: baseManifest.port,
    https: false,
    hotOnly: false,
    // 将任何未知请求 (没有匹配到静态文件的请求) 代理到该字段指向的地方 
    proxy: Object.keys(proxyMap).length === 0 ? null : proxyMap,
    before: app => {
    }
  }
}
