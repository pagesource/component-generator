/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

 import fs from 'fs'
 import path from 'path'
 import {getRootDirectoryPath} from './common.js'
 
 const rootPath = getRootDirectoryPath()
 
 /**
  * @param {string} comp - resource name provided
  * @param {string} category - category of the resource
  * @param {string} appPath - monorepo app/package path
  * @returns {boolean}
  */
 function componentExists(comp, category, appPath) {
   //const compDirPath = appPath ? `${rootPath}/${appPath}/${category}` : `${rootPath}/${category}`
   // TG: Fixed Issue 37: Does not work on Windows
   const compDirPath = appPath ? path.join(rootPath, appPath, category) : path.join(rootPath, category);
  
   //Check if the directory exists, if not create it and return false
   if (!fs.existsSync(compDirPath)) {
      /**  
       * TG: Fixed Issue 37: mkdirSync fails if "/src/components" does not exist, 
       * as it cannot create directories recursively.
       * Better to omit it. Works for custom paths too.
       */
      // fs.mkdirSync(compDirPath); 
      return false
   }
  
   const componentCotainer = fs.readdirSync(compDirPath);

   return componentCotainer.indexOf(comp) >= 0;
 }
 
 export default componentExists;
 
