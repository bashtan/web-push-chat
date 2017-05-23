import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import LazyRoute from 'lazy-route'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { AppContainer, AppContent } from './Style';
import '../../styles/global';

@observer
export default class App extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  componentDidMount(){
   // Check support Service Worker API and register.
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./firebase-messaging-sw.js')
        .then(() => this.store.initializationState());
    }
  }

  render() {
    return (
      <Router>
        <Provider store={this.store}>
          <AppContainer>
            <AppContent>
            <Route
              exact
              path="/"
              render={(props) => <LazyRoute {...props} component={import('../Home/Home')} />}
            />
            </AppContent>
          </AppContainer>
        </Provider>
      </Router>
    );
  }
}
