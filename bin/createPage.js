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
      name: 'pageName',
      message: 'Enter the page name:',
    }
  ])
  .then((answers) => {
    const pageName = answers.pageName; // Get the page name

    const pageDir = path.join(process.cwd(),"src","views","Pages", pageName);
    const componentsDir = path.join(pageDir, 'components');

    fs.mkdirSync(pageDir);
    fs.mkdirSync(componentsDir);

    const filesToGenerate = [
      {
        template: 'PageComponent.jsx',
        destination: `${pageName}.jsx`,
      },
      {
        template: 'PageViewModel.jsx',
        destination: `${pageName}VM.jsx`,
      },
      {
        template: 'stylespage.scss',
        destination: `${pageName.toLowerCase()}.scss`,
      },
    ];

    filesToGenerate.forEach(({ template, destination }) => {
      const templateFilePath = path.join(templatesPath, template);
      const destinationFilePath = path.join(pageDir, destination);

      // Copy template files and render using the provided data
      fs.copySync(templateFilePath, destinationFilePath);
      const templateData = { pageName: pageName }; // Pass the pageName
      const rendered = ejs.render(fs.readFileSync(templateFilePath, 'utf-8'), templateData);
      fs.writeFileSync(destinationFilePath, rendered);
    });

    console.log(chalk.green(`Page '${pageName}' created successfully!`));

    // Create an empty index.js file inside the components folder
    const emptyIndexPath = path.join(componentsDir, 'index.js');
    fs.writeFileSync(emptyIndexPath, '');
    console.log(chalk.green('Empty index.js created in components folder.'));
  })
  .catch((error) => {
    console.error(chalk.red('Error:', error));
  });
