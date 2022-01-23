/**
 * Typescript Component Generator
 */

/* eslint strict: ["off"] */

'use strict';

import componentExists from '../../utils/componentExists.js'
import config from '../../constants.js'

export default {
  description: 'Add an unconnected component (atoms, molecules, organisms, templates)',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select the type of component',
      default: 'Stateless Function',
      choices: () => ['Stateless Function', 'React.Component']
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: (value) => {
        if (/.+/.test(value)) {
          return componentExists(value, 'components')
            ? 'A component with this name already exists '
            : true;
        }

        return 'The name is required';
      }
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
    }
  ],
  actions: (data) => {
    // Generate index.ts and index.test.tsx
    let componentTemplate;
    let folderPath = data.folder
      ? `../../${config.COMPONENT_PATH}${data.folder}`
      : `../../${config.COMPONENT_PATH}atoms`;

    switch (data.type) {
      case 'Stateless Function': {
        componentTemplate = './react-component/ts-templates/stateless.ts.hbs';
        break;
      }
      default: {
        componentTemplate = './react-component/ts-templates/class.ts.hbs';
      }
    }

    if (data.folder === 'custom') {
      folderPath =
        data.customFolder.trim() === '' ? '../src' : `../src/${data.customFolder.trim()}`;
    }

    const actions = [
      {
        type: 'add',
        path: `${folderPath}/{{properCase name}}/index.ts`,
        templateFile: './react-component/ts-templates/index.ts.hbs',
        abortOnFail: true
      },
      {
        type: 'add',
        path: `${folderPath}/{{properCase name}}/{{properCase name}}.tsx`,
        templateFile: componentTemplate,
        abortOnFail: true
      },
      {
        type: 'add',
        path: `${folderPath}/{{properCase name}}/tests/{{properCase name}}.test.tsx`,
        templateFile: './react-component/ts-templates/test.ts.hbs',
        abortOnFail: true
      },
      {
        type: 'add',
        path: `${folderPath}/{{properCase name}}/{{properCase name}}.story.tsx`,
        templateFile: './react-component/ts-templates/story.ts.hbs',
        abortOnFail: true
      },
      {
        type: 'add',
        path: `${folderPath}/{{properCase name}}/{{properCase name}}.style.ts`,
        templateFile: './react-component/ts-templates/style.ts.hbs',
        abortOnFail: true
      }
    ];

    return actions;
  }
};
