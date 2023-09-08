// Import and export your page components here
<% components.forEach((componentName) => { %>
import <%= componentName %>Component from './<%= componentName %>Component';
import <%= componentName %>ViewModel from './<%= componentName %>ViewModel';
<% }) %>

export {
  // Export your page components here
  <% components.forEach((componentName) => { %>
  <%= componentName %>Component,
  <%= componentName %>ViewModel,
  <% }) %>
  // Add other components as needed
};
