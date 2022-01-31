/**
 * Hooks Generator
 */

/* eslint strict: ["off"] */

'use strict';

import componentExists from '../utils/componentExists.js'
import monorepoQues from '../utils/monorepoHelpers.js'
import config from '../constants.js'
import {getFileExtension, getComputedFolderPath, getRootDirectoryPath} from '../utils/common.js'

const fileExtension = getFileExtension()

export default {
  description: 'Add a React custom hook',
  prompts: [
    monorepoQues,
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'ChangeTitle',
      validate: (value, data) => {
        value = `use${value}`;
        if (/.+/.test(value)) {
          return componentExists(value, config.HOOKS_PATH, data.monorepoPath)
            ? 'A hook with this name already exists '
            : true;
        }

        return 'The name is required';
      }
    }
  ],
  actions: (data) => {
    // Generate useHookName/index.js and useHookName/test.js
    const rootPath = getRootDirectoryPath()
    const folderPath = `${rootPath}/${getComputedFolderPath(data.monorepoPath, config.HOOKS_PATH)}`;
  
    const actions = [
      {
        type: 'add',
        path: `${folderPath}/use{{properCase name}}/index.${fileExtension}`,
        templateFile: `./react-hooks/${fileExtension}-templates/index.${fileExtension}.hbs`,
        abortOnFail: true
      },
      {
        type: 'add',
        path: `${folderPath}/use{{properCase name}}/test.${fileExtension}`,
        templateFile: `./react-hooks/${fileExtension}-templates/test.${fileExtension}.hbs`,
        abortOnFail: true
      }
    ];

    return actions;
  }
};
