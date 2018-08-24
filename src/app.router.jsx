import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import * as routes from './constants/Routes';

// Importing views
import HomePage from './components/views/HomePage';

class AppRouter extends React.Component {
  componentWillMount() {
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app__container">
          <Switch>
            <Route exact path={routes.HOME} component={HomePage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
