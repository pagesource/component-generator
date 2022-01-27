/**
 * Service Generator
 */

/* eslint strict: ["off"] */

'use strict';

const componentExists = require('../utils/componentExists');
const config = require('../constants');

module.exports = {
  description: 'Add a service',
  prompts: [
    {
      type: 'input',
      name: 'isGraphql',
      message: 'Will it be a graphql call?',
      default: 'no'
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'ChangeTitle',
      validate: (value) => {
        value = `${value}Service`;
        if (/.+/.test(value)) {
            return componentExists(value, config.API_SRC, config.SERVICES)
            ? 'A service with this name already exists '
            : true;
        }

        return 'The name is required';
      }
    }
  ],
  actions: (data) => {
    // Generate serviceName.js 
    const folderPath =  `../../${config.SERVICES}/${config.API_SRC}`;
    const actions = [
      {
        type: 'add',
        path: `${folderPath}/{{properCase name}}Service.js`,
        templateFile: data.isGraphql == 'yes'? './services/js-templates/graphql.js.hbs' : './services/js-templates/index.js.hbs',
        abortOnFail: true
      }
     
    ];

    return actions;
  }
};
