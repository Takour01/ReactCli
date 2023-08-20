#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ejs = require('ejs');

const templatesPath = path.join(__dirname, '..', 'templates');

inquirer
  .prompt([
    {
      type: 'input',
      name: 'componentName',
      message: 'Enter the component name:',
    },
  ])
  .then((answers) => {
    const componentName = answers.componentName;
    const componentDir = path.join(process.cwd(), componentName);

    // Create a directory based on the component name
    fs.mkdirSync(componentDir);

    // Define template files and their destination names
    const filesToGenerate = [
      {
        template: 'Component.jsx',
        destination: `${componentName}.jsx`,
      },
      {
        template: 'ViewModel.jsx',
        destination: `${componentName}VM.jsx`,
      },
      {
        template: 'styles.scss',
   destination: `${componentName.toLowerCase()}.scss`, 
      },
    ];

    filesToGenerate.forEach(({ template, destination }) => {
      const templateFilePath = path.join(templatesPath, template);
      const destinationFilePath = path.join(componentDir, destination);

      // Copy template files and render using the provided name
      fs.copySync(templateFilePath, destinationFilePath);
      const templateData = { componentName: componentName };
      const rendered = ejs.render(fs.readFileSync(destinationFilePath, 'utf-8'), templateData);
      fs.writeFileSync(destinationFilePath, rendered);
    });

    console.log(chalk.green('Component created successfully!'));
  })
  .catch((error) => {
    console.error(chalk.red('Error:', error));
  });
