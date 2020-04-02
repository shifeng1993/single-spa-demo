/*
 * @Description: base文件的引导程序
 * @Author: shifeng
 * @Email: shifeng199307@gmail.com
 * @Date: 2020-03-18 19:31:13
 */
import * as singleSpa from 'single-spa';
import {registerApp} from './Register'

async function bootstrap(manifests) {
  const componentsManifests = manifests.components;

  // 遍历,注册所有模块
  componentsManifests.forEach(manifest => {
    registerApp(manifest);
  });

  // 项目启动
  singleSpa.start();
}

export default bootstrap;