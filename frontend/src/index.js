import React from 'react';
import ReactDOM from 'react-dom'; // integration with browser
import App from './App';
import './global.css'; // Import a css as global reference for design

// Any place you use JSX format like "<App />", it is necessary to import 'react'
// "root" is the element in index.html that will be replaced by "<App />"
ReactDOM.render(<App />, document.getElementById('root'));
