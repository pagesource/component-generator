/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

// const fs = require('fs');
// const path = require('path');
// const config = require('../constants');

import fs from 'fs'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import config from '../constants.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const atomComponents = fs.readdirSync(
  path.join(__dirname, `../../${config.COMPONENT_PATH}atoms`)
);
const moleculeComponents = fs.readdirSync(
  path.join(__dirname, `../../${config.COMPONENT_PATH}molecules`)
);
const organismComponents = fs.readdirSync(
  path.join(__dirname, `../../${config.COMPONENT_PATH}organisms`)
);
const templateComponents = fs.readdirSync(
  path.join(__dirname, `../../${config.COMPONENT_PATH}templates`)
);
const components = atomComponents
  .concat(moleculeComponents)
  .concat(organismComponents)
  .concat(templateComponents);

const hooks = fs.readdirSync(path.join(__dirname, `../../${config.HOOKS_PATH}`));
const stores = fs.readdirSync(path.join(__dirname, `../../${config.STORES_PATH}`));
const pages = fs.readdirSync(path.join(__dirname, `../../../${config.PAGES_PATH}`));

const componentContainer = {
  components,
  hooks,
  stores,
  pages
};

function componentExists(comp, category) {
  return componentContainer[category].indexOf(comp) >= 0;
}

export default componentExists;
