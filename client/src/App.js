import React, { Fragment, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard'
import Profiles from './components/profiles/Profiles';
import Remedy from './components/remedy/Remedy';
import About from './components/layout/About'

import Alert from './components/layout/Alert';
import { Provider } from 'react-redux';
import store from './store'
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './routing/PrivateRoute'

import './App.css';
import { loadUser } from './actions/auth';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return(
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/aboutus' component={About} />
            <PrivateRoute exact path='/users/doctors' component={Profiles} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <Route exact path='/remedy' component={Remedy} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
)}

export default App;
