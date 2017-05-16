import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import './index.scss'

const rootEl = document.getElementById('root')
const render = (Component) =>
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootEl,
  );

render(App)

declare const module;
if (module.hot) {
  module.hot.accept('./App', () => render(App))
}