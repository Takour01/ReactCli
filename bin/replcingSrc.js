#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');

inquirer
  .prompt([
    {
      type: 'confirm',
      name: 'confirmReplace',
      message: 'This will replace your current src folder. Are you sure you want to proceed?',
      default: false,
    },
  ])
  .then((answers) => {
    if (!answers.confirmReplace) {
      console.log(chalk.yellow('Operation aborted. No changes were made.'));
      return;
    }

    const currentSrcPath = path.join(process.cwd(), 'src'); // Path to the current src folder
    const newSrcPath = path.join(__dirname, 'new-src'); // Path to the new src folder (adjust this path)

    // Check if the new src folder exists
    if (!fs.existsSync(newSrcPath)) {
      console.error(chalk.red('The new src folder does not exist.'));
      return;
    }

    try {
      // Remove the current src folder
      fs.removeSync(currentSrcPath);

      // Copy the new src folder to the project directory
      fs.copySync(newSrcPath, currentSrcPath);

      console.log(chalk.green('src folder replaced successfully.'));
    } catch (error) {
      console.error(chalk.red('Error replacing src folder:', error.message));
    }
  })
  .catch((error) => {
    console.error(chalk.red('Error:', error));
  });
