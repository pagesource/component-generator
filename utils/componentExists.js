/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

import fs from 'fs'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @param {string} comp - resource name provided
 * @param {string} category - category of the resource
 * @param {string} appPath - monorepo app/package path
 * @returns {boolean}
 */
function componentExists(comp, category, appPath) {
  const componentCotainer = appPath ? fs.readdirSync(
    path.join(__dirname, `../../../${appPath}/${category}`)) : fs.readdirSync(
      path.join(__dirname, `../../../${category}`));
  
  return componentCotainer.indexOf(comp) >= 0;
}

export default componentExists;
