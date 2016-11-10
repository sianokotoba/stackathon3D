'use strict'
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { connect, Provider } from 'react-redux';

import App from './components/app';
import Tester from './components/tester';
import TBS from './components/tbs';

// import store from './store'
// import Jokes from './components/Jokes'
// import Login from './components/Login'
// import WhoAmI from './components/WhoAmI'

// const ExampleApp = connect(
//   ({ auth }) => ({ user: auth })
// ) (
//   ({ user, children }) =>
//     <div>
//       <nav>
//         {user ? <WhoAmI/> : <Login/>}
//       </nav>
//       {children}
//     </div>
// )

// render (
//   <Provider store={store}>
//     <Router history={browserHistory}>
//       <Route path="/" component={ExampleApp}>
//         <IndexRedirect to="/jokes" />
//         <Route path="/jokes" component={Jokes} />
//       </Route>
//     </Router>
//   </Provider>,
//   document.getElementById('main')
// )

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/test_cube" component={Tester} />
      <Route path="/test_spinning" component={TBS} />
    </Route>
  </Router>,
  document.getElementById('main')
);
