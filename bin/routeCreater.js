#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const routesDir = path.join(__dirname, 'src','views', 'Routes'); // Update the path to your routes directory
const routeFiles = fs.readdirSync(routesDir);

// Function to update a Routes.jsx file by adding a new component and link
function updateRoutesFile(routesFilePath, componentNameToAdd, routeLink) {
    const importStatement = `import ${componentNameToAdd} from "../Pages/${componentNameToAdd}/${componentNameToAdd}";\n`;
  
    fs.readFile(routesFilePath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading the file:', err);
        return;
      }
  
      // Check if the import statement already exists, if not, add it
      if (!data.includes(importStatement)) {
        const updatedContent = data.replace('export default HomeRoutes;', importStatement + '\nexport default HomeRoutes;');
  
        // Add a new Route element for the component and link
        const newRouteElement = `              <Route path="${routeLink}" element={<${componentNameToAdd} />} />\n`;
        const updatedContentWithRoute = updatedContent.replace('</Route>', newRouteElement + '      </Route>');
  
        fs.writeFile(routesFilePath, updatedContentWithRoute, 'utf-8', (err) => {
          if (err) {
            console.error('Error writing to the file:', err);
          } else {
            console.log(`Updated ${componentNameToAdd} in ${routesFilePath}.`);
          }
        });
      } else {
        console.log(`Import statement for ${componentNameToAdd} already exists in ${routesFilePath}.`);
      }
    });
  }
  

// Create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt for the route name
rl.question('Enter the name of the route component (without "Routes.jsx"): ', (routeName) => {
  const componentName = routeName;
  const routesToUpdate = routeFiles.filter(file => file.includes(componentName));

  if (routesToUpdate.length === 0) {
    console.log(`No route files found for ${componentName}.`);
    rl.close();
    return;
  }

  // Prompt for the component name and route link
  rl.question(`Enter the name of the component to add to "${componentName}" route: `, (componentNameToAdd) => {
    rl.question(`Enter the link for the "${componentNameToAdd}" component: /`, (routeLink) => {
      routesToUpdate.forEach((routeFile) => {
        const routesFilePath = path.join(routesDir, routeFile);
        updateRoutesFile(routesFilePath, componentNameToAdd, routeLink);
      });

      rl.close();
    });
  });
});
