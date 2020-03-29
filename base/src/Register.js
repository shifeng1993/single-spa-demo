/*
 * @Description: 注册应用js
 * @Author: shifeng
 * @Email: shifeng199307@gmail.com
 * @Date: 2020-03-26 21:01:12
 */

// import SystemJS from './assets/system.min'; // eslint-disable-line
import axios from 'axios';
import * as singleSpa from 'single-spa';
import baseStore from './store/index';

// hash 模式,项目路由用的是hash模式会用到该函数
export function hashPrefix(path) {
  return (location) => location.hash.startsWith(`#${path}`)
}

// history 模式，项目路由用的是history模式会用到该函数
export function pathPrefix(path) {
  return (location) => location.pathname.startsWith(`${path}`)
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
export async function registerApp(manifest) {
  if (!manifest.singleSpa) throw Error(`Module ${manifest.name} manifest.js key "singleSpa" is not true!`);
  /*********************** 加载主文件和对外接口文件js ************************/
  const baseUrl = `${window.location.origin}${manifest.path}`;
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

  let storeModule = {};

  // 获取window已经挂载的store
  try {
    storeModule = manifest.store ? window[manifest.name][manifest.store] : {default: {}};
  } catch (e) {
    console.log(`Could not load store of app ${manifest.name}.`, e);
    //如果失败则不注册该模块
    return
  }

  // store挂载到baseStore消息总线上
  baseStore.registerModule(manifest.name, storeModule.default);

  /*********************** 消息总线部分导入 ************************/

  // singlespa自定义props
  let customProps = {store: baseStore};

  // singlespa 开始注册
  singleSpa.registerApplication(
    manifest.name,  // 项目名称
    async () => window[manifest.name][manifest.main], // runScript 后挂载在window上的模块
    hashPrefix(manifest.path),  // 哈希路由匹配
    customProps //自定义props
  );
}
