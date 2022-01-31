/**
 * Store Generator
 */

/* eslint strict: ["off"] */

'use strict';

import componentExists from '../utils/componentExists.js'
import monorepoQues from '../utils/monorepoHelpers.js'
import config from '../constants.js'
import {isTypescript, getComputedFolderPath, getFileExtension, getRootDirectoryPath} from '../utils/common.js'

const fileExtension = getFileExtension()

export default {
  description: 'Add a React smart-context store',
  prompts: [
    monorepoQues,
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Cart',
      validate: (value, data) => {
        value = `use${value}`;
        if (/.+/.test(value)) {
          return componentExists(value, config.STORES_PATH, data.monorepoPath)
            ? 'A store with this name already exists '
            : true;
        }

        return 'The name is required';
      }
    }
  ],
  actions: (data) => {
    const rootPath = getRootDirectoryPath()
    const folderPath = `${rootPath}/${getComputedFolderPath(data.monorepoPath, config.STORES_PATH)}`;

    const actions = [
      {
        type: 'add',
        path: `${folderPath}/{{lowerCase name}}/contextProvider.${isTypescript() ? 'tsx' : 'js'}`,
        templateFile: `./stores/${fileExtension}-templates/contextProvider.${fileExtension}.hbs`,
        abortOnFail: true
      },
      {
        type: 'add',
        path: `${folderPath}/{{lowerCase name}}/index.${fileExtension}`,
        templateFile:  `./stores/${fileExtension}-templates/index.${fileExtension}.hbs`,
        abortOnFail: true
      }
    ];
    return actions;
  }
};
