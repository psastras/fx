import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import Home from 'src/pages/Home'
import './index.scss'

declare const System;

const loadRoute = (cb) => {
  return (module) => cb(null, module.default);
}

const routes = {
  childRoutes: [
    {
      path: '*', getComponent(location, cb) {
        System.import('src/pages/Home').then(loadRoute(cb));
      },
    },
  ],
  component: Home,
  path: '/',
}

const router = () => <Router history={browserHistory} routes={routes} />
const rootEl = document.getElementById('root')
const render = (Component) =>
  ReactDOM.render(
    <AppContainer>
      <Router history={browserHistory} routes={routes} />
    </AppContainer>,
    rootEl,
  );

render(router)

declare const module;
if (module.hot) {
  module.hot.accept('src/pages/Home', () => render(router))
}