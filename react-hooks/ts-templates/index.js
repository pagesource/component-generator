/**
 * Typescript Hooks Generator
 */

/* eslint strict: ["off"] */

'use strict';

import componentExists from '../../utils/componentExists.js'
import config from '../../constants.js'

export default {
  description: 'Add a react custom hook',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'ChangeTitle',
      validate: (value) => {
        value = `use${value}`;
        if (/.+/.test(value)) {
          return componentExists(value, 'hooks')
            ? 'A hook with this name already exists '
            : true;
        }

        return 'The name is required';
      }
    }
  ],
  actions: (data) => {
    // Generate useHookName/index.js and useHookName/test.js
    const folderPath = `../../${config.HOOKS_PATH}`;
    const actions = [
      {
        type: 'add',
        path: `${folderPath}/use{{properCase name}}/index.ts`,
        templateFile: './react-hooks/ts-templates/index.ts.hbs',
        abortOnFail: true
      },
      {
        type: 'add',
        path: `${folderPath}/use{{properCase name}}/test.ts`,
        templateFile: './react-hooks/ts-templates/test.ts.hbs',
        abortOnFail: true
      }
    ];

    return actions;
  }
};
