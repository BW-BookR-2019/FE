import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Navigation from './components/Navigation';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <PrivateRoute path='/' component={Navigation} />
      </Switch>
    </div>
  );
}

export default App;
