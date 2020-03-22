
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
  publicPath: `//${manifest.host}:${manifest.port}${manifest.publicPath}`,
  // outputDir: path.join(__dirname, 'hello'),
  configureWebpack: {
    plugins: [
      // 全局变量挂到window上
      new webpack.DefinePlugin({
        [`${manifest.name}_MANIFEST`]: JSON.stringify(manifest)
      })
    ],
    output: {
      library: manifest.name,    // 输出模块名
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
    ]
  },
  devServer: {
    open: true,
    port: manifest.port,
    https: false,
    hotOnly: false,
    before: app => {
    }
  }
}