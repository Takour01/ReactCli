import React from 'react';
import './<%= componentName.toLowerCase() %>.scss';
import useViewModel from './<%= componentName %>VM';

const <%= componentName %> = () => {
  const data = useViewModel()
  return (
    <div className="<%= componentName.toLowerCase() %>">
      <h1><%= componentName %> Component</h1>
    </div>
  );
};

export default <%= componentName %>;
