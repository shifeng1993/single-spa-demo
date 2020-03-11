/*
 * @Description: 
 * @Author: shifeng
 * @Email: shifeng199307@gmail.com
 * @Date: 2020-03-06 22:51:28
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
    // console.log(firstScript.parentNode)
    firstScript.parentNode.insertBefore(script, firstScript);
  })
}

// eslint-disable-next-line
const getManifest = (url, bundle) => new Promise(async (resolve) => {
  const {data} = await axios.get(url);
  console.log(data)
  const {entrypoints, publicPath} = data;
  const assets = entrypoints[bundle].assets;
  for (let i = 0; i < assets.length; i++) {
    await runScript(publicPath + assets[i]).then(() => {
      if (i === assets.length - 1) {
        resolve()
      }
    })
  }
})


let childProject = process.env.WORK_SPACE_CONFIG.child;

let project = childProject[0]
singleSpa.registerApplication(project.name, async () => {
  let vueChild = null;
  console.log(`http://127.0.0.1:8080/${project.name}/stats.json`)
  await getManifest(`http://127.0.0.1:8080/${project.name}/stats.json`, 'app').then(() => {
    vueChild = window[project.name];
  });
  return vueChild
}, location => location.pathname.startsWith('/vue'))


singleSpa.start();