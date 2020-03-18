/*
 * @Description: 项目配置文件
 * @Author: shifeng
 * @Email: shifeng199307@gmail.com
 * @Date: 2020-03-17 23:28:28
 */

module.exports = {
  host: 'localhost',
  port: 8080,
  "name": "base", //模块名称
  "path": "/project", //模块url前缀
  "prefix": "/module-prefix/", //模块文件路径前缀
  "main": "/module-prefix/main.js", //模块渲染出口文件
  "store": "/module-prefix/store.js",//模块对外接口
  "base": true// 基础模块
}