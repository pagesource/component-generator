/**
 * monorepoHelpers
 */

import fs from 'fs'
import config from '../constants.js'
import {getRootDirectoryPath} from './common.js'

const rootPath = getRootDirectoryPath()

/**
 * isMonorepo - Checks if root directory has apps or packages folder, if yes, it is monorepo application
 * @returns {boolean}
 */
export function isMonorepo() {
  const rooteDirectories = fs.readdirSync(rootPath);
  
  return rooteDirectories.indexOf('apps') >= 0 || rooteDirectories.indexOf('packages') >= 0;
}

/**
 * getMonorepoApps - gets all the directories in apps/packages folder and appends appropriate suffix
 * @returns {Array}
 */
function getMonorepoApps() {
  const apps = fs.readdirSync(`${rootPath}/${config.APPS_PATH}`);
  const packages = fs.readdirSync(`${rootPath}/${config.PACKAGES_PATH}`);
  
  const appsProjects = apps.map(app => `apps/${app}`)
  const packagesProjects = packages.map(app => `packages/${app}`)

  return appsProjects.concat(packagesProjects)
};

export default {
  when: () => isMonorepo(),
  type: 'list',
  name: 'monorepoPath',
  message: 'Select the destination Monorepo app for plop',
  choices: () => {
    return getMonorepoApps()
  },
}