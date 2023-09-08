#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ejs = require('ejs');
const sanitize = require("sanitize-filename"); 
const templatesPath = path.join(__dirname, '..', 'templates');

// ...

function createComponent(answers, author) {
console.log(answers);
const componentName = sanitize(answers.componentName); 
  const componentDir = path.join(process.cwd(), answers.pageName, 'components', componentName);
  fs.mkdirSync(componentDir);

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

    // Copy template files and render using the provided data
    fs.copySync(templateFilePath, destinationFilePath);
    const templateData = { componentName: componentName, author: author };
    const rendered = ejs.render(fs.readFileSync(destinationFilePath, 'utf-8'), templateData);
    fs.writeFileSync(destinationFilePath, rendered);
  });

  console.log(chalk.green(`Component '${componentName}' created successfully!`));
}

function createComponents(answers, author) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'componentName',
        message: 'Enter the component name (or press Enter to finish creating components):',
      },
    ])
    .then((componentAnswers) => {
      if (componentAnswers.componentName) {
        createComponent({...componentAnswers,...answers}, author);
        createComponents(answers, author);  // Continue creating components
      } else {
        // No more components to create, return to the main menu
        createPage(answers, author);
      }
    })
    .catch((error) => {
      console.error(chalk.red('Error:', error));
    });
}

function createPage(answers, author) {
  console.log(answers);
  const pageName = answers.pageName;
  const pageDir = path.join(process.cwd(), pageName);
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
    {
      template: 'index.js',
      destination: path.join(componentsDir, 'index.js'),
    },
  ];

  filesToGenerate.forEach(({ template, destination }) => {
    const templateFilePath = path.join(templatesPath, template);
    const destinationFilePath = path.join(pageDir, destination);

    // Copy template files and render using the provided data
    fs.copySync(templateFilePath, destinationFilePath);
    const templateData = { pageName: pageName, author: author };
    const rendered = ejs.render(fs.readFileSync(destinationFilePath, 'utf-8'), templateData);
    fs.writeFileSync(destinationFilePath, rendered);
  });

  console.log(chalk.green(`Page '${pageName}' created successfully!`));

  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'createComponent',
        message: 'Do you want to create components for this page?',
      },
    ])
    .then((componentPromptAnswers) => {
      if (componentPromptAnswers.createComponent) {
        createComponents(answers, author);
      } else {
        createPage(answers, author); // Return to the main menu
      }
    })
    .catch((error) => {
      console.error(chalk.red('Error:', error));
    });
}

// ...


inquirer
  .prompt([
    {
      type: 'list',
      name: 'creationType',
      message: 'What do you want to create?',
      choices: ['Component', 'Page'],
    },
    {
      type: 'input',
      name: 'componentName',
      message: 'Enter the component name:',
      when: (answers) => answers.creationType === 'Component',
    },
    {
      type: 'input',
      name: 'pageName',
      message: 'Enter the page name:',
      when: (answers) => answers.creationType === 'Page',
    },
    {
      type: 'input',
      name: 'author',
      message: 'Enter the author name:',
    },
  ])
  .then((answers) => {
    const author = answers.author;

    if (answers.creationType === 'Component') createComponent(answers,author); else if (answers.creationType === 'Page') {
      createComponents(answers,author)
      // Insert the code for creating a page, components, and index.js here
      // See previously provided code for createComponent, createComponents, and createPage
    }
  })
  .catch((error) => {
    console.error(chalk.red('Error:', error));
  });
