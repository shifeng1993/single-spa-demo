/*
 * @Description: base文件的引导程序
 * @Author: shifeng
 * @Email: shifeng199307@gmail.com
 * @Date: 2020-03-18 19:31:13
 */

import * as singleSpa from 'single-spa';
import {registerApp} from './Register'

//全局的事件派发器 (新增)
import {GlobalEventDistributor} from './GlobalEventDistributor'

// 从window对象上面获取工作空间的manifest
const baseManifest = WORK_SPACE_MANIFEST.base; // eslint-disable-line
const componentsManifests = WORK_SPACE_MANIFEST.components;// eslint-disable-line

async function bootstrap() {
  // 遍历,注册所有模块
  componentsManifests.forEach(manifest => {
    registerApp(manifest, baseManifest);
  });

  // 注册完成后注入自己的store
  const globalEventDistributor = new GlobalEventDistributor();

  // 项目启动
  singleSpa.start();
}

bootstrap()