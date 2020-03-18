/*
 * @Description: 项目配置文件
 * @Author: shifeng
 * @Email: shifeng199307@gmail.com
 * @Date: 2020-03-17 23:28:28
 */

const host = 'localhost';
const port = '3000';

module.exports = {
  "name": "module1", //模块名称
  path: "/module1", //模块url前缀
  "prefix": "manifest", //模块文件路径前缀
  host,
  port,
  publicPath: `//${host}:${port}`
  // "main": "/module-prefix/main.js", //模块渲染出口文件
  // "store": "/module-prefix/store.js"//模块对外接口
}