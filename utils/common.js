/**
 * common 
 */
 import { dirname } from 'path';
 import { fileURLToPath } from 'url';
 
  
/**
 * isTypescript - Based on script args, it returns if it is Typescript or javascript generate action
 * @returns {boolean}
 */
export function isTypescript() {
    const scriptArgs = process.argv
    return scriptArgs.indexOf('--js') < 0
}

/**
 * getFileExtension - returs appropriate file extension
 * @returns {'js' | 'ts'}
 */
export function getFileExtension() {
    return isTypescript() ? 'ts' : 'js'
}

/**
 * getComputedFolderPath - This will compute folder path relative to monorepo(if any)
 * @param {string} monoropePath - path of monorepo app/package selected
 * @param {string} resourcePath - path of the resource beinng created
 * @returns {string} final computed path
 */

export function getComputedFolderPath(monoropePath, resourcePath) {
    return monoropePath ? `${monoropePath}/${resourcePath}` : resourcePath
}

/**
 * getRootDirectoryPath - This will return root folder path, parallel to node_modules
 */
export function getRootDirectoryPath() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    return __dirname.substring(0, (__dirname.indexOf('node_modules')-1))
}