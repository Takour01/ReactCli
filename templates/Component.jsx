import React from 'react';
import './<%= componentName %>.scss';
import <%= componentName %>ViewModel from './<%= componentName %>VM';

const <%= componentName %> = () => {
  const data = <%= componentName %>ViewModel()
  return (
    <div className="<%= componentName.toLowerCase() %>">
      <h1><%= componentName %> Component</h1>
    </div>
  );
};

export default <%= componentName %>;
