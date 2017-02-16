import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import { browserHistory } from 'react-router'
import { Route, IndexRoute, Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import UserIsAuthenticated from './UserIsAuthenticated'
import UserIsNotAuthenticated from './UserIsNotAuthenticated'
//components
import Account from './containers/Account/Account'
import App from './containers/App/App'
import Home from './containers/Home/Home'
import Login from './containers/Login/Login'
import NotFound from './containers/NotFound/NotFound'
import Signup from './containers/Signup/Signup'
import Content from './containers/Content/Content'


const initialState = window.__INITIAL_STATE__ || { firebase: { authError: null } }

const store = configureStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

let rootElement = document.getElementById('root')



ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={UserIsAuthenticated(Home)} />
        <Route path='account' component={Account} />
        <Route path='login' component={Login} />
        <Route path='signup' component={Signup} />
        <Route path='content' component={UserIsAuthenticated(Content)} />
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  </Provider>, rootElement
)
