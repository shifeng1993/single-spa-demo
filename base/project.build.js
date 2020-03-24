/*
 * @Description: 项目配置文件构建程序
 * @Author: shifeng
 * @Email: shifeng199307@gmail.com
 * @Date: 2020-03-17 23:35:00
 */

const fs = require('fs');
const path = require('path');

// 配置部分
const projectName = '../';                            // 项目工作空间相对于此文件的路径
const projectPath = path.join(__dirname, projectName) // 项目工作空间的路径
const manifestName = 'manifest.js';                   // 项目的配置文件名称

/**
 * @description: 抓取项目中的manifest 配置文件
 * @param {type} 
 * @return: 
 */
function findManiFest() {
  try {
    let baseManifest = {}
    let componentManifests = [];
    let projectFiles = fs.readdirSync(projectPath)
    projectFiles.forEach(dirpath => {
      let projectDir = path.join(projectPath, dirpath)
      let stats = fs.statSync(projectDir);
      if (stats.isDirectory() && /^(?!\.)/.test(dirpath)) {
        let files = fs.readdirSync(projectDir)
        if (files.includes(manifestName)) {
          let {base, ...manifest} = require(`${projectName}${dirpath}/${manifestName}`);
          if (base) {
            baseManifest = {...manifest}
          } else {
            componentManifests.push(manifest);
          }
        }
      }
    })
    return {
      base: baseManifest,
      components: componentManifests
    };
  } catch (e) {
    throw e;
  }
}
/**
 * @description: 构建主程序
 * @param {type} 
 * @return: 
 */
function buildMain() {
  try {
    let manifests = findManiFest();
    return manifests;
  } catch (e) {
    throw e;
  }
}
module.exports = buildMain;