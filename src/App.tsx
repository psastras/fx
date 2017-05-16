import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home'
import './index.scss'

export class App extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home as any} />
          <Route path='*' component={Home as any} />
        </Switch>
      </BrowserRouter>
    )
  }
}