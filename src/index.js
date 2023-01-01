import React from 'react';
import ReactDOMClient from 'react-dom/client';

ReactDOMClient.hydrateRoot(document.getElementById('admin-sentences'),
   <h1>Hello from React </h1>
);