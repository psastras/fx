import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import AppReducer from './app-reducer'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import logger from 'redux-logger'
import * as NProgress from 'nprogress'
import './index.scss'

declare const DEVELOPMENT: boolean
declare const module: any

const rootEl = document.getElementById('root')
const history = createHistory()
const middlewares = [ routerMiddleware(history) ]
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger)
}

NProgress.configure({ showSpinner: false })

const store = createStore(AppReducer, applyMiddleware(...middlewares))
const render = (Component) =>
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    rootEl,
  );

render(App)

if (module.hot) {
  module.hot.accept('./App', () => render(App))
  module.hot.accept('./app-reducer', () => store.replaceReducer(AppReducer))
}