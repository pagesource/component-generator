
# Generate Plop

Generate-plop is a simple, scalable and fast component generator. It can help 
you to scaffold components, templates, hooks and pages simply by running few 
cli commands. Automating the component creation process makes really easy for 
the team to maintain consistency and saves good time. 

This tool will generate typescript files by default. However, we can generate
javascript files as well by passing --js in script command.

![Demo](https://github.com/pagesource/component-generator/blob/feature/genrator-monorepo-updates/assets/generate-plop.gif)

## Prerequisite

It works seamlessly with node versions - 
```bash
  node -v
  "^12.20.0 || ^14.13.1 || >=16.0.0"
```
## Installation

Install generate-plop with yarn or npm. You need to run follwoing command at 
the root level of your project.

```bash
  yarn add --dev generate-plop
```
Then you have to add a script in your package.json to generate typescript files
```bash
  #package.json
  script: {
    ...
    "generate": "generate-plop"
  }
```
If you wish to generate javascript files then add follwing script
```bash
  #package.json
  script: {
    ...
    "generate": "generate-plop --js"
  }
```
## Documentation

[Documentation coming soon](https://linktodocumentation)

