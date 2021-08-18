import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Index from './pages/Main/Index';
import Login from './pages/Main/Login';
import Dashboard from './pages/Dash/Index';
import Signup from './pages/Main/Signup';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />

        <Route path="/dashboard" exact component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
