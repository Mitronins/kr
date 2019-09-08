import React from 'react';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect, Switch } from 'react-router'

import * as styles from './styles.scss'

import {createBrowserHistory} from 'history';
import { Route } from 'react-router'
import { Login } from './Login/Login'
import { Registration } from './Registration/Registration'
import { SingsList } from './SingsList/SingsList'

import 'antd/dist/antd.css';

export const history = createBrowserHistory();

const App = (props) => {
  return (
    <Router history={history}>
      <div>
        <Switch>
          {props.auth && <Route exact path='/sings' component={SingsList}/>}
          <Route exact path='/login' component={Login}/>
          <Route exact path='/registration' component={Registration}/>
          <Redirect to="/login"/>
        </Switch>
      </div>
    </Router>
  )
}

export default connect(({auth}) => ({auth}), null)(App);
