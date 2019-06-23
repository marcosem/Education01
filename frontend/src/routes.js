import { Switch, Route } from 'react-router-dom';
import React from 'react';

import Feed from './pages/Feed';
import New from './pages/New';

// Switch enforce that only one route will be called

function Routes() {
  // Without Switch, react only verify if the URL contains the route, if so, it call all contained routes
  return (
    <Switch>
      <Route path="/" exact component={Feed} />
      <Route path="/new" component={New} />
    </Switch>
  );
}

export default Routes;
