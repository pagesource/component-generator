/**
 * Javascript Store Generator
 */

/* eslint strict: ["off"] */

'use strict';

import componentExists from '../../utils/componentExists.js'
import config from '../../constants.js'

export default {
  description: 'Add a smart-context store',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Cart',
      validate: (value) => {
        value = `use${value}`;
        if (/.+/.test(value)) {
          return componentExists(value, 'stores')
            ? 'A store with this name already exists '
            : true;
        }

        return 'The name is required';
      }
    }
  ],
  actions: (data) => {
    const folderPath = `../../${config.STORES_PATH}`;
    const actions = [
      {
        type: 'add',
        path: `${folderPath}/{{lowerCase name}}/contextProvider.js`,
        templateFile: './stores/js-templates/contextProvider.js.hbs',
        abortOnFail: true
      },
      {
        type: 'add',
        path: `${folderPath}/{{lowerCase name}}/index.js`,
        templateFile: './stores/js-templates/index.js.hbs',
        abortOnFail: true
      }
    ];
    return actions;
  }
};
