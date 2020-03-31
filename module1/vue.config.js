
/*
 * @Description: 
 * @Author: shifeng
 * @Email: shifeng199307@gmail.com
 * @Date: 2020-03-06 22:46:35
 */
const webpack = require('webpack');
const StatsPlugin = require('stats-webpack-plugin');
const path = require('path');
const manifest = require('./manifest');


module.exports = {
  // publicpath 服务器的话是路径，本地开发是固定的ip+端口
  publicPath: process.env.NODE_ENV === 'production' ? `/${manifest.name}/` : `//${manifest.host}:${manifest.port}`,
  outputDir: path.join(__dirname, '../dist/', manifest.name),
  assetsDir: 'static',
  pages: {
    app: {
      // page 的入口
      entry: './src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: manifest.name + '/index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page'
    },
  },
  configureWebpack: {
    entry: {
      app: './src/main.js',
      store: './src/store/index.js'
    },
    output: {
      filename: '[name].js', // 输出文件名
      chunkFilename: 'static/js/[name].js', // commonChunk 输出文件
      library: [manifest.name, '[name]'],    // 输出模块名
      libraryTarget: 'window' // 输出模块挂载到window对象上
    },
    plugins: [
      // 生成依赖文件，可以访问并且抓取对应静态资源
      new StatsPlugin('stats.json', {
        chunkModules: false, // 将构建模块信息添加到 chunk 信息
        entryPoints: true, // 通过对应的 bundle 显示入口起点
        source: false, // 添加模块的源码
        chunks: false, // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
        modules: false, // 添加构建模块信息
        children: false, // 添加 children 信息
        version: true,
        exclude: [/node_modules/] // 排除模块
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
  productionSourceMap: false,
  devServer: {
    open: false,
    port: manifest.port,
    https: false,
    hotOnly: false,
    before: app => {
    }
  }
}