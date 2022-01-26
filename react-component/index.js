/**
 * Component Generator
 */

/* eslint strict: ["off"] */

'use strict';

import componentExists from '../utils/componentExists.js'
import monorepoQues from '../utils/monorepoHelpers.js'
import config from '../constants.js'
import {isTypescript, getComputedFolderPath} from '../utils/common.js'

const fileExtension = isTypescript() ? 'ts' : 'js'

export default {
  description: 'Add an unconnected component (atoms, molecules, organisms, templates)',
  prompts: [
    monorepoQues,
    {
      type: 'list',
      name: 'type',
      message: 'Select the type of component',
      default: 'Stateless Function',
      choices: () => ['Stateless Function', 'React.Component']
    },
    {
      type: 'list',
      name: 'folder',
      message: 'Where do you want to keep this component?',
      default: 'atoms',
      choices: () => ['atoms', 'molecules', 'organisms', 'templates', 'custom']
    },
    {
      when: (data) => data.folder === 'custom',
      type: 'input',
      name: 'customFolder',
      message: 'Give the custom path for the component:',
      default: 'src/components/atoms'
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: (value, data) => {
        const compDir = data.folder === 'custom' ? data.customFolder : data.folder
        if (/.+/.test(value)) {
          return componentExists(value, `${config.COMPONENT_PATH}/${compDir}`, data.monorepoPath)
            ? 'A component with this name already exists '
            : true;
        
        }
        return 'The name is required';
      }
    },
  ],
  actions: (data) => {
    // Generate index.ts/js and index.test.tsx/js
    let componentTemplate;
    let folderPath = `../../${getComputedFolderPath(data.monorepoPath, config.COMPONENT_PATH)}${data.folder}`;

    switch (data.type) {
      case 'Stateless Function': {
        componentTemplate = `./react-component/${fileExtension}-templates/stateless.${fileExtension}.hbs`;
        break;
      }
      default: {
        componentTemplate = `./react-component/${fileExtension}-templates/class.${fileExtension}.hbs`;
      }
    }

    if (data.folder === 'custom') {
      folderPath =
        data.customFolder.trim() === '' ? '../src' : `../src/${data.customFolder.trim()}`;
    }

    const actions = [
      {
        type: 'add',
        path: `${folderPath}/{{properCase name}}/index.${fileExtension}`,
        templateFile: `./react-component/${fileExtension}-templates/index.${fileExtension}.hbs`,
        abortOnFail: true
      },
      {
        type: 'add',
        path: `${folderPath}/{{properCase name}}/{{properCase name}}.${isTypescript() ? 'tsx' : 'js'}`,
        templateFile: componentTemplate,
        abortOnFail: true
      },
      {
        type: 'add',
        path: `${folderPath}/{{properCase name}}/tests/{{properCase name}}.test.${isTypescript() ? 'tsx' : 'js'}`,
        templateFile: `./react-component/${fileExtension}-templates/test.${fileExtension}.hbs`,
        abortOnFail: true
      },
      {
        type: 'add',
        path: `${folderPath}/{{properCase name}}/{{properCase name}}.story.${isTypescript() ? 'tsx' : 'js'}`,
        templateFile: `./react-component/${fileExtension}-templates/story.${fileExtension}.hbs`,
        abortOnFail: true
      },
      {
        type: 'add',
        path: `${folderPath}/{{properCase name}}/{{properCase name}}.style.${fileExtension}`,
        templateFile: `./react-component/${fileExtension}-templates/style.${fileExtension}.hbs`,
        abortOnFail: true
      }
    ];

    return actions;
  }
};
