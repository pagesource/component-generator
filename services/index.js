/**
 * Service Generator
 */

/* eslint strict: ["off"] */

'use strict';

import componentExists from '../utils/componentExists.js'
import monorepoQues from '../utils/monorepoHelpers.js'
import config from '../constants.js'
import {getComputedFolderPath, getFileExtension} from '../utils/common.js'

const fileExtension = getFileExtension()

export default {
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
     
    }
  ],
  actions: (data) => {
    const typeDefExists = componentExists('common', config.TYPE_DEF_SRC, config.SERVICES)
    // Generate serviceName.js 
    const folderPath =  `../../${getComputedFolderPath(config.SERVICES, config.API_SRC)}`
     validate: (value) => {
        value = `${value}Service`;
        if (/.+/.test(value)) {
            return componentExists(value, config.API_SRC, config.SERVICES)
            ? 'A service with this name already exists '
            : true;
        }
      
        return 'The name is required';
      }
    const actions = [
      {
        type: 'add',
        path: `${folderPath}/{{properCase name}}Service.${fileExtension}`,
        templateFile: data.isGraphql == 'yes'? `./services/${fileExtension}-templates/graphql.${fileExtension}.hbs` : `./services/${fileExtension}-templates/index.${fileExtension}.hbs`,
        abortOnFail: true
      },
      {
        type: 'add',
        path: `${folderPath}/typeDefs/common.ts`,
        templateFile: data.isGraphql == 'yes' && !typeDefExists ? `./services/typeDefs/common.ts.hbs` : ``,
        abortOnFail: true
     
    ];

    return actions;
  }
};
