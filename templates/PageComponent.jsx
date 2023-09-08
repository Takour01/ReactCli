import React from 'react';
import './<%= pageName.toLowerCase() %>.scss';
import useViewModel from './<%= pageName %>VM';

const <%= pageName %> = () => {
  const data = useViewModel()
  return (
    <div className="<%= pageName.toLowerCase() %>">
      <h1><%= pageName %> Component</h1>
    </div>
  );
};

export default <%= pageName %>;