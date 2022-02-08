/**
 * Service Generator
 */

/* eslint strict: ["off"] */

'use strict';

import componentExists from '../utils/componentExists.js'
import config from '../constants.js'
import {isMonorepo} from '../utils/monorepoHelpers.js'
import {getComputedFolderPath, getFileExtension, getRootDirectoryPath, isTypescript} from '../utils/common.js'

const fileExtension = getFileExtension()

export default {
  description: 'Add a service',
  prompts: [
    {
      type: 'list',
      name: 'isGraphql',
      message: 'Will it be a graphql call?',
      choices: () => ['yes', 'no'],
      default: 'no'
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'ChangeTitle',
    },
    {
      when: () => !isMonorepo(),
      type: 'input',
      name: 'servicePath',
      message: 'Give the custom path for the service:',
      default: 'src/services'
    }
  ],
  actions: (data) => {
    // Generate serviceName.js 
    const rootPath = getRootDirectoryPath()

    const folderPath =  data.servicePath ? `${rootPath}/${data.servicePath}` : `${rootPath}/${getComputedFolderPath(config.SERVICES, config.API_SRC)}`
    
    const actions = [
      {
        type: 'add',
        path: `${folderPath}/{{properCase name}}Service.${fileExtension}`,
        templateFile: data.isGraphql == 'yes'? `./services/${fileExtension}-templates/graphql.${fileExtension}.hbs` : `./services/${fileExtension}-templates/index.${fileExtension}.hbs`,
        abortOnFail: true
      }
      
    ];
    if(isTypescript()) {
        actions.push({
          type: 'add',
          path: `${folderPath}/types/common.ts`,
          templateFile: `./services/${fileExtension}-templates/types.ts.hbs`,
          abortOnFail: true,
        });
      }
      return actions;
    
  }
};
