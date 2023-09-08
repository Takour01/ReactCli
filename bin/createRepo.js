#!/usr/bin/env node

const fs = require("fs-extra");
const inquirer = require("inquirer");

// Prompt user for repository details
inquirer
  .prompt([
    {
      type: "input",
      name: "repoName",
      message: "Enter the name of the repository:",
    },
    {
      type: "input",
      name: "basePath",
      message: "Enter the base path for the repository:",
    },
    {
      type: "confirm",
      name: "hasGetAll",
      message: "Does it have a getAll() method?",
      default: true,
    },
    {
      type: "confirm",
      name: "hasAddOne",
      message: "Does it have an addOne() method?",
      default: true,
    },
    {
      type: "confirm",
      name: "hasUpdateOne",
      message: "Does it have an updateOne() method?",
      default: true,
    },
    {
      type: "confirm",
      name: "hasDeleteOne",
      message: "Does it have a deleteOne() method?",
      default: true,
    },
  ])
  .then((answers) => {
    const {
      repoName,
      basePath,
      hasGetAll,
      hasAddOne,
      hasUpdateOne,
      hasDeleteOne,
    } = answers;
    const repoContent = generateRepositoryContent(
      repoName,
      basePath,
      hasGetAll,
      hasAddOne,
      hasUpdateOne,
      hasDeleteOne
    );
    const repoFileName = `${repoName}Repo.js`;
    const repoPath = `src/repositories/${repoFileName}`;

    // Create the directory if it doesn't exist
    fs.ensureDirSync("src/repositories");

    // Write the repository file
    fs.writeFileSync(repoPath, repoContent, "utf-8");
    console.log(`Repository '${repoFileName}' created successfully!`);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Function to generate repository content
function generateRepositoryContent(
  repoName,
  basePath,
  hasGetAll,
  hasAddOne,
  hasUpdateOne,
  hasDeleteOne
) {
  const methods = [];

  if (hasGetAll) methods.push("getAll(data)");
  if (hasAddOne) methods.push("addOne(data, rejectWithValue)");
  if (hasUpdateOne) methods.push("updateOne(data)");
  if (hasDeleteOne) methods.push("deleteOne(data)");

  const methodsContent = methods
    .map((method) => {
      return `
    // ${method}
    static async ${method} {
      // Implement the method logic here
    }
    `;
    })
    .join("\n");

  return `
import axios from "axios";
import { BaseUrl, errorResponseCreater, responseCreater } from "../assets/constant";

class ${repoName}Repo {
  basePath = "${basePath}"

  ${methodsContent}
}

export default ${repoName}Repo;
  `;
}
