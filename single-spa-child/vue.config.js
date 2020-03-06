/*
 * @Description: 
 * @Author: shifeng
 * @Email: shifeng199307@gmail.com
 * @Date: 2020-03-06 22:46:35
 */
const StatsPlugin = require('stats-webpack-plugin');

module.exports = {
  publicPath: '//127.0.0.1:3000',
  configureWebpack: {
    output: {
      library: "vueChild",
      libraryTarget: 'window'
    },
    plugins: [
      new StatsPlugin('stats.json', {
        chunkModules: false,
        entryPoints: true,
        source: false,
        chunks: false,
        modules: false,
        children: false,
        exclude: [/node_modules/]
      })
    ]
  },

}