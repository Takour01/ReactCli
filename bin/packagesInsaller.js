#!/usr/bin/env node

const { exec } = require('child_process');
const inquirer = require('inquirer');
const chalk = require('chalk');

inquirer
  .prompt([
    {
      type: 'confirm',
      name: 'fetchData',
      message: 'Do you fetch data in your project?',
      default: false,
    },
    {
      type: 'confirm',
      name: 'useStateManagement',
      message: 'Do you use state management (e.g., Redux) in your project?',
      default: false,
      when: (answers) => answers.fetchData, // Only ask if fetching data
    },
    // Add more questions for other packages as needed
  ])
  .then((answers) => {
    const packagesToInstall = [];

    if (answers.fetchData) {
      packagesToInstall.push('axios');
    }

    if (answers.useStateManagement) {
      packagesToInstall.push('redux');
    }

    // Add more packages based on user responses

    if (packagesToInstall.length === 0) {
      console.log(chalk.green('No packages selected. Exiting.'));
      return;
    }

    // Install the selected packages
    const command = `npm install ${packagesToInstall.join(' ')}`;

    console.log(chalk.yellow(`Installing packages: ${packagesToInstall.join(', ')}`));

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(chalk.red(`Error installing packages: ${error.message}`));
        return;
      }
      if (stderr) {
        console.error(chalk.red(`Error installing packages: ${stderr}`));
        return;
      }
      console.log(chalk.green(`Packages installed successfully: ${packagesToInstall.join(', ')}`));
    });
  })
  .catch((error) => {
    console.error(chalk.red('Error:', error));
  });
