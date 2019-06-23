import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Library responsible to help on the routers

import Routes from './routes';
import Header from './components/Header';

// This function App, return a component in the JSX
// A component can be in a function format, or  class format
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>

    /*
  <div className="App">
      <h1>Hello World!</h1>
  </div>
  */
  );
}

export default App;
