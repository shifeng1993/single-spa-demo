/*
 * @Description: 
 * @Author: shifeng
 * @Email: shifeng199307@gmail.com
 * @Date: 2020-03-06 22:46:35
 */
const workSpaceCfg = require('../project.config');

const {main, child} = workSpaceCfg;

const url = 'http://127.0.0.1';
const proxyMap = {};

// 根据项目配置展开代理
child.forEach(i => {
  let pathRewrite = {};
  pathRewrite[`^/${i.name}`] = '/'
  proxyMap[`/${i.name}`] = {
    target: url + ':' + i.port,
    changeOrigin: true,
    pathRewrite
  }
})

module.exports = {
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      args[0]['process.env'].WORK_SPACE_CONFIG = JSON.stringify(workSpaceCfg);
      return args
    })
  },
  devServer: {
    open: true,
    port: main.port,
    https: false,
    hotOnly: false,
    // 将任何未知请求 (没有匹配到静态文件的请求) 代理到该字段指向的地方 
    proxy: {...proxyMap},
    before: app => {
    }
  }
}