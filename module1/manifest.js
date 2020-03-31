/*
 * @Description: 项目配置文件
 * @Author: shifeng
 * @Email: shifeng199307@gmail.com
 * @Date: 2020-03-17 23:28:28
 */

const host = 'localhost';
const port = '3000';

module.exports = {
  singleSpa: true,
  name: "module1", //模块名称
  path: "/module1", //模块url前缀
  host,
  port,
  publicPath: '',
  main: 'app', // bundle入口名称
  store: 'store' // bundle入口名称
}
