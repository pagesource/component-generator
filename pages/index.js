/**
 * Page Generator
 */

/* eslint strict: ["off"] */

'use strict';

import componentExists from '../utils/componentExists.js'
import monorepoQues from '../utils/monorepoHelpers.js'
import config from '../constants.js'
import {getComputedFolderPath, getFileExtension} from '../utils/common.js'

const fileExtension = getFileExtension()

export default {
  description: 'Add a Next.js page/route',
  prompts: [
    monorepoQues,
    {
      type: 'input',
      name: 'name',
      message: 'What should be the name of the page?',
      default: 'cart',
      validate: (value,data) => {
        if (/.+/.test(value)) {
          return componentExists(value, config.PAGES_PATH, data.monorepoPath)
            ? 'A Page with this name already exists '
            : true;
        }

        return 'The page route is required';
      }
    },
    {
      type: 'input',
      name: 'route',
      message: 'Optional: Where to create this page, src/pages (default) or custom dir under pages?'
    }
  ],
  actions: (data) => {
    // Generate pagename/index.js and pagename/test.js
    const pagePath =
      data.route.trim() !== ''
        ? `../../${getComputedFolderPath(data.monorepoPath, config.PAGES_PATH)}/${data.route}`
        : `../../${getComputedFolderPath(data.monorepoPath, config.PAGES_PATH)}`;
    
    const actions = [
      {
        type: 'add',
        path: `${pagePath}/{{lowerCase name}}/index.${fileExtension}`,
        templateFile: `./pages/${fileExtension}-templates/index.${fileExtension}.hbs`,
        abortOnFail: true
      },
      {
        type: 'modify',
        path: `../../${getComputedFolderPath(data.monorepoPath, config.ROUTES_PATH)}/paths.${fileExtension}`,
        transform: (fileContents, data) => {
          let routeVarName =
            data.route.trim() !== ''
              ? data.route.trim().replace(/\//g, '_').toUpperCase()
              : '';
          routeVarName += `_${data.name.trim().toUpperCase()}`;

          let routeVal = data.route.trim() !== '' ? `/${data.route.trim()}` : '';
          routeVal += `/${data.name.trim().toLowerCase()}`;

          return fileContents + '\n' + `export const ${routeVarName} = '${routeVal}';` + '\n';
        },
        abortOnFail: true
      }
    ];

    return actions;
  }
};
