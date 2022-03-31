/**
 * Page Generator
 */

/* eslint strict: ["off"] */

'use strict';

import componentExists from '../utils/componentExists.js'
import monorepoQues from '../utils/monorepoHelpers.js'
import config from '../constants.js'
import {getComputedFolderPath, getFileExtension,getRootDirectoryPath, isTypescript} from '../utils/common.js'

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
    const rootPath = getRootDirectoryPath()

    const pagePath =
      data.route.trim() !== ''
        ? `${rootPath}/${getComputedFolderPath(data.monorepoPath, config.PAGES_PATH)}/${data.route}`
        : `${rootPath}/${getComputedFolderPath(data.monorepoPath, config.PAGES_PATH)}`;
      
    const templatePath = `${rootPath}/${getComputedFolderPath(data.monorepoPath, config.TEMPLATES_PATH)}`
    
    const actions = [
      {
        type: 'add',
        path: `${pagePath}/{{lowerCase name}}/index.${fileExtension}`,
        templateFile: `./pages/${fileExtension}-templates/index.${fileExtension}.hbs`,
        abortOnFail: true
      },
      {
        type: 'add',
        path: `${templatePath}/{{properCase name}}/{{lowerCase name}}.${isTypescript() ? 'tsx' : 'js'}`,
        templateFile: `./react-component/${fileExtension}-templates/stateless.${fileExtension}.hbs`,
        abortOnFail: false
      },
      {
        type: 'add',
        path: `${templatePath}/{{properCase name}}/{{properCase name}}.style.${fileExtension}`,
        templateFile: `./react-component/${fileExtension}-templates/style.${fileExtension}.hbs`,
        abortOnFail: true
      },
      {
        type: 'modify',
        path: `${rootPath}/${getComputedFolderPath(data.monorepoPath, config.ROUTES_PATH)}/paths.${fileExtension}`,
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