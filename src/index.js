import React from 'react';
import ReactDOMClient from 'react-dom/client';
import App from "./react_components/App";

ReactDOMClient.hydrateRoot(document.getElementById('admin-sentences'), <App />);