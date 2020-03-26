/*
 * @Description: 注册应用js
 * @Author: shifeng
 * @Email: shifeng199307@gmail.com
 * @Date: 2020-03-26 21:01:12
 */

// import SystemJS from './assets/system.min'; // eslint-disable-line
import axios from 'axios';
import * as singleSpa from 'single-spa';

//全局的事件派发器 (新增)
import {GlobalEventDistributor} from './GlobalEventDistributor'
const globalEventDistributor = new GlobalEventDistributor();

// hash 模式,项目路由用的是hash模式会用到该函数
export function hashPrefix(path) {
  return (location) => location.hash.startsWith(`#${path}`)
}

// history 模式
export function pathPrefix(path) {
  return (location) => location.pathname.startsWith(`#${path}`)
}

// 运行script
const runScript = async (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;

    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);
  })
}

// 应用注册
export async function registerApp(manifest, base) {
  /*********************** 加载主文件和对外接口文件js ************************/
  const baseUrl = `http://${base.host}:${base.port}${manifest.path}`;
  const statsUrl = `${baseUrl}/stats.json`;
  const {data} = await axios.get(statsUrl);

  const {entrypoints, assetsByChunkName} = data;

  const mainAssets = entrypoints[manifest.main].assets;
  const store = assetsByChunkName[manifest.store];

  for (let i = 0; i < mainAssets.length; i++) {
    await runScript(`${baseUrl}/${mainAssets[i]}`)
  }
  await runScript(`${baseUrl}/${store}`)
  /*********************** 加载主文件和对外接口文件js ************************/

  /*********************** 消息总线部分导入 ************************/
  // 导入派发器
  let storeModule = {}, customProps = {globalEventDistributor: globalEventDistributor};

  // 在这里,直接获取window已经挂载的store,统一挂载到消息总线上
  try {
    storeModule = manifest.store ? window[manifest.name][manifest.store] : {storeInstance: null};
  } catch (e) {
    console.log(`Could not load store of app ${manifest.name}.`, e);
    //如果失败则不注册该模块
    return
  }

  // 注册应用于事件派发器
  if (storeModule.storeInstance && globalEventDistributor) {
    //取出 storeInstance
    customProps.store = storeModule.storeInstance;

    // 注册到全局
    globalEventDistributor.registerStore(storeModule.storeInstance);
  }

  //当与派发器一起组装成一个对象之后,在这里以这种形式传入每一个单独模块
  customProps = {store: storeModule, globalEventDistributor: globalEventDistributor};

  /*********************** 消息总线部分导入 ************************/

  // singlespa 开始注册
  singleSpa.registerApplication(
    manifest.name,          // 项目名称
    async () => window[manifest.name][manifest.main],   // runScript 后挂载在window上的模块
    hashPrefix(manifest.path), // 哈希路由匹配
    customProps
  );
}
