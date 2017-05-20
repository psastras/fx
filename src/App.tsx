import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router'
import { Home } from './pages/Home'
import './index.scss'

export class App extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <Route path='*' component={Home as any} />
      </div>
    )
  }
}