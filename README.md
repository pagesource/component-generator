
# Generate Plop

Generate-plop is a simple cli for generating new components really fast and consistently. It can help 
you to scaffold components, templates, hooks, services and pages (Next.js) simply by running few 
cli commands. Say goodbye to copy-paste existing components and cleaning them up before you can work on actual task.

Automating the component generation process makes it really easy for 
the teams to maintain consistency across project and saves a lot of development time. 

Generate-plop is by default configured to generate files in [TypeScript](https://www.typescriptlang.org/) format. However, you can generate javascript files as well by passing --js flag in script command.

![Demo](https://s10.gifyu.com/images/generate-plopd707158878537f9a.gif)

## Features

Generate-plop as of now supports React components generation

1. React Components: Class and Functional in [Atomic Design](https://atomicdesign.bradfrost.com/) structure. 
2. React Custom Hooks.
3. React Context.
4. React Query Services.
5. Next.js Pages/Routes.
6. Checks for name collisions. 

## Installation

Run following command at the root level of your project.

### With Yarn
```bash
  yarn add --dev @xt-pagesource/generate-plop
```

### With npm
```bash
  npm i @xt-pagesource/generate-plop --save-dev
```

## Configuration 

Post installation add a script to generate TypeScript files in your package.json. 

```bash
  #package.json
  script: {
    ...
    "generate": "generate-plop"
  }
```

To generate javascript files instead of TypeScript add following script to package.json.

```bash
  #package.json
  script: {
    ...
    "generate": "generate-plop --js"
  }
```

## Prerequisite and Dependencies

It works seamlessly with node versions >= ^12.20.0

Its only dependent on two packages: 
1. [Plop](https://www.npmjs.com/package/plop)
2. [minimist](https://www.npmjs.com/package/minimist)

## Upcoming Capabilities

1. Angular Templates
2. Remix Templates
3. Raise [issues/requests](https://github.com/pagesource/component-generator/issues) for other capabilities. 

## Documentation

[Documentation coming soon](https://github.com/pagesource/universal-react-docs/blob/master/docs/generate-plop.md)
## Contributors

1. [Khushboo Kumari](https://github.com/khus29)
2. [Vinod Loha](https://github.com/vinodloha)