/**
 * monorepoHelpers
 */

import fs from 'fs'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import config from '../constants.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * isMonorepo - Checks if root directory has apps or packages folder, if yes, it is monorepo application
 * @returns {boolean}
 */
function isMonorepo() {
  const rooteDirectories = fs.readdirSync(path.join(__dirname, `../../..`));
  
  return rooteDirectories.indexOf('apps') >= 0 || rooteDirectories.indexOf('packages') >= 0;
}

/**
 * getMonorepoApps - gets all the directories in apps/packages folder and appends appropriate suffix
 * @returns {Array}
 */
function getMonorepoApps() {
  const apps = fs.readdirSync(path.join(__dirname, `../../../${config.APPS_PATH}`));
  const packages = fs.readdirSync(path.join(__dirname, `../../../${config.PACKAGES_PATH}`));
  
  const appsProjects = apps.map(app => `apps/${app}`)
  const packagesProjects = packages.map(app => `packages/${app}`)

  return appsProjects.concat(packagesProjects)
};

export default {
  when: () => isMonorepo(),
  type: 'list',
  name: 'monorepoPath',
  message: 'Select the Monorepo app for the component',
  choices: () => {
    return getMonorepoApps()
  },
}