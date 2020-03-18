/*
 * @Description: base文件的引导程序
 * @Author: shifeng
 * @Email: shifeng199307@gmail.com
 * @Date: 2020-03-18 19:31:13
 */
import * as singleSpa from 'single-spa';
import axios from 'axios';

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

// eslint-disable-next-line
const getManifest = (url, manifest) => new Promise(async (resolve) => {
  const {data} = await axios.get(url);
  console.log(data)
  const {entrypoints, publicPath} = data;

  const assets = entrypoints['app'].assets; // app是bundle的名称
  for (let i = 0; i < assets.length; i++) {
    await runScript(publicPath + assets[i]).then(() => {
      if (i === assets.length - 1) {
        resolve()
      }
    })
  }
})

const workSpaceManifest = WORK_SPACE_MANIFEST.filter(item => !item.base); // eslint-disable-line
const baseManifest = WORK_SPACE_MANIFEST.find(item => item.base); // eslint-disable-line

// 遍历,注册所有模块
workSpaceManifest.forEach(manifest => {
  singleSpa.registerApplication(manifest.name, async () => {
    let vueChild = null;
    await getManifest(`http://${baseManifest.host}:${baseManifest.port}${manifest.path}/stats.json`, manifest).then(() => {
      vueChild = window[manifest.name];
    });
    return vueChild
  }, location => location.hash.startsWith(`#${manifest.path}`)) // hash路由
});

// 项目启动
singleSpa.start();