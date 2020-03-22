/*
 * @Description: 项目配置文件
 * @Author: shifeng
 * @Email: shifeng199307@gmail.com
 * @Date: 2020-03-17 23:28:28
 */

const host = 'localhost';
const port = '3001';

module.exports = {
  name: "module2", //模块名称
  path: "/module2", //模块url前缀
  host,
  port,
  bundleEntryName: 'app', // bundle入口名称
  publicPath: ''
  // "main": "/module-prefix/main.js", //模块渲染出口文件
  // "store": "/module-prefix/store.js"//模块对外接口
}


// path

// host

// port

// name

// bundleEntryName // bundle文件名称 默认app

// publicPath  //localhost:3000