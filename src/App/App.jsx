import React from 'react';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect, Switch } from 'react-router'

import * as styles from './styles.scss'

import {createBrowserHistory} from 'history';
import { Route } from 'react-router'
import { Login } from './Login/Login'
import { Registration } from './Registration/Registration'
import { MusicList } from './MusicList/MusicList'
import { Header } from './Header/Header'

import 'antd/dist/antd.css';
import { AuthorList } from './AuthorList/AuthorList'
import { PlaylistList } from './PlaylistList/PlaylistList'

export const history = createBrowserHistory();

const App = (props) => {
  return (
    <Router history={history}>
      <div>
        {props.auth && <Header/>}
        <Switch>
          {props.auth && <Route exact path='/sings' component={MusicList}/>}
          {props.auth && <Route exact path='/authors' component={AuthorList}/>}
          {props.auth && <Route exact path='/playlists' component={PlaylistList}/>}
          <Route exact path='/login' component={Login}/>
          <Route exact path='/registration' component={Registration}/>
          <Redirect to="/login"/>
        </Switch>
      </div>
    </Router>
  )
}

export default connect((state) => {
  return {
    auth: state.users.auth
  }
})(App);
