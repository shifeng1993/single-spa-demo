/*
 * @Description: vue项目配置文件
 * @Author: shifeng
 * @Email: shifeng199307@gmail.com
 * @Date: 2020-03-17 23:31:42
 */
const webpack = require('webpack');
const manifests = require('./project.build')();
const path = require('path');

const baseManifest = manifests.base;
const componentManifests = manifests.components;

// 配置代理
const proxyMap = {};
componentManifests.forEach((i) => {
  let pathRewrite = {};
  pathRewrite[`^${i.path}`] = '/'
  proxyMap[`${i.path}`] = {
    target: 'http://' + baseManifest.host + ':' + i.port,
    changeOrigin: true,
    pathRewrite
  }
})

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: path.join(__dirname, '../dist/'),
  assetsDir: 'baseModule/static',
  configureWebpack: {
    entry: {
      app: './src/main.js',
      store: './src/store/index.js'
    },
    output: {
      filename: 'baseModule/[name].js', // 输出文件名
      chunkFilename: 'baseModule/static/js/[name].js' // commonChunk 输出文件
    },
    plugins: [
      // 全局变量挂到window上
      new webpack.DefinePlugin({
        'WORK_SPACE_MANIFEST': JSON.stringify(manifests)
      })
    ],
    optimization: {
      splitChunks: {
        chunks: 'async',  // 默认只分割异步代码块 import() 'async' 'initial' 'all'
        // minSize: 30000,   // 生成块的最小 单位字节
        // maxSize: 0,       // 生成块的最大 单位字节
        // minChunks: 1,     // 分割前必须共享模块的最小块数。
        // maxAsyncRequests: 5,  // 异步代码块最大并发请求数量
        // maxInitialRequests: 3,  // 入口处的最大并发请求数量
        // automaticNameDelimiter: '~', // 生成名称时所用的分隔符
        // name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10  // 优先级
          },
          // default是打包出来的名称，可以修改，例如改成common
          default: {
            minChunks: 2,
            minSize: 0, // 上面的minsize是默认的配置，这个minsize是自己配置的，所以优先级高
            priority: -20, // 优先级
            reuseExistingChunk: true
          },
          // 第三方库分离示例 匹配react 和 react-dom，完成打包的分离
          store: {
            test: /[\\/]src[\\/]store/,
            priority: -10  // 优先级
          },
        }
      }
    }
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
